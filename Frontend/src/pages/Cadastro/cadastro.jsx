import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Cadastro() {
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");
  const [mensagem, setMensagem] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [userAux,setUserAux] = useState({ nome: "", email: "", senhaHash: "", endereco: "" });
  const [sair, setSair] = useState(false);
  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setSeverity(severity);
    setMsgTrigger(true);
  };
  const handleCadastro = async (e) => {
    e.preventDefault();
    if (userAux.nome.length <= 2) {
      console.log(userAux.nome.length);
      console.log("nome pequeno");
      mostraMensagem("Insira um nome maior", "warning")
    } else if (userAux.email.length < 5) {
      console.log("email pequeno");
      mostraMensagem("Insira um email maior", "warning")
    } else if (userAux.senhaHash.length < 3) {
      console.log("senha pequeno");
      mostraMensagem("Insira uma senha maior", "warning")
    } else if (userAux.endereco.length <= 4) {
      console.log("endereco pequeno");
      mostraMensagem("Insira um endereco maior", "warning")
    } else {
      console.log(userAux);
      try {
        const res = await api.post("/usuarios", userAux);
        console.log(res);
        
      } catch (err) {
        alert("Valores inválidos");
        console.log(err);
      }
    }
  };

  if (sair === true) {
    // mostraMensagem("Insira um endereco maior", "warning")
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
        <Snackbar open={msgTrigger} autoHideDuration={2000} onClose={() => {setMsgTrigger(false)}}>
          <Alert onClose={() => {setMsgTrigger(false)}} severity={severity} sx={{ width: '100%' }}>
          {mensagem}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default Cadastro;
