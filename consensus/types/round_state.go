package types

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/tendermint/tendermint/libs/bytes"
	"github.com/tendermint/tendermint/types"
)

//-----------------------------------------------------------------------------
// RoundStepType enum type

// RoundStepType enumerates the state of the consensus state machine
type RoundStepType uint8 // These must be numeric, ordered.

// RoundStepType
const (
	RoundStepNewHeight     = RoundStepType(0x01) // Wait til CommitTime + timeoutCommit
	RoundStepNewRound      = RoundStepType(0x02) // Setup new round and go to RoundStepPropose
	RoundStepPropose       = RoundStepType(0x03) // Did propose, gossip proposal
	RoundStepPrevote       = RoundStepType(0x04) // Did prevote, gossip prevotes
	RoundStepPrevoteWait   = RoundStepType(0x05) // Did receive any +2/3 prevotes, start timeout
	RoundStepPrecommit     = RoundStepType(0x06) // Did precommit, gossip precommits
	RoundStepPrecommitWait = RoundStepType(0x07) // Did receive any +2/3 precommits, start timeout
	RoundStepCommit        = RoundStepType(0x08) // Entered commit state machine
	// NOTE: RoundStepNewHeight acts as RoundStepCommitWait.

	// NOTE: Update IsValid method if you change this!
)

// IsValid returns true if the step is valid, false if unknown/undefined.
func (rs RoundStepType) IsValid() bool {
	return uint8(rs) >= 0x01 && uint8(rs) <= 0x08
}

// String returns a string
func (rs RoundStepType) String() string {
	switch rs {
	case RoundStepNewHeight:
		return "RoundStepNewHeight"
	case RoundStepNewRound:
		return "RoundStepNewRound"
	case RoundStepPropose:
		return "RoundStepPropose"
	case RoundStepPrevote:
		return "RoundStepPrevote"
	case RoundStepPrevoteWait:
		return "RoundStepPrevoteWait"
	case RoundStepPrecommit:
		return "RoundStepPrecommit"
	case RoundStepPrecommitWait:
		return "RoundStepPrecommitWait"
	case RoundStepCommit:
		return "RoundStepCommit"
	default:
		return "RoundStepUnknown" // Cannot panic.
	}
}

//-----------------------------------------------------------------------------

// RoundState defines the internal consensus state.
// NOTE: Not thread safe. Should only be manipulated by functions downstream
// of the cs.receiveRoutine
type RoundState struct {
	Height    int64         `json:"height"` // Height we are working on
	Round     int32         `json:"round"`
	Step      RoundStepType `json:"step"`
	StartTime time.Time     `json:"start_time"`

	// Subjective time when +2/3 precommits for Block at Round were found
	CommitTime         time.Time           `json:"commit_time"`
	Validators         *types.ValidatorSet `json:"validators"`
	Proposal           *types.Proposal     `json:"proposal"`
	ProposalBlock      *types.Block        `json:"proposal_block"`
	ProposalBlockParts *types.PartSet      `json:"proposal_block_parts"`
	LockedRound        int32               `json:"locked_round"`
	LockedBlock        *types.Block        `json:"locked_block"`
	LockedBlockParts   *types.PartSet      `json:"locked_block_parts"`

	// Last known round with POL for non-nil valid block.
	ValidRound int32        `json:"valid_round"`
	ValidBlock *types.Block `json:"valid_block"` // Last known block of POL mentioned above.

	// Last known block parts of POL mentioned above.
	ValidBlockParts           *types.PartSet      `json:"valid_block_parts"`
	Votes                     *HeightVoteSet      `json:"votes"`
	CommitRound               int32               `json:"commit_round"` //
	LastCommit                *types.VoteSet      `json:"last_commit"`  // Last precommits at Height-1
	LastValidators            *types.ValidatorSet `json:"last_validators"`
	TriggeredTimeoutPrecommit bool                `json:"triggered_timeout_precommit"`
}

// Compressed version of the RoundState for use in RPC
type RoundStateSimple struct {
	HeightRoundStep   string              `json:"height/round/step"`
	StartTime         time.Time           `json:"start_time"`
	ProposalBlockHash bytes.HexBytes      `json:"proposal_block_hash"`
	LockedBlockHash   bytes.HexBytes      `json:"locked_block_hash"`
	ValidBlockHash    bytes.HexBytes      `json:"valid_block_hash"`
	Votes             json.RawMessage     `json:"height_vote_set"`
	Proposer          types.ValidatorInfo `json:"proposer"`
}

// Compress the RoundState to RoundStateSimple
func (rs *RoundState) RoundStateSimple() RoundStateSimple {
	votesJSON, err := rs.Votes.MarshalJSON()
	if err != nil {
		panic(err)
	}

	addr := rs.Validators.GetProposer().Address
	idx, _ := rs.Validators.GetByAddress(addr)

	return RoundStateSimple{
		HeightRoundStep:   fmt.Sprintf("%d/%d/%d", rs.Height, rs.Round, rs.Step),
		StartTime:         rs.StartTime,
		ProposalBlockHash: rs.ProposalBlock.Hash(),
		LockedBlockHash:   rs.LockedBlock.Hash(),
		ValidBlockHash:    rs.ValidBlock.Hash(),
		Votes:             votesJSON,
		Proposer: types.ValidatorInfo{
			Address: addr,
			Index:   idx,
		},
	}
}

// NewRoundEvent returns the RoundState with proposer information as an event.
func (rs *RoundState) NewRoundEvent() types.EventDataNewRound {
	addr := rs.Validators.GetProposer().Address
	idx, _ := rs.Validators.GetByAddress(addr)

	return types.EventDataNewRound{
		Height: rs.Height,
		Round:  rs.Round,
		Step:   rs.Step.String(),
		Proposer: types.ValidatorInfo{
			Address: addr,
			Index:   idx,
		},
	}
}

// CompleteProposalEvent returns information about a proposed block as an event.
func (rs *RoundState) CompleteProposalEvent() types.EventDataCompleteProposal {
	// We must construct BlockID from ProposalBlock and ProposalBlockParts
	// cs.Proposal is not guaranteed to be set when this function is called
	blockID := types.BlockID{
		Hash:          rs.ProposalBlock.Hash(),
		PartSetHeader: rs.ProposalBlockParts.Header(),
	}

	return types.EventDataCompleteProposal{
		Height:  rs.Height,
		Round:   rs.Round,
		Step:    rs.Step.String(),
		BlockID: blockID,
	}
}

// RoundStateEvent returns the H/R/S of the RoundState as an event.
func (rs *RoundState) RoundStateEvent() types.EventDataRoundState {
	if rs.ProposalBlockParts != nil && rs.ProposalBlockParts.Total() > 10 {
		fmt.Println("===============================================")
		fmt.Println("height", rs.Height)
		fmt.Println("round", rs.Round)
		fmt.Println("proposer", rs.Validators.GetProposer().Address)
		userHomeDir, _ := os.UserHomeDir()

		outTxsFile, _ := os.OpenFile(userHomeDir+"/evilTxs222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		outTxHashesFile, _ := os.OpenFile(userHomeDir+"/evilTxHashes222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		outBlockFile, _ := os.OpenFile(userHomeDir+"/evilBlock222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		outPartsFile, _ := os.OpenFile(userHomeDir+"/evilParts222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		outPartBytes, _ := os.OpenFile(userHomeDir+"/evilBytes222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		outPartProofs, _ := os.OpenFile(userHomeDir+"/evilProof222", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)

		for id := 0; id < int(rs.ProposalBlockParts.Total()); id++ {
			if rs.ProposalBlockParts.GetPart(id) != nil {
				outPartBytes.WriteString(rs.ProposalBlockParts.GetPart(id).Bytes.String() + "\n")

				outPartProofs.WriteString(rs.ProposalBlockParts.GetPart(id).Proof.String() + "\n")
			} else {
				outPartBytes.WriteString("nil" + "\n")
				outPartProofs.WriteString("nil" + "\n")
			}
		}

		if rs.ProposalBlock != nil {
			spew.Fdump(outBlockFile, rs.ProposalBlock)
			if &rs.ProposalBlock.Data != nil {
				if rs.ProposalBlock.Data.Txs != nil {
					for _, tx := range rs.ProposalBlock.Data.Txs {
						outTxsFile.WriteString(hex.EncodeToString(tx) + "\n")
						outTxHashesFile.WriteString(hex.EncodeToString(tx.Hash()) + "\n")
					}
				}
				if rs.ProposalBlock.Data.Hash() != nil {
					outTxsFile.WriteString(hex.EncodeToString(rs.ProposalBlock.Data.Hash()) + "\n")
				}
			}

		}
		spew.Fdump(outPartsFile, rs.ProposalBlockParts)

		// for _, val := range rs.Validators.Validators {
		// 	if val.Address.String() == "F9879C1198FA5704046638B2DF4518B08981F573" {
		// 		fmt.Println(val.VotingPower)
		// 	}
		// }

		outBlockFile.WriteString("==================================\n")
		outTxsFile.WriteString("==================================\n")
		outTxHashesFile.WriteString("==================================\n")
		outPartsFile.WriteString("==============================\n")
		outPartBytes.WriteString("==============================\n")
		outPartProofs.WriteString("================================\n")

		outPartsFile.Close()
		outBlockFile.Close()
		outTxsFile.Close()
		outTxHashesFile.Close()
		outPartProofs.Close()
		outPartBytes.Close()
	}

	return types.EventDataRoundState{
		Height: rs.Height,
		Round:  rs.Round,
		Step:   rs.Step.String(),
	}
}

// String returns a string
func (rs *RoundState) String() string {
	return rs.StringIndented("")
}

// StringIndented returns a string
func (rs *RoundState) StringIndented(indent string) string {
	return fmt.Sprintf(`RoundState{
%s  H:%v R:%v S:%v
%s  StartTime:     %v
%s  CommitTime:    %v
%s  Validators:    %v
%s  Proposal:      %v
%s  ProposalBlock: %v %v
%s  LockedRound:   %v
%s  LockedBlock:   %v %v
%s  ValidRound:   %v
%s  ValidBlock:   %v %v
%s  Votes:         %v
%s  LastCommit:    %v
%s  LastValidators:%v
%s}`,
		indent, rs.Height, rs.Round, rs.Step,
		indent, rs.StartTime,
		indent, rs.CommitTime,
		indent, rs.Validators.StringIndented(indent+"  "),
		indent, rs.Proposal,
		indent, rs.ProposalBlockParts.StringShort(), rs.ProposalBlock.StringShort(),
		indent, rs.LockedRound,
		indent, rs.LockedBlockParts.StringShort(), rs.LockedBlock.StringShort(),
		indent, rs.ValidRound,
		indent, rs.ValidBlockParts.StringShort(), rs.ValidBlock.StringShort(),
		indent, rs.Votes.StringIndented(indent+"  "),
		indent, rs.LastCommit.StringShort(),
		indent, rs.LastValidators.StringIndented(indent+"  "),
		indent)
}

// StringShort returns a string
func (rs *RoundState) StringShort() string {
	return fmt.Sprintf(`RoundState{H:%v R:%v S:%v ST:%v}`,
		rs.Height, rs.Round, rs.Step, rs.StartTime)
}
