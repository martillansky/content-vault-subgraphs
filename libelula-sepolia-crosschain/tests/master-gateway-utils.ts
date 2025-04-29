import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ForeignGatewayRegistered,
  OwnershipTransferred
} from "../generated/MasterGateway/MasterGateway"

export function createForeignGatewayRegisteredEvent(
  chainId: BigInt,
  foreignGateway: Address
): ForeignGatewayRegistered {
  let foreignGatewayRegisteredEvent =
    changetype<ForeignGatewayRegistered>(newMockEvent())

  foreignGatewayRegisteredEvent.parameters = new Array()

  foreignGatewayRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  foreignGatewayRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "foreignGateway",
      ethereum.Value.fromAddress(foreignGateway)
    )
  )

  return foreignGatewayRegisteredEvent
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
