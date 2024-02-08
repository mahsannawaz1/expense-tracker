import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Form from "./components/Form";

function App() {
  const categories: string[] = ["Groceries", "Utilities", "Entertainment"];
  return <Form categories={categories} />;
}

export default App;
