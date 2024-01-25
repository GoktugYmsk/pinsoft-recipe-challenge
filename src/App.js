import { Route, Routes } from "react-router-dom";
import AddRecipe from "./components/addRecipe";
import Login from "./components/login";
import "./App.css";

import Layout from "./components/layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
