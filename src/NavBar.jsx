import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#6200ee", color: "white" }}>
      <h2>Clicks Club</h2>
      <ConnectWallet />
    </nav>
  );
};

export default Navbar;
