import { useGlobalContext } from "../context/context";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Meals = () => {
  const { meals, loading, selectMeal, theLikeButtonMeal, favouritesMeals } =
    useGlobalContext();

  if (loading)
    return (
      <section className="section">
        <h1>Loading...</h1>{" "}
      </section>
    );

  if (meals.length < 1)
    return (
      <section className="section">
        <h2>No meals matched your search. Please try again 👀</h2>
      </section>
    );

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              className="img"
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => theLikeButtonMeal(idMeal)}
              >
                {favouritesMeals.some((meal) => meal.idMeal === idMeal) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
