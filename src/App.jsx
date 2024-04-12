// import Favourites from "./components/Favourites";
// import Search from "./components/Search";
import Meals from "./components/Meals";
// import Modal from "./components/Modal";
import { AppProvider } from "./context/context";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <main>
        {/* <Search /> */}
        {/* <Favourites /> */}
        <Meals />
        {/* <Modal /> */}
      </main>
    </AppProvider>
  );
}

export default App;
