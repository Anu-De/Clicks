import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

const HomeScreen = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome to Clicks
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage your college clubs, elections, and proposals seamlessly.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create-club"
            fullWidth
            sx={{ mb: 2 }}
          >
            Create Club
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/join-club"
            fullWidth
            sx={{ mb: 2 }}
          >
            Join Club
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/vote"
            fullWidth
            sx={{ mb: 2 }}
          >
            Vote
          </Button>
          <Button
            variant="contained"
            color="info"
            component={Link}
            to="/register"
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeScreen;