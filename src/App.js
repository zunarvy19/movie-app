import React, { useState, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const API_KEY = process.env.REACT_APP_MOVIE_APP;

const initialState = {
  movies: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState("batman");
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (keyword) => {
    dispatch({ type: "RESET" });

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        dispatch({ type: "FETCH_SUCCESS", payload: data.Search });
      } else {
        dispatch({ type: "FETCH_ERROR", payload: data.Error });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: "Failed to fetch movies" });
    }
  };

  useEffect(() => {
    fetchMovies(searchKeyword);
  }, [searchKeyword]);

  return (
    <div>
      <Header title="Movie Search App" />
      <div className="container mx-auto p-4">
        <Search onSearch={setSearchKeyword} />
        {state.loading && <p>Loading...</p>}
        {state.error && <p>Error: {state.error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.movies.map((movie) => (
            <Movie key={movie.imdbID || movie.Title} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
