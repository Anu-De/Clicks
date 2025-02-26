import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../constants/contracts";

export const useAuthContract = () => {
  const { contract } = useContract(CONTRACT_ADDRESSES.authContract, CONTRACT_ABIS.authContract);

  const isClubAdmin = async (clubId, userAddress) => {
    if (!contract) return;
    try {
      const isAdmin = await contract.call("isClubAdmin", [clubId, userAddress]);
      return isAdmin;
    } catch (error) {
      console.error("Error checking club admin:", error);
      throw error;
    }
  };

  const isClubMember = async (clubId, userAddress) => {
    if (!contract) return;
    try {
      const isMember = await contract.call("isClubMember", [clubId, userAddress]);
      return isMember;
    } catch (error) {
      console.error("Error checking club member:", error);
      throw error;
    }
  };

  return {
    isClubAdmin,
    isClubMember,
  };
};