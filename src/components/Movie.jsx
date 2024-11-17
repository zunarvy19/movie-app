import React from "react";

const Movie = ({ movie }) => {
  const { Title, Poster } = movie;

  return (
    <div className="card-container border rounded-lg shadow-lg p-4">
      <img
        src={Poster === "N/A" ? "https://via.placeholder.com/150" : Poster}
        alt={Title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="mt-4 text-lg font-semibold text-center">{Title}</h2>
    </div>
  );
};

export default Movie;
