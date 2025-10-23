const FALLBACK_URL = "/posters/image1.jpg";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      key={movie._id}
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 transition-transform"
    >
      <div className="flex p-4">
        <div className="flex-shrink-0 w-1/3 mr-4">
          {" "}
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_URL)
                e.currentTarget.src = FALLBACK_URL;
            }}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>

        <div className="flex-grow ml-5">
          <h3 className="text-lg font-semibold">{movie.title || "title"}</h3>
          <p className="text-gray-600 text-sm mb-2">{movie.genre || "genre"}</p>
          <button
            onClick={() => navigate(`/movies/${movie._id}`)}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 w-1/2 mt-3"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
