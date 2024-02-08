import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Form from "./components/Form";
import { FieldValues } from "react-hook-form";
import { useState, Fragment } from "react";
import ProductList from "./components/ProductList";

export interface Product {
  description: string;
  amount: number;
  category: string;
}

function App() {
  const categories: string[] = ["Groceries", "Utilities", "Entertainment"];

  const [products, setProduct] = useState<Product[]>([]);

  const handleFormSubmit = (data: FieldValues) => {
    const product: Product = {
      description: data.description,
      amount: data.amount,
      category: data.category,
    };
    setProduct([product, ...products]);
  };

  return (
    <Fragment>
      <Form categories={categories} onFormSubmit={handleFormSubmit} />
      <ProductList products={products} />
    </Fragment>
  );
}

export default App;
