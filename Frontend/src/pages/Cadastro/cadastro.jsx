import "./style.css";
import { Link } from "react-router-dom";
import React from 'react';
import api from "../../services/api";

function Cadastro() {

  const userAux = { nome: '', email: '', senhaHash: '', endereco: ''};

  const handleCadastro = async (e) => {
    e.preventDefault();
    if(userAux.nome.length <= 0 || userAux.endereco.length <=3) {
      alert("Insira um nome válido")
    } else if (userAux.email.length <= 0 || userAux.endereco.length < 3) {
      alert("Insira um email válido")
    } else if (userAux.senhaHash.length <= 0 || userAux.endereco.length < 3) {
      alert("Insira uma senha válido")
    } else if (userAux.endereco.length <= 0 || userAux.endereco.length <= 4) {
      alert("Insira um endereco válido")
    } else {
      console.log(userAux)
      try{
        const res = await api.post('/usuarios',userAux)
        console.log(res);
      } catch(err){
        alert("Valores inválidos")
        console.log(err);
      }
    }
  }

  return (
    <div className="login_body">
      <div className="login_main">
        <form className="loginForm">
          <input className="loginInput" name="nome" placeholder="Nome Completo" onChange={(e) => {userAux.nome = e.target.value}}  ></input>
          <input className="loginInput" name="email" placeholder="Email" onChange={(e) => {userAux.email = e.target.value}} ></input>
          <input className="loginInput" type="password" name="senha" placeholder="Senha" onChange={(e) => {userAux.senhaHash = e.target.value}} ></input>
          <input className="loginInput" name="endereco" placeholder="Endereço" onChange={(e) => {userAux.endereco = e.target.value}} ></input>
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
