import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CreateClubScreen from "./screens/CreateClubScreen";
import JoinClubScreen from "./screens/JoinClubScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import VoteScreen from "./screens/VoteScreen";
import NotFoundScreen from "./screens/NotFoundScreen"; // New NotFoundScreen

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/create-club" element={<CreateClubScreen />} />
        <Route path="/join-club" element={<JoinClubScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/vote" element={<VoteScreen />} />
        <Route path="*" element={<NotFoundScreen />} /> {/* Handle unmatched routes */}
      </Routes>
    </Router>
  );
};

export default App;