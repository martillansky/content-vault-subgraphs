import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  SchemaSet
} from "../generated/SchemaManager/SchemaManager"

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
