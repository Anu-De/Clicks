import React, { useState } from "react";
import { useElectionManager } from "../contracts";
import { Button, TextField, Container, Typography } from "@mui/material";

const VoteScreen = () => {
  const { vote } = useElectionManager();
  const [electionId, setElectionId] = useState("");
  const [encryptedVote, setEncryptedVote] = useState("");

  const handleVote = async () => {
    try {
      await vote(electionId, encryptedVote);
      alert("Vote submitted successfully!");
    } catch (error) {
      alert("Failed to submit vote. Check the console for details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Vote
      </Typography>
      <TextField
        fullWidth
        label="Election ID"
        value={electionId}
        onChange={(e) => setElectionId(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Encrypted Vote"
        value={encryptedVote}
        onChange={(e) => setEncryptedVote(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleVote}>
        Submit Vote
      </Button>
    </Container>
  );
};

export default VoteScreen;