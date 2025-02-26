import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../constants/contracts";

export const useElectionManager = () => {
  const { contract } = useContract(CONTRACT_ADDRESSES.electionManager, CONTRACT_ABIS.electionManager);

  const createElection = async (clubId, title, description, startTime, duration) => {
    if (!contract) return;
    try {
      const tx = await contract.call("createElection", [clubId, title, description, startTime, duration]);
      return tx;
    } catch (error) {
      console.error("Error creating election:", error);
      throw error;
    }
  };

  const vote = async (electionId, encryptedVote) => {
    if (!contract) return;
    try {
      const tx = await contract.call("vote", [electionId, encryptedVote]);
      return tx;
    } catch (error) {
      console.error("Error voting:", error);
      throw error;
    }
  };

  return {
    createElection,
    vote,
  };
};