import React from "react";
import { createRoot } from "react-dom/client"; // Updated for React 18
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import "./styles/global.css";

// Create a custom theme as needed
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ee', // Example primary color
    },
    secondary: {
      main: '#ff4081', // Example secondary color
    },
    // Add more customizations as needed
  },
});

// Create the root element
const container = document.getElementById("root");
const root = createRoot(container);

// Render the React app
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="mumbai">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);