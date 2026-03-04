import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;
