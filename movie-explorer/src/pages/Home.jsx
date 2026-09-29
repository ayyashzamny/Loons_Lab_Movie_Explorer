import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getTrendingMovies();

        setMovies(data.results);
      } catch (error) {
        console.error('TMDb Error:', error);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-2">
        Movie Explorer
      </h1>

      <p className="text-center text-muted mb-5">
        Trending Movies
      </p>

      <div className="row g-4">
        {movies.map((movie) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;