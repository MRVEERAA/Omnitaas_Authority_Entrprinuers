const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
);

export default InputField;
