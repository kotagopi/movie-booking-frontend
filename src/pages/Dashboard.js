import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
const FALLBACK_URL = "/posters/image1.jpg";

const DashBoard = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        async function fetchData () {
        try {
            const response = await api.get('/movies');
            console.log(response, 'res')
            setMovies(response.data);
        } catch (error) {
            const serverMessage = error?.response?.data?.message;
            const errorMsg = serverMessage || 'Unable to fetch Movies';
            toast.error(errorMsg);
        }
        };

        fetchData();

    }, []);



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
         <div
           key={movie._id}
           className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform"
         >
           <img
             src={movie.posterUrl}
             alt={movie.title}
             onError={(e) => {
                if(e.currentTarget.src !== FALLBACK_URL) e.currentTarget.src = FALLBACK_URL;
             }}
             className="w-full h-64 object-cover"
           />
           <div className="p-4">
             <h3 className="text-lg font-semibold">{movie.title || "title"}</h3>
             <p className="text-gray-600 text-sm mb-2">
               {movie.genre || "genre"}
             </p>
             <button
               onClick={() => navigate(`/movies/${movie._id || 1}`)}
               className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
             >
               Book Now
             </button>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}

export default DashBoard;