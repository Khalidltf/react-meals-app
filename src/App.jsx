import { useGlobalContext } from "./context/context";

import Search from "./components/Search";
import Favourites from "./components/Favourites";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const { showModal, favouritesMeals } = useGlobalContext();

  return (
    <main>
      <Search />
      {favouritesMeals.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
