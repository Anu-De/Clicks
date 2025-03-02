import { useContract, useContractWrite } from "@thirdweb-dev/react";

const contractAddress = "0x5287C022590EB08Df6Da28AC93c7a66D2c40004F"; // Replace with actual contract address

export function useClubRegistry() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: joinClub } = useContractWrite(contract, "joinClub");

  return { joinClub };
}
