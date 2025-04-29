import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ForeignGatewayRegistered } from "../generated/schema"
import { ForeignGatewayRegistered as ForeignGatewayRegisteredEvent } from "../generated/MasterGateway/MasterGateway"
import { handleForeignGatewayRegistered } from "../src/master-gateway"
import { createForeignGatewayRegisteredEvent } from "./master-gateway-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let chainId = BigInt.fromI32(234)
    let foreignGateway = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newForeignGatewayRegisteredEvent = createForeignGatewayRegisteredEvent(
      chainId,
      foreignGateway
    )
    handleForeignGatewayRegistered(newForeignGatewayRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ForeignGatewayRegistered created and stored", () => {
    assert.entityCount("ForeignGatewayRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ForeignGatewayRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "chainId",
      "234"
    )
    assert.fieldEquals(
      "ForeignGatewayRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "foreignGateway",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
