import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  getCurrentUser();
  let { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/profile" />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
