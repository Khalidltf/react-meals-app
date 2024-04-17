import { useState } from "react";
import { useGlobalContext } from "../context/context";

const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeals } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    text && setSearchTerm(text);
    // setText("");
  };
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };
  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeals();
  };

  return (
    <header className="search-container" onSubmit={handleSubmit}>
      <form action="">
        <input
          name="text"
          value={text}
          type="text"
          className="form-input"
          placeholder="favourite meal"
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={handleRandomMeal}
        >
          surprise me
        </button>
      </form>
    </header>
  );
};

export default Search;
