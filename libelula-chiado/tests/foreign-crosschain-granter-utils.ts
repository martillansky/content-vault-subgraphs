import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  VaultFromProposalPermissionUpgradeRequested,
  VaultFromProposalRegisteredOnForeignChain
} from "../generated/ForeignCrosschainGranter/ForeignCrosschainGranter"

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

export function createVaultFromProposalPermissionUpgradeRequestedEvent(
  proposalId: Bytes,
  user: Address
): VaultFromProposalPermissionUpgradeRequested {
  let vaultFromProposalPermissionUpgradeRequestedEvent =
    changetype<VaultFromProposalPermissionUpgradeRequested>(newMockEvent())

  vaultFromProposalPermissionUpgradeRequestedEvent.parameters = new Array()

  vaultFromProposalPermissionUpgradeRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalPermissionUpgradeRequestedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return vaultFromProposalPermissionUpgradeRequestedEvent
}

export function createVaultFromProposalRegisteredOnForeignChainEvent(
  proposalId: Bytes,
  tokenContract: Address
): VaultFromProposalRegisteredOnForeignChain {
  let vaultFromProposalRegisteredOnForeignChainEvent =
    changetype<VaultFromProposalRegisteredOnForeignChain>(newMockEvent())

  vaultFromProposalRegisteredOnForeignChainEvent.parameters = new Array()

  vaultFromProposalRegisteredOnForeignChainEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalRegisteredOnForeignChainEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )

  return vaultFromProposalRegisteredOnForeignChainEvent
}
