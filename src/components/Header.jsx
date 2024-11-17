import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-orange-500 p-4">
      <h1 className="text-white text-xl font-bold text-start">{title}</h1>
    </header>
  );
};

export default Header;
