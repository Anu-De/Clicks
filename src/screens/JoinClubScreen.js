import React, { useState } from "react";
import { useClubRegistry } from "../hooks/useClubRegistry";
import { Button, TextField, Container, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JoinClubScreen = () => {
  const { joinClub } = useClubRegistry();
  const [clubId, setClubId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleJoinClub = async () => {
    if (!clubId) {
      setSnackbarMessage("Please enter a valid Club ID.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await joinClub({ args: [clubId] });
      setSnackbarMessage("Request to join club submitted!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to join club. Check console for details.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Join Club
      </Typography>
      <TextField
        fullWidth
        label="Club ID"
        value={clubId}
        onChange={(e) => setClubId(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleJoinClub} style={{ marginTop: "20px" }}>
        Join Club
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default JoinClubScreen;
