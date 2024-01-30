import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HamburgerMenu from "../hamburgerMenu";

import "./index.scss";
import Header from "../header";
import { useSelector } from "react-redux";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

  const handleSignUp = async (event) => {
    event.preventDefault();

    console.log('username', username)
    console.log('email', email)
    console.log('password', password)

    try {
      const response = await axios.post(
        "https://recipe-share-jelj.onrender.com/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        navigate("/login");
      } else {
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };



  return (
    <>
      <Header />
      <div className={`app ${isHamburger ? 'opacityActive' : 'app'}`}>
        <div className="login-form">
          <div className="title">Giriş</div>
          <div className="form">
            <form onSubmit={handleSignUp}>
              <div className="input-container">
                <label>Email </label>
                <input
                  type="text"
                  name="email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
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
              <div className="button-container" onClick={handleSignUp}>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {isHamburger &&
        <HamburgerMenu />
      }
    </>
  );
}
export default Signup;
