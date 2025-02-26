import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../constants/contracts";

export const useClubRegistry = () => {
  return useContract(CONTRACT_ADDRESSES.clubRegistry, CONTRACT_ABIS.clubRegistry);
};

export const useAuthContract = () => {
  return useContract(CONTRACT_ADDRESSES.authContract, CONTRACT_ABIS.authContract);
};

export const useElectionManager = () => {
  return useContract(CONTRACT_ADDRESSES.electionManager, CONTRACT_ABIS.electionManager);
};

export const useProposalManager = () => {
  return useContract(CONTRACT_ADDRESSES.proposalManager, CONTRACT_ABIS.proposalManager);
};