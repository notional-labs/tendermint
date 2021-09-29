package commands

import (
	"testing"

	"github.com/stretchr/testify/require"
	dbm "github.com/tendermint/tm-db"

	"github.com/tendermint/tendermint/internal/state"
	"github.com/tendermint/tendermint/internal/state/mocks"
	"github.com/tendermint/tendermint/internal/test/factory"
	"github.com/tendermint/tendermint/types"
	"github.com/tendermint/tendermint/version"
)

func TestRollback(t *testing.T) {
	stateStore := state.NewStore(dbm.NewMemDB())
	blockStore := &mocks.BlockStore{}
	var (
		height     int64  = 100
		appVersion uint64 = 10
	)

	valSet, _ := factory.RandValidatorSet(5, 10)

	params := types.DefaultConsensusParams()
	params.Version.AppVersion = appVersion
	newParams := types.DefaultConsensusParams()
	newParams.Block.MaxBytes = 10000

	initialState := state.State{
		Version: state.Version{
			Consensus: version.Consensus{
				Block: version.BlockProtocol,
				App:   10,
			},
			Software: version.TMVersion,
		},
		ChainID:                          factory.DefaultTestChainID,
		InitialHeight:                    10,
		LastBlockID:                      factory.MakeBlockID(),
		AppHash:                          factory.RandomHash(),
		LastResultsHash:                  factory.RandomHash(),
		LastBlockHeight:                  height,
		LastValidators:                   valSet,
		Validators:                       valSet.CopyIncrementProposerPriority(1),
		NextValidators:                   valSet.CopyIncrementProposerPriority(2),
		LastHeightValidatorsChanged:      height + 1,
		ConsensusParams:                  *params,
		LastHeightConsensusParamsChanged: height + 1,
	}
	require.NoError(t, stateStore.Bootstrap(initialState))

	height++
	block := &types.BlockMeta{
		Header: types.Header{
			Height:          height,
			AppHash:         initialState.AppHash,
			LastBlockID:     initialState.LastBlockID,
			LastResultsHash: initialState.LastResultsHash,
		},
	}
	blockStore.On("LoadBlockMeta", height).Return(block)

	appVersion++
	newParams.Version.AppVersion = appVersion
	nextState := initialState.Copy()
	nextState.LastBlockHeight = height
	nextState.Version.Consensus.App = appVersion
	nextState.LastBlockID = factory.MakeBlockID()
	nextState.AppHash = factory.RandomHash()
	nextState.LastValidators = initialState.Validators
	nextState.Validators = initialState.NextValidators
	nextState.NextValidators = initialState.NextValidators.CopyIncrementProposerPriority(1)
	nextState.ConsensusParams = *newParams
	nextState.LastHeightConsensusParamsChanged = height + 1
	nextState.LastHeightValidatorsChanged = height + 1

	// update the state
	require.NoError(t, stateStore.Save(nextState))

	// rollback the state
	require.NoError(t, rollbackState(blockStore, stateStore))

	// assert that we've recovered the prior state
	loadedState, err := stateStore.Load()
	require.NoError(t, err)
	require.EqualValues(t, initialState, loadedState)
}
