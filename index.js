import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const activeChain = "sepolia"; // Make sure it's the correct network

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider activeChain={activeChain}>
    <App />
  </ThirdwebProvider>
);
