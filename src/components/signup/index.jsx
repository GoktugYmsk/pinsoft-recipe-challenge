import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HamburgerMenu from "../hamburgerMenu";

import "./index.scss";
import Header from "../header";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const registerResponse = await axios.post(
        process.env.REACT_APP_API_URL + "register",
        {
          username: username.trim(),
          password: password,
          email: email,
        }
      );
      console.log("registerResponse", registerResponse);
      if (registerResponse.status === 200) {
        sessionStorage.setItem("username", username);
        const token = registerResponse.data.token;
        axios.defaults.headers.common["Register"] = `Bearer ${token}`;
        sessionStorage.setItem("userTokenTry", token);
      } else if (registerResponse === 403) {
        console.log(
          "Unauthorized. Insufficient permission to access user acoount."
        );
      } else {
        console.log("Error - unknown");
      }
    } catch (error) {
      console.error("Error occured during signup: ", error);
    }
  };
  return (
    <>
      <Header />
      <div className="app">
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
      <HamburgerMenu />
    </>
  );
}
export default Signup;
