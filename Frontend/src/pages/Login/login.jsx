import React, { useContext } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from "../../context"

function Login() {
  const {logado,
    setLogado,
    user,
    msgTrigger,
    setMsgTrigger,
    severity,
    mensagem,
    handleLogin,
    Alert} = useContext(Context)


  if (logado === true) {
    setLogado(false);
    return <Redirect to="/home" />;
  }

  return (
    <div className="login_body">
      <div className="login_main">
        <h1 className="login_title"> iVegan </h1>
        <form className="loginForm">
          <input
            name="usuario"
            className="loginInput"
            onChange={(e) => {
              user.nome = e.target.value;
            }}
            placeholder="Usuário"
          ></input>
          <input
            name="senha"
            className="loginInput"
            onChange={(e) => {
              user.senhaHash = e.target.value;
            }}
            type="password"
            placeholder="Senha"
          ></input>
          <p onClick={handleLogin} className="login_entrar">
            Entrar
          </p>
          <Link to="/cadastro" className="cadastro">
            Cadastre-se
          </Link>
          <Snackbar open={msgTrigger} autoHideDuration={2000} onClose={() => {setMsgTrigger(false)}}>
          <Alert onClose={() => {setMsgTrigger(false)}} severity={severity} sx={{ width: '100%' }}>
          {mensagem}
          </Alert>
        </Snackbar>
        </form>
      </div>
    </div>
  );
}

export default Login;
