import { useGlobalContext } from "../context/context";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Meals = () => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const { meals, loading, selectMeal, theLikeButtonMeal, favouritesMeals } =
    useGlobalContext();

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const endOffset = itemOffset + 3;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(meals.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(meals.length / 3));
  }, [itemOffset, meals]);

  if (loading)
    return (
      <section className="section">
        <h1>Loading...</h1>{" "}
      </section>
    );

  if (meals.length < 1)
    return (
      <section className="section">
        <h2>No meals matched your search. Please try again 👀</h2>
      </section>
    );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % meals.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <section className="section-center">
        {currentItems.map((meal) => {
          const { idMeal, strMeal: title, strMealThumb: image } = meal;
          return (
            <article key={idMeal} className="single-meal">
              <img
                src={image}
                className="img"
                onClick={() => selectMeal(idMeal)}
              />
              <footer>
                <h5>{title}</h5>
                <button
                  className="like-btn"
                  onClick={() => theLikeButtonMeal(idMeal)}
                >
                  {favouritesMeals.some((meal) => meal.idMeal === idMeal) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </footer>
            </article>
          );
        })}
      </section>
      <div className="pagination-wrapper">
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination paginate"
          activeLinkClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Meals;
