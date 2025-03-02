import React, { useState } from "react";
import { useClubRegistry } from "../contracts";
import { useNavigate } from "react-router-dom"; // Correct navigation method
import { Button, TextField, Container, Typography, Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateClubScreen = () => {
  const { createClub } = useClubRegistry();
  const navigate = useNavigate(); // Use navigate instead of history.push
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCreateClub = async () => {
    if (!name.trim() || !description.trim()) {
      setSnackbarMessage("Club name and description are required!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      await createClub(name, description, "ipfs://logo.png");
      setSnackbarMessage("Club created successfully!");
      setSnackbarSeverity("success");
      setTimeout(() => navigate("/clubs"), 1500); // Redirect after success
    } catch (error) {
      console.error("Error creating club:", error);
      setSnackbarMessage("Failed to create club. Check console for details.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Club
      </Typography>
      <TextField
        fullWidth
        label="Club Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Club Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClub}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Create Club"}
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateClubScreen;
