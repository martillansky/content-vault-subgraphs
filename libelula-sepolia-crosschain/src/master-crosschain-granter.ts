import {
  OwnershipTransferred as OwnershipTransferredEvent,
  VaultFromProposalPermissionUpgraded as VaultFromProposalPermissionUpgradedEvent,
  VaultFromProposalRegisteredOnHomeChain as VaultFromProposalRegisteredOnHomeChainEvent,
  VaultFromProposalRegistrationRequested as VaultFromProposalRegistrationRequestedEvent
} from "../generated/MasterCrosschainGranter/MasterCrosschainGranter"
import {
  OwnershipTransferred,
  VaultFromProposalPermissionUpgraded,
  VaultFromProposalRegisteredOnHomeChain,
  VaultFromProposalRegistrationRequested
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

export function handleVaultFromProposalPermissionUpgraded(
  event: VaultFromProposalPermissionUpgradedEvent
): void {
  let entity = new VaultFromProposalPermissionUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalRegisteredOnHomeChain(
  event: VaultFromProposalRegisteredOnHomeChainEvent
): void {
  let entity = new VaultFromProposalRegisteredOnHomeChain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.tokenContract = event.params.tokenContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVaultFromProposalRegistrationRequested(
  event: VaultFromProposalRegistrationRequestedEvent
): void {
  let entity = new VaultFromProposalRegistrationRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposalId = event.params.proposalId
  entity.tokenContract = event.params.tokenContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
