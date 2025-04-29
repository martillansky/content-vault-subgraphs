import {
  ForeignGatewayRegistered as ForeignGatewayRegisteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/MasterGateway/MasterGateway"
import {
  ForeignGatewayRegistered,
  OwnershipTransferred,
} from "../generated/schema"

export function handleForeignGatewayRegistered(
  event: ForeignGatewayRegisteredEvent,
): void {
  let entity = new ForeignGatewayRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.chainId = event.params.chainId
  entity.foreignGateway = event.params.foreignGateway

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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
