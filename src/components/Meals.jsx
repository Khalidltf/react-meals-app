import { useGlobalContext } from "../context/context";

const Meals = () => {
  const { meals } = useGlobalContext();
  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;

        return (
          <article key={idMeal} className="single-meal">
            <img src={image} className="img" />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">click me</button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
