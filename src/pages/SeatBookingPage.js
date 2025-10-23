import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const SeatBookingPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
     const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
   fetchMovieDetails();
  }, []);

  const seats = Array.from({length: 40}, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  }

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
        toast.error('Please select atlease one seat!')
    }
    try {
        await api.post('/bookings', {movieId: id, seats: selectedSeats})
    } catch (error) {
        
    }
  }

  const fetchMovieDetails = async () => {
    try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data)
    } catch (error) {
        const serverMessage = error?.response?.data?.message;
        const errorMsg = serverMessage || "Unable to find the movie";
        toast.error(errorMsg);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-600 mb-4">{movie.genre}</p>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />

        <div className="grid grid-cols-8 gap-4 mb-6">
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`w-10 h-10 rounded ${
                selectedSeats.includes(seat)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking ({selectedSeats.length} seats)
        </button>
      </div>
    </div>
  );
};
export default SeatBookingPage;
