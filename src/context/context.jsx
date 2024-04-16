import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const allMealsUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
// const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (url) => {
    try {
      const {
        data: { meals },
      } = await axios.get(url);
      setMeals(meals);
      console.log(meals);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  return <AppContext.Provider value={{meals}}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
