import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../constants/contracts";

export const useProposalManager = () => {
  const { contract } = useContract(CONTRACT_ADDRESSES.proposalManager, CONTRACT_ABIS.proposalManager);

  const submitProposal = async (clubId, title, description, budget, attachmentHash) => {
    if (!contract) return;
    try {
      const tx = await contract.call("submitProposal", [clubId, title, description, budget, attachmentHash]);
      return tx;
    } catch (error) {
      console.error("Error submitting proposal:", error);
      throw error;
    }
  };

  const voteOnProposal = async (proposalId, voteFor) => {
    if (!contract) return;
    try {
      const tx = await contract.call("voteOnProposal", [proposalId, voteFor]);
      return tx;
    } catch (error) {
      console.error("Error voting on proposal:", error);
      throw error;
    }
  };

  return {
    submitProposal,
    voteOnProposal,
  };
};