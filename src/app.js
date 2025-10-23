import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Don't forget this import!
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/Dashboard";
import SeatBookingPage from "./pages/SeatBookingPage";

const App = () => {
  return (
    <>
      {/* The Toaster is correctly placed outside the router for global use */}
      <Toaster position="top-center" />

      <Router>
        <Routes>
          {/* default route '/' redirects to login page */}
          <Route path="/" element={<Navigate  to='/login' replace/>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="movies/:id" element={<SeatBookingPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
