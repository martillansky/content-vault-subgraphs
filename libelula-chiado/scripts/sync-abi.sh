#!/bin/bash

# Path to Vault's foundry project
CONTRACTS_PATH="../../content-vault-contracts"

# Path to Vault ABI output
FOREIGN_CROSSCHAIN_GRANTER_JSON="$CONTRACTS_PATH/out/ForeignCrosschainGranter.sol/ForeignCrosschainGranter.json"
FOREIGN_GATEWAY_JSON="$CONTRACTS_PATH/out/ForeignGateway.sol/ForeignGateway.json"

# Destination in subgraph
DEST_ABI_DIR="./abis"

DEST_FOREIGN_CROSSCHAIN_GRANTER_FILE="$DEST_ABI_DIR/ForeignCrosschainGranter.json"
DEST_FOREIGN_GATEWAY_FILE="$DEST_ABI_DIR/ForeignGateway.json"

# Ensure output folder exists
mkdir -p "$DEST_ABI_DIR"

# Extract the ABI using jq
jq '.abi' "$FOREIGN_CROSSCHAIN_GRANTER_JSON" > "$DEST_FOREIGN_CROSSCHAIN_GRANTER_FILE"
echo "✅ ForeignCrosschainGranter ABI synced to $DEST_FOREIGN_CROSSCHAIN_GRANTER_FILE"

jq '.abi' "$FOREIGN_GATEWAY_JSON" > "$DEST_FOREIGN_GATEWAY_FILE"
echo "✅ ForeignGateway ABI synced to $DEST_FOREIGN_GATEWAY_FILE"

