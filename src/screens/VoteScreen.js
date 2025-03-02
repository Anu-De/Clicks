import React, { useState } from "react";
import { useElectionManager } from "../contracts";
import { Button, TextField, Container, Typography, Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VoteScreen = () => {
  const { vote } = useElectionManager();
  const [electionId, setElectionId] = useState("");
  const [encryptedVote, setEncryptedVote] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateInputs = () => {
    if (!electionId || isNaN(electionId)) {
      setSnackbarMessage("Election ID must be a valid number.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    if (!encryptedVote || encryptedVote.length < 10) {
      setSnackbarMessage("Encrypted vote must be at least 10 characters long.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const handleVote = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await vote(electionId, encryptedVote);
      setSnackbarMessage("Vote submitted successfully!");
      setSnackbarSeverity("success");
      setElectionId("");
      setEncryptedVote("");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Failed to submit vote. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Vote
      </Typography>
      <TextField
        fullWidth
        label="Election ID"
        type="number"
        value={electionId}
        onChange={(e) => setElectionId(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Encrypted Vote"
        value={encryptedVote}
        onChange={(e) => setEncryptedVote(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVote}
        fullWidth
        disabled={loading}
        sx={{ mt: 3, py: 1.2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Vote"}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VoteScreen;
