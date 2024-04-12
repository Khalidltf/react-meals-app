import { createContext, useContext } from "react";

const AppContext = createContext();
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
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
