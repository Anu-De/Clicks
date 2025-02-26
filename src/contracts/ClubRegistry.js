import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../constants/contracts";

export const useClubRegistry = () => {
  const { contract } = useContract(CONTRACT_ADDRESSES.clubRegistry, CONTRACT_ABIS.clubRegistry);

  const createClub = async (name, description, logoURI) => {
    if (!contract) return;
    try {
      const tx = await contract.call("createClub", [name, description, logoURI]);
      return tx;
    } catch (error) {
      console.error("Error creating club:", error);
      throw error;
    }
  };

  const getClubDetails = async (clubId) => {
    if (!contract) return;
    try {
      const club = await contract.call("getClubDetails", [clubId]);
      return club;
    } catch (error) {
      console.error("Error fetching club details:", error);
      throw error;
    }
  };

  return {
    createClub,
    getClubDetails,
  };
};