import { useGlobalContext } from "../context/context";

const Favourites = () => {
  const { favouritesMeals, removeFromFavourites, selectMeal } =
    useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favouritesMeals.map((favoriteMeal) => {
            const {
              idMeal,
              strMeal: title,
              strMealThumb: image,
            } = favoriteMeal;
            return (
              <div key={idMeal} className="favorite-meal">
                <img
                  src={image}
                  alt={title}
                  className="favorites-img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  onClick={() => removeFromFavourites(idMeal)}
                  className="remove-btn"
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favourites;
