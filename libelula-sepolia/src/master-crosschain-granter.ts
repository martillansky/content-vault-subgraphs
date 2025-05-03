import { log } from "@graphprotocol/graph-ts";
import {
  OwnershipTransferred as OwnershipTransferredEvent,
  VaultFromProposalPermissionUpgraded as VaultFromProposalPermissionUpgradedEvent,
  VaultFromProposalRegisteredOnHomeChain as VaultFromProposalRegisteredOnHomeChainEvent,
  VaultFromProposalRegistrationRequested as VaultFromProposalRegistrationRequestedEvent,
} from "../generated/MasterCrosschainGranter/MasterCrosschainGranter";
import {
  MapProposalToVault,
  OwnershipTransferred,
  Permission,
  VaultFromProposalPermissionUpgraded,
  VaultFromProposalRegisteredOnHomeChain,
  VaultFromProposalRegistrationRequested,
} from "../generated/schema";
import { getPermissionId, getProposalToVaultId } from "../utils/generators";

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultFromProposalPermissionUpgraded(
  event: VaultFromProposalPermissionUpgradedEvent
): void {
  let entity = new VaultFromProposalPermissionUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.user = event.params.user;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let propToVaultId = getProposalToVaultId(event.params.proposalId);
  let mapProposalToVault = MapProposalToVault.load(propToVaultId);
  if (mapProposalToVault == null) {
    log.warning("MapProposalToVault not found for proposalId: {}", [
      event.params.proposalId.toHexString(),
    ]);
    return;
  }

  let permissionId = getPermissionId(
    mapProposalToVault.tokenId,
    event.params.user
  );
  let permission = Permission.load(permissionId);
  if (permission != null) {
    permission.permission = 2; // Permission.WRITE
    permission.save();
  } else {
    log.warning("Permission not found for tokenId: {}", [
      permissionId.toHexString(),
    ]);
  }
}

export function handleVaultFromProposalRegisteredOnHomeChain(
  event: VaultFromProposalRegisteredOnHomeChainEvent
): void {
  let entity = new VaultFromProposalRegisteredOnHomeChain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.tokenContract = event.params.tokenContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVaultFromProposalRegistrationRequested(
  event: VaultFromProposalRegistrationRequestedEvent
): void {
  let entity = new VaultFromProposalRegistrationRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.tokenContract = event.params.tokenContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
