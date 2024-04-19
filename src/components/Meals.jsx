import { useGlobalContext } from "../context/context";
import { LuThumbsUp } from "react-icons/lu";

const Meals = () => {
  const { meals, loading, selectMeal } = useGlobalContext();

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
            <img src={image} className="img" onClick={()=>selectMeal(idMeal)} />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">
                <LuThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
