import React from "react";

const ModeCard = ({ title, description, onClick }) => {
  return (
    <div
      className="bg-white shadow-lg p-6 rounded-lg cursor-pointer hover:scale-105 transform transition"
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ModeCard;
