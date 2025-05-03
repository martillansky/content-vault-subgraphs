import { BigInt, Bytes } from "@graphprotocol/graph-ts";

function getPermissionId(tokenId: BigInt, user: Bytes): Bytes {
  return Bytes.fromHexString(tokenId.toString() + "-" + user.toHexString());
}

function getProposalToVaultId(proposalId: Bytes): Bytes {
  return Bytes.fromHexString(proposalId.toHexString());
}

export { getPermissionId, getProposalToVaultId };
