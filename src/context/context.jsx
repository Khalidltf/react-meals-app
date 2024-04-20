import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favouritesMeals");
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem("favouritesMeals"));
  } else {
    favorites = [];
  }

  return favorites;
};

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [favouritesMeals, setFavouritesMeals] = useState(
    getFavoritesFromLocalStorage()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const {
        data: { meals },
      } = await axios.get(url);
      meals && setMeals(meals);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const fetchRandomMeals = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favouritesMeals.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavourites = (idMeal) => {
    const alreadyFavouritesMeals = favouritesMeals.find(
      (meal) => meal.idMeal === idMeal
    );
    if (alreadyFavouritesMeals) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavouritesMeals = [...favouritesMeals, meal];
    setFavouritesMeals(updatedFavouritesMeals);
    localStorage.setItem(
      "favouritesMeals",
      JSON.stringify(updatedFavouritesMeals)
    );
  };

  const removeFromFavourites = (idMeal) => {
    const updatedFavouritesMeals = favouritesMeals.filter(
      (meal) => meal.idMeal !== idMeal
    );
    setFavouritesMeals(updatedFavouritesMeals);
    localStorage.setItem(
      "favouritesMeals",
      JSON.stringify(updatedFavouritesMeals)
    );
  };

  const theLikeButtonMeal = (idMeal) => {
    if (favouritesMeals.some((meal) => meal.idMeal === idMeal)) {
      removeFromFavourites(idMeal);
    } else {
      addToFavourites(idMeal);
    }
  };


  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeals,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favouritesMeals,
        addToFavourites,
        removeFromFavourites,
        theLikeButtonMeal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
