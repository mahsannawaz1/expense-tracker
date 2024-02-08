import { useState, ChangeEvent } from "react";
import { Product } from "../App";

interface Props {
  products: Product[];
  categories: string[];
  onDelete: (id: number) => void;
}

const ProductList = ({ products, categories, onDelete }: Props) => {
  const categoriesList = ["All Categories", ...categories];
  let productList = products;
  const [categoryType, setCategoryType] = useState("All Categories");

  const onFilterCategories = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentCategory = event.target.value;
    setCategoryType(currentCategory);

    if (currentCategory !== "All Categories") {
      productList = products.filter(
        (product) => product.category === currentCategory
      );
    } else productList = products;
  };

  return (
    <div className="mt-3">
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          onChange={onFilterCategories}
          className="form-select"
        >
          {categoriesList.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {productList.length !== 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => {
              return product.category == categoryType ||
                categoryType === "All Categories" ? (
                <tr key={index}>
                  <td>{product.description}</td>
                  <td>${product.amount.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ) : null;
            })}

            <tr>
              <td scope="col">Total</td>
              <td colSpan={2}>
                $
                {productList
                  .reduce(
                    (accumulator, product) =>
                      categoryType === product.category ||
                      categoryType === "All Categories"
                        ? accumulator + product.amount
                        : accumulator,
                    0
                  )
                  .toFixed(2)}
              </td>
              <td scope="col"></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
