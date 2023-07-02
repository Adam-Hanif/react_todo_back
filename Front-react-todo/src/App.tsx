import React, { useState } from "react";
import "./App.css";
import { Todos } from "./Todos";
import Auth from "./Auth";
import SignIn from "./Signin";
import Users from "./Users";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from './app/store';

function App() {
  const token = useSelector((state: RootState) => state.application.token);

  if (!token) {
    return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/users" element={<Navigate to="/login" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="login" element={<SignIn />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <div className="container">

          <Routes>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/auth" element={<Navigate to="/" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Todos />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
