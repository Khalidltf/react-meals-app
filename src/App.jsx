import { useGlobalContext } from "./context/context";

import Search from "./components/Search";
// import Favourites from "./components/Favourites";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
// import Favourites from "./components/Favourites";

import "./App.css";

function App() {
  const { showModal } = useGlobalContext();

  return (
    <main>
      <Search />
      {/* <Favourites /> */}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
