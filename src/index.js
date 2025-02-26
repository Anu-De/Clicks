import React from "react";
import ReactDOM from "react-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./styles/global.css";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="mumbai">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);