import "./style.css";
import Footer from "../../components/Footer/Footer";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";
import Item from "../../components/Item/Item";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Pesquisar() {
  const [pesquisa, setPesquisa] = useState("");
  const [cartAux, setCartAux] = useState([]);
  const [cart,setCart] = useState([]);
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");
  const [mensagem, setMensagem] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  React.useEffect(async () => {
    try {
      const res = await api.get("/produtos");
      console.log(res);
      setCartAux(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setMsgTrigger(true);
    setSeverity(severity);
  };
  const adicionarCarrinho = (cartAux) => {
    cart.push(cartAux);
    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
    mostraMensagem("Item Adicionado", "success")
  };

  const pesquisar = (e) => {
    setPesquisa(e.target.value);
  };

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="pesquisaMain">
        <h2 className="title"> Pesquisar </h2>
        <input
          className="barraPesquisa"
          onChange={(e) => {
            pesquisar(e);
          }}
          placeholder="Digite o nome do produto"
        ></input>
        {cartAux.map((e) => {
          if (!e.nome.toLowerCase().indexOf(pesquisa.toLowerCase())) {
            return (
              <div className="item" key={e.id}>
                <img loading="lazy" src={Salada} alt="Salada"></img>
                <div className="item_div">
                  <div className="item_text">
                    <p> {e.nome} </p>
                    <p> R$ {e.preco.toFixed(2)} </p>
                  </div>
                  <div className="item_text">
                    <p> {e.descricao} </p>
                    <button
                      className="adicionar_produto"
                      onClick={() => {adicionarCarrinho(e)}}
                    >
                      Adicionar +
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <Footer />
      <Snackbar
        open={msgTrigger}
        autoHideDuration={2000}
        onClose={() => {
          setMsgTrigger(false);
        }}
      >
        <Alert
          onClose={() => {
            setMsgTrigger(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Pesquisar;
