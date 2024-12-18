import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setLastSearch(input);
      setInput("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-row my-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for movies..."
          className="border rounded-md p-3 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 rounded-md"
        >
          Search
        </button>
      </form>
      {lastSearch && (
        <p>
          You searched for: <strong>{lastSearch}</strong>
        </p>
      )}
    </>
  );
};

export default Search;
