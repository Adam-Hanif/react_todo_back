import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { authSignIn } from "./features/applicationSlice";
import { Link } from "react-router-dom";
function Signin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const erorr = useSelector((state) => state.application.err);
  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSinUp = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
    setLogin("");
    setPassword("");
  };

  return (
    <div className="block_form">
      <form className="signin_form" onSubmit={handleSinUp}>
        <img
          className="gif"
          src="http://i.stack.imgur.com/SBv4T.gif"
          alt="this slowpoke moves"
          width="250"
        />

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
          <button className="signin_button" type="submit">
            Войти
          </button>
          <button className="signin_button signin_btn" type="submit">
            <Link to="/auth">Зарезерверироваться</Link>
          </button>
        </div>
        <p className="err_login">{erorr}</p>
      </form>
    </div>
  );
}
export default Signin;
