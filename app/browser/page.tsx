"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Browser() {
  const [movieTitle, setMovieTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);

  const API_HEADERS = {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTQ1MGVlNmI2ZGVjZDlkOWQ0ZGMzZGZlMGE4N2Q0YiIsIm5iZiI6MTc1NzIzMTY4Ny40MjUsInN1YiI6IjY4YmQzYTQ3OGQ3MWM3YzhiNjhjZWI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cKxJV6LJHKOcUvMdRi84VWwYHJmPNwVmoB6hlx1ja9s",
  };

  // Get hero background movie (now playing)
  const getBackgroundMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        { headers: API_HEADERS }
      );

      const firstMovie = response.data.results[0];
      if (firstMovie) {
        setMovieTitle(firstMovie.title);
        setOverview(firstMovie.overview);

        // fetch videos
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${firstMovie.id}/videos`,
          { headers: API_HEADERS }
        );
        console.log(firstMovie.id)

        const trailer = videoResponse.data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailerKey(trailer?.key);
      }
    } catch (error) {
      console.error("Error fetching hero movie:", error);
    }
  };

  // GetPopularMovies
  const getPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        { headers: API_HEADERS }
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    getBackgroundMovie();
    getPopularMovies();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-x-hidden">
      {/* Background trailer */}
      {trailerKey && (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
          title={movieTitle}
          className="absolute top-0 left-0 w-full h-[90vh] object-cover"
          allow="autoplay; encrypted-media; fullscreen"
        ></iframe>
      )}

    
      <div className="absolute top-0 left-0 w-full h-[90vh] bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div className="absolute px-2 py-90  max-w-xl">
        <h1 className="text-5xl font-bold mb-4">{movieTitle}</h1>
        <p className="mb-6">{overview}</p>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">
            ▶ Play
          </button>
          <button className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600">
            ℹ More Info
          </button>
        </div>
      </div>

      {/* Movie rows */}
      <div className="relative mt-150 px-6">
  <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
  <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
    {popularMovies.map((movie) => (
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-40 rounded-lg hover:scale-105 transition-transform"
      />
    ))}
  </div>
</div>

      <div className="relative mt-4 px-6">
        <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hidden">
          {popularMovies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-40 rounded-lg hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}
