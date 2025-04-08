import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
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
  VaultTransferred
} from "../generated/Vault/Vault"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createContentStoredWithMetadataEvent(
  sender: Address,
  tokenId: BigInt,
  encryptedCID: Bytes,
  isCIDEncrypted: boolean,
  metadata: string,
  isMetadataSigned: boolean
): ContentStoredWithMetadata {
  let contentStoredWithMetadataEvent =
    changetype<ContentStoredWithMetadata>(newMockEvent())

  contentStoredWithMetadataEvent.parameters = new Array()

  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam(
      "encryptedCID",
      ethereum.Value.fromBytes(encryptedCID)
    )
  )
  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam(
      "isCIDEncrypted",
      ethereum.Value.fromBoolean(isCIDEncrypted)
    )
  )
  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  contentStoredWithMetadataEvent.parameters.push(
    new ethereum.EventParam(
      "isMetadataSigned",
      ethereum.Value.fromBoolean(isMetadataSigned)
    )
  )

  return contentStoredWithMetadataEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPermissionUpgradedEvent(
  user: Address,
  tokenId: BigInt,
  newPermission: i32
): PermissionUpgraded {
  let permissionUpgradedEvent = changetype<PermissionUpgraded>(newMockEvent())

  permissionUpgradedEvent.parameters = new Array()

  permissionUpgradedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  permissionUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  permissionUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "newPermission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newPermission))
    )
  )

  return permissionUpgradedEvent
}

export function createSchemaSetEvent(
  index: BigInt,
  schemaCID: string
): SchemaSet {
  let schemaSetEvent = changetype<SchemaSet>(newMockEvent())

  schemaSetEvent.parameters = new Array()

  schemaSetEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  schemaSetEvent.parameters.push(
    new ethereum.EventParam("schemaCID", ethereum.Value.fromString(schemaCID))
  )

  return schemaSetEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createVaultAccessGrantedEvent(
  to: Address,
  tokenId: BigInt,
  permission: i32
): VaultAccessGranted {
  let vaultAccessGrantedEvent = changetype<VaultAccessGranted>(newMockEvent())

  vaultAccessGrantedEvent.parameters = new Array()

  vaultAccessGrantedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  vaultAccessGrantedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  vaultAccessGrantedEvent.parameters.push(
    new ethereum.EventParam(
      "permission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(permission))
    )
  )

  return vaultAccessGrantedEvent
}

export function createVaultAccessRevokedEvent(
  to: Address,
  tokenId: BigInt
): VaultAccessRevoked {
  let vaultAccessRevokedEvent = changetype<VaultAccessRevoked>(newMockEvent())

  vaultAccessRevokedEvent.parameters = new Array()

  vaultAccessRevokedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  vaultAccessRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return vaultAccessRevokedEvent
}

export function createVaultCreatedEvent(
  tokenId: BigInt,
  owner: Address,
  schemaCID: string
): VaultCreated {
  let vaultCreatedEvent = changetype<VaultCreated>(newMockEvent())

  vaultCreatedEvent.parameters = new Array()

  vaultCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  vaultCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  vaultCreatedEvent.parameters.push(
    new ethereum.EventParam("schemaCID", ethereum.Value.fromString(schemaCID))
  )

  return vaultCreatedEvent
}

export function createVaultTransferredEvent(
  tokenId: BigInt,
  from: Address,
  to: Address
): VaultTransferred {
  let vaultTransferredEvent = changetype<VaultTransferred>(newMockEvent())

  vaultTransferredEvent.parameters = new Array()

  vaultTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  vaultTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  vaultTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return vaultTransferredEvent
}
