import "./index.css";

export const Button = ({ text, onClick }) => (
  <button onClick={onClick} className="button" type="button">
    {text}
  </button>
);
