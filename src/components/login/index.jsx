import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";

import "./index.scss";
import Header from "../header";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const authResponse = await axios.post(
        process.env.REACT_APP_API_URL + "authenticate",
        {
          username: username.trim(),
          password: password,
        }
      );
      console.log("authResponse", authResponse);
      if (authResponse.status === 200) {
        sessionStorage.setItem("username", username);
        const token = authResponse.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        sessionStorage.setItem("userTokenTry", token);
      } else if (authResponse.status === 403) {
        setErrorMessages(
          "Unauthorized. Insufficeient permission to access user acoount."
        );
      } else {
        setErrorMessages("Error! Please try again later");
      }
    } catch (e) {
      console.error("Error occured during login: ", errorMessages);
      setErrorMessages("An unexpected error occured. Please try again later.");
    }
  };
  const handleSigninClick = () => {
    navigate("/signin");
  };
  return (
    <>
      <Header />
      <div className="app">
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
    </>
  );
}

export default Login;
