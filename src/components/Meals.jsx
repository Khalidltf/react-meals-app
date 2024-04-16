import { useGlobalContext } from "../context/context";

const Meals = () => {
  const context = useGlobalContext();
  return <h1>Hello {context.name}</h1>;
};

export default Meals;
