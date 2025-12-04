
const Input = ({ type = "text", className, placeholder, value, setValue }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className={className}
  />
);

export default Input;