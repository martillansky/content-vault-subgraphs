import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  VaultFromProposalCreated,
  VaultFromProposalPinned,
  VaultFromProposalUnpinned
} from "../generated/ProposalVaultManager/ProposalVaultManager"

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

export function createVaultFromProposalCreatedEvent(
  tokenId: BigInt,
  proposalId: Bytes,
  name: string,
  description: string,
  schemaCID: string
): VaultFromProposalCreated {
  let vaultFromProposalCreatedEvent =
    changetype<VaultFromProposalCreated>(newMockEvent())

  vaultFromProposalCreatedEvent.parameters = new Array()

  vaultFromProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  vaultFromProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  vaultFromProposalCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  vaultFromProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  vaultFromProposalCreatedEvent.parameters.push(
    new ethereum.EventParam("schemaCID", ethereum.Value.fromString(schemaCID))
  )

  return vaultFromProposalCreatedEvent
}

export function createVaultFromProposalPinnedEvent(
  to: Address,
  tokenId: BigInt,
  permission: i32
): VaultFromProposalPinned {
  let vaultFromProposalPinnedEvent =
    changetype<VaultFromProposalPinned>(newMockEvent())

  vaultFromProposalPinnedEvent.parameters = new Array()

  vaultFromProposalPinnedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  vaultFromProposalPinnedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  vaultFromProposalPinnedEvent.parameters.push(
    new ethereum.EventParam(
      "permission",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(permission))
    )
  )

  return vaultFromProposalPinnedEvent
}

export function createVaultFromProposalUnpinnedEvent(
  to: Address,
  tokenId: BigInt
): VaultFromProposalUnpinned {
  let vaultFromProposalUnpinnedEvent =
    changetype<VaultFromProposalUnpinned>(newMockEvent())

  vaultFromProposalUnpinnedEvent.parameters = new Array()

  vaultFromProposalUnpinnedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  vaultFromProposalUnpinnedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return vaultFromProposalUnpinnedEvent
}
