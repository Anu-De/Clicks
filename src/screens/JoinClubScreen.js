import React, { useState } from "react";
import { useClubRegistry } from "../contracts";
import { Button, TextField, Container, Typography } from "@mui/material";

const JoinClubScreen = () => {
  const { joinClub } = useClubRegistry();
  const [clubId, setClubId] = useState("");

  const handleJoinClub = async () => {
    try {
      await joinClub(clubId);
      alert("Request to join club submitted!");
    } catch (error) {
      alert("Failed to join club. Check the console for details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Join Club
      </Typography>
      <TextField
        fullWidth
        label="Club ID"
        value={clubId}
        onChange={(e) => setClubId(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleJoinClub}>
        Join Club
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JoinClubScreen;