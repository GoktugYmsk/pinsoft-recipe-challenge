import { Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Login from "./components/login";
import Signup from "./components/signup";
import Layout from "./components/layout";
import AddRecipe from "./components/addRecipe";
import UserActivation from './components/hamburgerMenu/userActivation'

import "./App.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft Recipe</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/useractivacation" element={< UserActivation />} />
      </Routes>
    </div>
  );
}

export default App;
