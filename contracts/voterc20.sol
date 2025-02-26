import {
  createThirdwebClient,
  getContract,
  resolveMethod,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(1),
  address: "0x...",
});

function App() {
  return (
    <ThirdwebProvider>
      <Component />
    </ThirdwebProvider>
  );
}
