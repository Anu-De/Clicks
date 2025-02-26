import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateClubScreen from "./screens/CreateClubScreen";
import JoinClubScreen from "./screens/JoinClubScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import VoteScreen from "./screens/VoteScreen";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/create-club" element={<CreateClubScreen />} />
        <Route path="/join-club" element={<JoinClubScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/vote" element={<VoteScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
