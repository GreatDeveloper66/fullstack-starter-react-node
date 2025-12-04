const FormButton = ({type, text, className, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className={className}
  >
    {text}
  </button>
);  

export default FormButton;