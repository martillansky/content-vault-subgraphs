import {
  OwnershipTransferred as OwnershipTransferredEvent,
  SchemaSet as SchemaSetEvent,
} from "../generated/SchemaManager/SchemaManager"
import { OwnershipTransferred, SchemaSet } from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSchemaSet(event: SchemaSetEvent): void {
  let entity = new SchemaSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.index = event.params.index
  entity.schemaCID = event.params.schemaCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
