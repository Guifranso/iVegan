import "./style.css";
import { Link } from "react-router-dom";
import React from "react";
import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Cadastro() {
  const [logado, setLogado] = useState(false);
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
  const handleLogin = async (event) => {
    try {
      const res = await api.post("/usuariosLoga", userAux);
      localStorage.setItem("logado", JSON.stringify(true));
      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("usuario", JSON.stringify(res?.data?.user[0]));
      localStorage.setItem("carrinho", JSON.stringify([]));
      localStorage.setItem("total", JSON.stringify(0));
      setLogado(true);
      setSair(true);
    } catch (err) {
      console.log(err);
      setMensagem("Valores inválidos");
      setSeverity("error");
      setMsgTrigger(true);
    }
  };

  if (sair === true) {
    return <Redirect to="/home" />;
  }
  const handleCadastro = async (e) => {
    e.preventDefault();
    if (userAux.nome.length <= 2) {
      mostraMensagem("Insira um nome maior", "warning")
    } else if (userAux.email.length < 5) {
      mostraMensagem("Insira um email maior", "warning")
    } else if (userAux.senhaHash.length < 3) {
      mostraMensagem("Insira uma senha maior", "warning")
    } else if (userAux.endereco.length <= 4) {
      mostraMensagem("Insira um endereco maior", "warning")
    } else {
      try {
        const res = await api.post("/usuarios", userAux);
        localStorage.setItem("logado", JSON.stringify(true));
        localStorage.setItem("usuario", JSON.stringify(res.data[0]));
        localStorage.setItem("carrinho", JSON.stringify([]));
        handleLogin(userAux);
      } catch (err) {
        setMensagem("Valores inválidos");
        setSeverity("error");
        setMsgTrigger(true);
        console.log(err);
      }
    }
  };

  if (sair === true) {
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
