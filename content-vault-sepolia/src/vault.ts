import {
  JSONValue,
  JSONValueKind,
  TypedMap,
  json,
  log,
} from "@graphprotocol/graph-ts";
import {
  ApprovalForAll as ApprovalForAllEvent,
  ContentStoredWithMetadata as ContentStoredWithMetadataEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PermissionUpgraded as PermissionUpgradedEvent,
  SchemaSet as SchemaSetEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  VaultAccessGranted as VaultAccessGrantedEvent,
  VaultAccessRevoked as VaultAccessRevokedEvent,
  VaultCreated as VaultCreatedEvent,
  VaultTransferred as VaultTransferredEvent,
} from "../generated/Vault/Vault";
import {
  ApprovalForAll,
  ContentField,
  ContentStoredWithMetadata,
  EIP712DomainChanged,
  OwnershipTransferred,
  PermissionUpgraded,
  SchemaSet,
  TransferBatch,
  TransferSingle,
  URI,
  VaultAccessGranted,
  VaultAccessRevoked,
  VaultCreated,
  VaultTransferred,
} from "../generated/schema";

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

class MetadataType {
  name: string;
  extension: string;
  route: string;
  type: string;
  description: string;
  timestamp: string;
}

export function handleContentStoredWithMetadata(
  event: ContentStoredWithMetadataEvent
): void {
  let id = event.transaction.hash.concatI32(event.logIndex.toI32());
  let entity = new ContentStoredWithMetadata(id);
  entity.sender = event.params.sender;
  entity.tokenId = event.params.tokenId;
  entity.encryptedCID = event.params.encryptedCID;
  entity.isCIDEncrypted = event.params.isCIDEncrypted;
  entity.metadata = event.params.metadata;
  entity.isMetadataSigned = event.params.isMetadataSigned;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Parse metadata JSON
  if (event.params.metadata.length > 0) {
    // Try to parse the JSON directly
    let metadataStr = event.params.metadata.toString();

    // Use a safer approach to handle JSON parsing
    let success = false;

    // First check if it looks like a JSON object
    if (
      metadataStr.length > 0 &&
      metadataStr.startsWith("{") &&
      metadataStr.endsWith("}")
    ) {
      // Try to parse it safely
      if (json.try_fromString(metadataStr)) {
        // If we get here, the JSON is valid
        let metadata = json.fromString(metadataStr);
        let obj = metadata.toObject();

        if (obj != null) {
          for (let i = 0; i < obj.entries.length; i++) {
            let entry = obj.entries[i];
            let key = entry.key.toString();
            let value = entry.value.toString();

            let field = new ContentField(id.toString() + "-" + key);
            field.content = id;
            field.key = key;
            field.value = value;
            field.save();
          }
          success = true;
        }
      }
    }

    // If we couldn't parse the JSON, log a warning
    if (!success) {
      log.warning("Could not parse metadata as JSON: {}", [metadataStr]);
    }
  } else {
    log.warning("Empty metadata received for content: {}", [id.toString()]);
  }
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePermissionUpgraded(event: PermissionUpgradedEvent): void {
  let entity = new PermissionUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.tokenId = event.params.tokenId;
  entity.newPermission = event.params.newPermission;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSchemaSet(event: SchemaSetEvent): void {
  let entity = new SchemaSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.index = event.params.index;
  entity.schemaCID = event.params.schemaCID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.ids = event.params.ids;
  entity.values = event.params.values;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.internal_id = event.params.id;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.value = event.params.value;
  entity.internal_id = event.params.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultAccessGranted(event: VaultAccessGrantedEvent): void {
  let entity = new VaultAccessGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.permission = event.params.permission;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultAccessRevoked(event: VaultAccessRevokedEvent): void {
  let entity = new VaultAccessRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultCreated(event: VaultCreatedEvent): void {
  let entity = new VaultCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.owner = event.params.owner;
  entity.schemaCID = event.params.schemaCID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultTransferred(event: VaultTransferredEvent): void {
  let entity = new VaultTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.from = event.params.from;
  entity.to = event.params.to;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
