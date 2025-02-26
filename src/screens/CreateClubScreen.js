import React, { useState } from "react";
import { useClubRegistry } from "../contracts";
import { Button, TextField, Container, Typography } from "@mui/material";

const CreateClubScreen = () => {
  const { createClub } = useClubRegistry();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateClub = async () => {
    try {
      await createClub(name, description, "ipfs://logo.png");
      alert("Club created successfully!");
    } catch (error) {
      alert("Failed to create club. Check the console for details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Club
      </Typography>
      <TextField
        fullWidth
        label="Club Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Club Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateClub}>
        Create Club
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

export default CreateClubScreen;