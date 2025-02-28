import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";

const App = () => {
  console.log("App rendering");
  try {
    return (
      <Router>
        <AuthProvider>
          <Navbar /> {/* Navbar included on all routes */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<h1 style={{ textAlign: "center", color: "#666", padding: "40px" }}>404 - Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  } catch (error) {
    console.error("App render error:", error);
    return <div style={{ textAlign: "center", color: "#ff4444", padding: "40px" }}>Error rendering app: {error.message}</div>;
  }
};

export default App;