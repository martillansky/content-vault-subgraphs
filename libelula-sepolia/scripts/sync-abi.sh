#!/bin/bash

# Path to Vault's foundry project
CONTRACTS_PATH="../../content-vault-contracts"

# Path to Vault ABI output
VAULT_JSON="$CONTRACTS_PATH/out/Vault.sol/Vault.json"
SCHEMA_JSON="$CONTRACTS_PATH/out/SchemaManager.sol/SchemaManager.json"
PROPOSAL_VAULT_MANAGER_JSON="$CONTRACTS_PATH/out/ProposalVaultManager.sol/ProposalVaultManager.json"
MASTER_CROSSCHAIN_GRANTER_JSON="$CONTRACTS_PATH/out/MasterCrosschainGranter.sol/MasterCrosschainGranter.json"
MASTER_GATEWAY_JSON="$CONTRACTS_PATH/out/MasterGateway.sol/MasterGateway.json"

# Destination in subgraph
DEST_ABI_DIR="./abis"

DEST_ABI_FILE="$DEST_ABI_DIR/Vault.json"
DEST_SCHEMA_FILE="$DEST_ABI_DIR/SchemaManager.json"
DEST_PROPOSAL_VAULT_MANAGER_FILE="$DEST_ABI_DIR/ProposalVaultManager.json"
DEST_MASTER_CROSSCHAIN_GRANTER_FILE="$DEST_ABI_DIR/MasterCrosschainGranter.json"
DEST_MASTER_GATEWAY_FILE="$DEST_ABI_DIR/MasterGateway.json"

# Ensure output folder exists
mkdir -p "$DEST_ABI_DIR"

# Extract the ABI using jq
jq '.abi' "$VAULT_JSON" > "$DEST_ABI_FILE"
echo "✅ Vault ABI synced to $DEST_ABI_FILE"

jq '.abi' "$SCHEMA_JSON" > "$DEST_SCHEMA_FILE"
echo "✅ SchemaManager ABI synced to $DEST_SCHEMA_FILE"

jq '.abi' "$PROPOSAL_VAULT_MANAGER_JSON" > "$DEST_PROPOSAL_VAULT_MANAGER_FILE"
echo "✅ ProposalVaultManager ABI synced to $DEST_PROPOSAL_VAULT_MANAGER_FILE"

jq '.abi' "$MASTER_CROSSCHAIN_GRANTER_JSON" > "$DEST_MASTER_CROSSCHAIN_GRANTER_FILE"
echo "✅ MasterCrosschainGranter ABI synced to $DEST_MASTER_CROSSCHAIN_GRANTER_FILE"

jq '.abi' "$MASTER_GATEWAY_JSON" > "$DEST_MASTER_GATEWAY_FILE"
echo "✅ MasterGateway ABI synced to $DEST_MASTER_GATEWAY_FILE"

