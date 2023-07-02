import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { authSignUp } from "./features/applicationSlice";
import { Link } from "react-router-dom";
function Auth() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    if (login === "" || password === "") {
      return alert("Заполните все поля");
    }
    dispatch(authSignUp({ login, password }));
    setLogin("");
    setPassword("");
  };
  return (
    <div className="block_form">
      <form className="signin_form" onSubmit={handleSignUp}>
        <input
          className="login_input"
          type="text"
          value={login}
          placeholder="login"
          onChange={handleSetName}
        />
        <br />
        <input
          className="password_input"
          type="password"
          value={password}
          placeholder="password"
          onChange={handleSetPassword}
        />
        <br />
        <div className="input_btn">
          <button className="signin_button signin_btn" type="submit">
            Зарезерверироваться
          </button>
          <button className="signin_button signin_btn" type="submit">
            <Link to="/login"> Back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
export default Auth;
