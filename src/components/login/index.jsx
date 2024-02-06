import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";

import axios from "axios";

import Header from "../header";
import HamburgerMenu from "../hamburgerMenu";

import "./index.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();

  const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://recipe-share-jelj.onrender.com/authenticate", {
        username,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userName', username);
      navigate("/");
    } catch (error) {
      setErrorMessages("Invalid credentials. Please try again.");
    }
  };


  return (
    <>
      <Header />
      <div className={`app ${isHamburger ? 'opacityActive' : ''} `}>
        <div className="login-form">
          <div className="title">Giriş</div>
          <div className="form">
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <label>Kullanıcı Adı </label>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="input-container">
                <label>Şifre </label>
                <input
                  type="password"
                  name="pass"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className="button-container" onClick={handleLogin}>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {isHamburger && <HamburgerMenu />}
    </>
  );
}

export default Login;
