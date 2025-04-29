import {
  OwnershipTransferred as OwnershipTransferredEvent,
  VaultFromProposalPermissionUpgradeRequested as VaultFromProposalPermissionUpgradeRequestedEvent,
  VaultFromProposalRegisteredOnForeignChain as VaultFromProposalRegisteredOnForeignChainEvent
} from "../generated/ForeignCrosschainGranter/ForeignCrosschainGranter"
import {
  OwnershipTransferred,
  VaultFromProposalPermissionUpgradeRequested,
  VaultFromProposalRegisteredOnForeignChain
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

export function handleVaultFromProposalPermissionUpgradeRequested(
  event: VaultFromProposalPermissionUpgradeRequestedEvent
): void {
  let entity = new VaultFromProposalPermissionUpgradeRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalRegisteredOnForeignChain(
  event: VaultFromProposalRegisteredOnForeignChainEvent
): void {
  let entity = new VaultFromProposalRegisteredOnForeignChain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.tokenContract = event.params.tokenContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
