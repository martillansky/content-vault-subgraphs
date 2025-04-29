import {
  OwnershipTransferred as OwnershipTransferredEvent,
  VaultFromProposalCreated as VaultFromProposalCreatedEvent,
  VaultFromProposalPinned as VaultFromProposalPinnedEvent,
  VaultFromProposalUnpinned as VaultFromProposalUnpinnedEvent
} from "../generated/ProposalVaultManager/ProposalVaultManager"
import {
  OwnershipTransferred,
  VaultFromProposalCreated,
  VaultFromProposalPinned,
  VaultFromProposalUnpinned
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalCreated(
  event: VaultFromProposalCreatedEvent
): void {
  let entity = new VaultFromProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.proposalId = event.params.proposalId
  entity.name = event.params.name
  entity.description = event.params.description
  entity.schemaCID = event.params.schemaCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalPinned(
  event: VaultFromProposalPinnedEvent
): void {
  let entity = new VaultFromProposalPinned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.permission = event.params.permission

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalUnpinned(
  event: VaultFromProposalUnpinnedEvent
): void {
  let entity = new VaultFromProposalUnpinned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
