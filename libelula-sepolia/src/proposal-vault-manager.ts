import { Bytes, log } from "@graphprotocol/graph-ts";
import {
  OwnershipTransferred as OwnershipTransferredEvent,
  VaultFromProposalCreated as VaultFromProposalCreatedEvent,
  VaultFromProposalPinned as VaultFromProposalPinnedEvent,
  VaultFromProposalUnpinned as VaultFromProposalUnpinnedEvent,
} from "../generated/ProposalVaultManager/ProposalVaultManager";
import {
  AccessRegistry,
  OwnershipTransferred,
  PendingVaultFromProposal,
  UserData,
  VaultCreated,
  VaultFromProposalCreated,
  VaultFromProposalPinned,
  VaultFromProposalUnpinned,
} from "../generated/schema";

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

export function handleVaultFromProposalCreated(
  event: VaultFromProposalCreatedEvent
): void {
  let entity = new VaultFromProposalCreated(
    //event.transaction.hash.concatI32(event.logIndex.toI32())
    Bytes.fromUTF8(event.params.tokenId.toHexString())
  );
  entity.tokenId = event.params.tokenId;
  entity.proposalId = event.params.proposalId;
  entity.name = event.params.name;
  entity.description = event.params.description;
  entity.schemaCID = event.params.schemaCID;
  entity.chainId = event.params.chainId;
  entity.tokenContract = event.params.tokenContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pendingVaultFromProposal = PendingVaultFromProposal.load(
    Bytes.fromUTF8(entity.tokenId.toHexString())
  );
  if (pendingVaultFromProposal != null) {
    let vaultFromProposalPinned = VaultFromProposalPinned.load(
      Bytes.fromUTF8(
        pendingVaultFromProposal.vaultFromProposalPinned.toHexString()
      )
    );
    vaultFromProposalPinned!.vaultFromProposal = entity.id;
    vaultFromProposalPinned!.save();

    let accessRegistryEntity = new AccessRegistry(
      entity.id.toString() + "-" + entity.tokenId.toString()
    );

    accessRegistryEntity.vaultAccessGranted = entity.id;
    accessRegistryEntity.vaultsFromProposalPinned = entity.id;
    accessRegistryEntity.save();
  }
}

export function handleVaultFromProposalPinned(
  event: VaultFromProposalPinnedEvent
): void {
  let entity = new VaultFromProposalPinned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.permission = event.params.permission;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Create UserData entity if it doesn't exist
  let userData = UserData.load(Bytes.fromUTF8(entity.to.toHexString()));
  if (!userData) {
    userData = new UserData(Bytes.fromUTF8(entity.to.toHexString()));
    userData.user = entity.to;
    userData.save();
  }

  entity.userData = userData.id;
  entity.save();

  // Find the VaultFromProposalCreated entity with the same tokenId
  let vaultFromProposalCreatedEntity = VaultFromProposalCreated.load(
    Bytes.fromUTF8(event.params.tokenId.toHexString())
  );

  // If we found a VaultFromProposalCreated entity, create both
  // the AccessRegistry and the link to the VaultFromProposalCreated entity
  if (vaultFromProposalCreatedEntity != null) {
    entity.vaultFromProposal = vaultFromProposalCreatedEntity.id;
    let accessRegistryEntity = new AccessRegistry(
      entity.id.toString() + "-" + entity.tokenId.toString()
    );

    accessRegistryEntity.vaultAccessGranted = entity.id;
    accessRegistryEntity.vaultsFromProposalPinned =
      vaultFromProposalCreatedEntity.id;
    accessRegistryEntity.save();
  } else {
    let pendingVaultFromProposal = new PendingVaultFromProposal(
      Bytes.fromUTF8(entity.tokenId.toHexString())
    );
    pendingVaultFromProposal.vaultFromProposalPinned = entity.id;
    pendingVaultFromProposal.save();
    log.warning(
      "Could not find VaultFromProposalCreated entity for tokenId: {}",
      [entity.tokenId.toString()]
    );
  }

  entity.save();
}

export function handleVaultFromProposalUnpinned(
  event: VaultFromProposalUnpinnedEvent
): void {
  let entity = new VaultFromProposalUnpinned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
