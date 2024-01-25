import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom/dist";

import "./index.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const renderErrorMessage = (username) =>
    username === errorMessages.username && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleLogin = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    setIsSubmitted(true);
    e.preventDefault();
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Kullanıcı Adı </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Şifre </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Giriş</div>
        {isSubmitted ? <div>Giriş yapılıyor...</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
