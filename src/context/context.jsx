import { createContext, useContext, useEffect } from "react";

const AppContext = createContext();
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      console.log("Data", data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ name: "john D.", age: 23 }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
