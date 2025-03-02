import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

const HomeScreen = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Welcome to Clicks
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Manage your college clubs, elections, and proposals seamlessly.
        </Typography>
        <Box mt={4} display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create-club"
            fullWidth
            sx={{ py: 1.2 }}
          >
            Create Club
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/join-club"
            fullWidth
            sx={{ py: 1.2 }}
          >
            Join Club
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/vote"
            fullWidth
            sx={{ py: 1.2 }}
          >
            Vote
          </Button>
          <Button
            variant="contained"
            color="info"
            component={Link}
            to="/register"
            fullWidth
            sx={{ py: 1.2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeScreen;
