import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  VaultFromProposalPermissionUpgraded,
  VaultFromProposalRegisteredOnHomeChain,
  VaultFromProposalRegistrationRequested
} from "../generated/MasterCrosschainGranter/MasterCrosschainGranter"

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

export function createVaultFromProposalPermissionUpgradedEvent(
  proposalId: Bytes,
  user: Address
): VaultFromProposalPermissionUpgraded {
  let vaultFromProposalPermissionUpgradedEvent =
    changetype<VaultFromProposalPermissionUpgraded>(newMockEvent())

  vaultFromProposalPermissionUpgradedEvent.parameters = new Array()

  vaultFromProposalPermissionUpgradedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalPermissionUpgradedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return vaultFromProposalPermissionUpgradedEvent
}

export function createVaultFromProposalRegisteredOnHomeChainEvent(
  proposalId: Bytes,
  tokenContract: Address
): VaultFromProposalRegisteredOnHomeChain {
  let vaultFromProposalRegisteredOnHomeChainEvent =
    changetype<VaultFromProposalRegisteredOnHomeChain>(newMockEvent())

  vaultFromProposalRegisteredOnHomeChainEvent.parameters = new Array()

  vaultFromProposalRegisteredOnHomeChainEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalRegisteredOnHomeChainEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )

  return vaultFromProposalRegisteredOnHomeChainEvent
}

export function createVaultFromProposalRegistrationRequestedEvent(
  proposalId: Bytes,
  tokenContract: Address
): VaultFromProposalRegistrationRequested {
  let vaultFromProposalRegistrationRequestedEvent =
    changetype<VaultFromProposalRegistrationRequested>(newMockEvent())

  vaultFromProposalRegistrationRequestedEvent.parameters = new Array()

  vaultFromProposalRegistrationRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalRegistrationRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )

  return vaultFromProposalRegistrationRequestedEvent
}
