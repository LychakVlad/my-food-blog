import { FC } from "react";

interface IPagination {
  recipesPerPage: number;
  totalRecipes: number;
  paginate: (number: number) => void;
}

const Pagination: FC<IPagination> = ({
  recipesPerPage,
  totalRecipes,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center py-10 flex-wrap">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className="my-2 mx-4 text-xl border-2 px-4 py-2 border-neutral-300 hover:bg-neutral-300 hover:text-neutral-800 transition-color duration-300 focus-within:opacity-50"
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
