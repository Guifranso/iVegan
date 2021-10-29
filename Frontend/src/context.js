import React, { createContext, useState } from "react";
import api from "./services/api";
import MuiAlert from "@mui/material/Alert";

export const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [sair, setSair] = useState(false);
  const [logado, setLogado] = useState(false);
  const [deslogado, setDeslogado] = useState(false);
  const user = { nome: "", senhaHash: "", email: "", endereco: ""};
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );
  const [pesquisa, setPesquisa] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")));

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (user.nome.length <= 2) {
      mostraMensagem("Insira um nome maior", "warning")
    } else if (user.email.length < 5) {
      mostraMensagem("Insira um email maior", "warning")
    } else if (user.senhaHash.length < 3) {
      mostraMensagem("Insira uma senha maior", "warning")
    } else if (user.endereco.length <= 4) {
      mostraMensagem("Insira um endereco maior", "warning")
    } else {
      try {
        const res = await api.post("/registrarUsuario", user);
        handleLogin();
      } catch (err) {
        setMensagem("Valores inválidos");
        setSeverity("error");
        setMsgTrigger(true);
        console.log(err);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", user);
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("usuario", JSON.stringify(res?.data?.user[0]));
      localStorage.setItem("carrinho", JSON.stringify([]));
      localStorage.setItem("total", JSON.stringify(0));
      setDeslogado(false);
      setLogado(true);
    } catch (err) {
      console.log(err);
      setMensagem("Valores inválidos");
      setSeverity("error");
      setMsgTrigger(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogado(false);
    setDeslogado(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setMsgTrigger(true);
    setSeverity(severity);
  };

  const adicionarCarrinho = (item) => {
    var itemExiste = false;
    cart.map((e) => {
      if(e.nome == item.nome) {
        e.quantidade+=1;
        itemExiste = true;
      }
    })
    if(!itemExiste) {
      cart.push(item);
    }
    localStorage.setItem("carrinho", JSON.stringify(cart));
    mostraMensagem("Item Adicionado", "success")
    var totalAux = JSON.parse(localStorage.getItem("total"))
    totalAux += item.preco;
    totalAux = totalAux.toFixed(2);
    localStorage.setItem("total", totalAux);
  };

  const removeCarrinho = (e) => {
    setCart(cart.filter((c) => c.id !== e));
    localStorage.setItem("carrinho", JSON.stringify([]));
  };

  const pesquisar = (e) => {
    setPesquisa(e.target.value);
  };

  const diminui = (e) => {
    e.quantidade--;
    if (e.quantidade <= 0) {
      removeCarrinho(e.id);
    }
    localStorage.setItem("total", ((Math.abs(total - e.preco)).toFixed(2)));
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setTotal(total - e.preco);
  };

  const aumenta = (e) => {
    e.quantidade++;
    localStorage.setItem("total", (total + e.preco).toFixed(2));
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setTotal(total + e.preco);
  };

  const finalizaPedido = (e) => {
    setCart([]);
    setTotal(0)
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("total", JSON.stringify(0));
  };

  return (
    <Context.Provider
      value={{
        logado, 
        setLogado,
        deslogado,
        setDeslogado,
        sair,
        setSair,
        user,
        msgTrigger,
        setMsgTrigger,
        severity,
        setSeverity,
        mensagem,
        setMensagem,
        handleCadastro,
        handleLogin,
        handleLogout,
        Alert,
        mostraMensagem,
        adicionarCarrinho,
        cart,
        setCart,
        pesquisar,
        pesquisa,
        setPesquisa,
        usuario,
        produtos,
        setProdutos,
        removeCarrinho,
        diminui,
        aumenta,
        total,
        setTotal,
        finalizaPedido
      }}
    >
      {children}
    </Context.Provider>
  );
};
