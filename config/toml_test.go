package config

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func ensureFiles(t *testing.T, rootDir string, files ...string) {
	for _, f := range files {
		p := rootify(rootDir, f)
		_, err := os.Stat(p)
		assert.Nil(t, err, p)
	}
}

func TestEnsureRoot(t *testing.T) {
	require := require.New(t)

	// setup temp dir for test
	tmpDir, err := os.MkdirTemp("", "config-test")
	require.Nil(err)
	defer os.RemoveAll(tmpDir)

	// create root dir
	EnsureRoot(tmpDir)

	// make sure config is set properly
	data, err := os.ReadFile(filepath.Join(tmpDir, defaultConfigFilePath))
	require.Nil(err)

	if !checkConfig(string(data)) {
		t.Fatalf("config file missing some information")
	}

	ensureFiles(t, tmpDir, "data")
}

func TestEnsureTestRoot(t *testing.T) {
	require := require.New(t)

	testName := "ensureTestRoot"

	// create root dir
	cfg := ResetTestRoot(testName)
	defer os.RemoveAll(cfg.RootDir)
	rootDir := cfg.RootDir

	// make sure config is set properly
	data, err := os.ReadFile(filepath.Join(rootDir, defaultConfigFilePath))
	require.Nil(err)

	if !checkConfig(string(data)) {
		t.Fatalf("config file missing some information")
	}

	// TODO: make sure the cfg returned and testconfig are the same!
	baseConfig := DefaultBaseConfig()
	ensureFiles(t, rootDir, defaultDataDir, baseConfig.Genesis, baseConfig.PrivValidatorKey, baseConfig.PrivValidatorState)
}

func checkConfig(configFile string) bool {
	valid := true

	// list of words we expect in the config
	elems := []string{
		"moniker",
		"seeds",
		"proxy_app",
		"fast_sync",
		"create_empty_blocks",
		"peer",
		"timeout",
		"broadcast",
		"send",
		"addr",
		"wal",
		"propose",
		"max",
		"genesis",
		"skip",
		"sentinel_rpc_string",
		"sentinel_peer_string",
		"personal_peer_ids",
	}
	for _, e := range elems {
		if !strings.Contains(configFile, e) {
			valid = false
		}
	}
	return valid
}
