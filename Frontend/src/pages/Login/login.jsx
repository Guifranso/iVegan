import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Login() {
  const [logado, setLogado] = useState(false);
  const [sair, setSair] = useState(false);
  const userAux = { nome: "", senhaHash: "" };
  const [loginInv, setLoginInv] = useState(false);
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const login = async (req, res) => {
    const token = await criaTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  }
  function criaTokenJWT(usuario) {
    const payload = {
      id: usuario.id
    };
  
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' });
    return token;
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("/usuariosLoga", userAux);
      localStorage.setItem("logado", JSON.stringify(true));
      localStorage.setItem("usuario", JSON.stringify(res.data[0]));
      localStorage.setItem("carrinho", JSON.stringify([]));
      setLogado(true);
      setSair(true);
      login();
    } catch (err) {
      console.log(err);
      setLoginInv(true)
    }
  };

  if (sair === true) {
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
              userAux.nome = e.target.value;
            }}
            placeholder="Usuário"
          ></input>
          <input
            name="senha"
            className="loginInput"
            onChange={(e) => {
              userAux.senhaHash = e.target.value;
            }}
            type="password"
            placeholder="Senha"
          ></input>
          <button onClick={handleLogin} className="login_entrar">
            Entrar
          </button>
          <Link to="/cadastro" className="cadastro">
            Cadastre-se
          </Link>
          <Snackbar open={loginInv} autoHideDuration={6000} onClose={() => setLoginInv(false)}>
            <Alert onClose={() => setLoginInv(false)} severity="error" sx={{ width: '100%' }}>
              CREDENCIAIS INCORRETAS
            </Alert>
          </Snackbar>
        </form>
      </div>
    </div>
  );
}

export default Login;
