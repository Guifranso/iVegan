import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function Cadastro() {
  const userAux = { nome: "", email: "", senhaHash: "", endereco: "" };
  const [sair, setSair] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (userAux.nome.length <= 0 || userAux.nome.length <= 3) {
      alert("Insira um nome maior");
    } else if (userAux.email.length <= 0 || userAux.email.length < 3) {
      alert("Insira um email maior");
    } else if (userAux.senhaHash.length <= 0 || userAux.senhaHash.length < 3) {
      alert("Insira uma senha maior");
    } else if (userAux.endereco.length <= 0 || userAux.endereco.length <= 4) {
      alert("Insira um endereco maior");
    } else {
      console.log(userAux);
      try {
        const res = await api.post("/usuarios", userAux);
        console.log(res);
        setSair(true);
      } catch (err) {
        alert("Valores inválidos");
        console.log(err);
      }
    }
  };

  if (sair === true) {
    return <Redirect to="/" />;
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
              userAux.nome = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              userAux.email = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={(e) => {
              userAux.senhaHash = e.target.value;
            }}
          ></input>
          <input
            className="loginInput"
            name="endereco"
            placeholder="Endereço"
            onChange={(e) => {
              userAux.endereco = e.target.value;
            }}
          ></input>
          <button onClick={handleCadastro} to="/home" className="login_entrar">
            Criar conta
          </button>
          <Link to="/" className="cadastro">
            Voltar para o login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
