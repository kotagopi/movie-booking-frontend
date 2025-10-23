import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { MovieCard } from "../components/MovieCard";

const DashBoard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      const errorMsg = serverMessage || "Unable to fetch Movies";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-400 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">🎬 Movies</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Movies List */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
