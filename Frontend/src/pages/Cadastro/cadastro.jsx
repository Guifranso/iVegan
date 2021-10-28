import "./style.css";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Context } from "../../context";

function Cadastro() {
  const {logado, 
    setLogado,
    user,
    msgTrigger,
    setMsgTrigger,
    severity,
    mensagem,
    handleCadastro,
    Alert} = useContext(Context)

  if (logado === true) {
    setLogado(false);
    return <Redirect to="/home" />;
  }

  return (
    <div className="login_body">
      <div className="login_main">
        <form className="loginForm">
          <input
            className="loginInput"
            name="nome"
            placeholder="Nome Completo"
            onChange={(e) => {
              user.nome = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              user.email = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={(e) => {
              user.senhaHash = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            name="endereco"
            placeholder="Endereço"
            onChange={(e) => {
              user.endereco = e.target.value;
            }}
          ></input>
          <p onClick={handleCadastro} className="login_entrar">
            Criar conta
          </p>
          <Link to="/" className="cadastro">
            Voltar para o login
          </Link>
        </form>
      </div>
        <Snackbar open={msgTrigger} autoHideDuration={2000} onClose={() => {setMsgTrigger(false)}}>
          <Alert onClose={() => {setMsgTrigger(false)}} severity={severity} sx={{ width: '100%' }}>
          {mensagem}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default Cadastro;
