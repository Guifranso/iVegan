import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Redirect } from "react-router-dom";
import Salada from "../../assets/img/salada.png";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Carrinho() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );
  const [mensagem, setMensagem] = useState("");
  const [msgTrigger, setMsgTrigger] = useState(false);
  const [severity, setSeverity] = useState("");
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }, [cart]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    return <Redirect to="/" />;
  }

  const mostraMensagem = (mensagem, severity) => {
    setMensagem(mensagem);
    setMsgTrigger(true);
    setSeverity(severity);
  };
  const removeCarrinho = (e) => {
    setCart(cart.filter((c) => c.id !== e));
    localStorage.setItem("carrinho", JSON.stringify([]));
  };
  const finalizaPedido = (e) => {
    localStorage.setItem("carrinho", JSON.stringify([]));
  };
  const diminui = (e) => {
    e.quantidade--;
    if(e.quantidade <= 0) {
      removeCarrinho(e.id);
    } else {
      setTotal(total-e.preco)
    }
    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }
  const aumenta = (e) => {
    e.quantidade++; 
    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setTotal(total+e.preco)
  }
  return (
    <>
      <div className="carrinhoMain">
        <h2 className="title"> Carrinho </h2>

        {cart.map((e) => {
          return (
            <div className="item">
              <img loading="lazy" src={Salada} alt="Salada"></img>
              <div className="item_div">
                <div className="item_text">
                  <p> {e.nome} </p>
                  <p> R$ {e.preco.toFixed(2)} </p>
                </div>
                <div className="item_text">
                  <p className="cartDesc"> {e.descricao} </p>
                  {/* <button
                    onClick={() => {
                      mostraMensagem("Item Removido", "error");
                      removeCarrinho(e.id);
                    }}
                    className="adicionar_produto"
                  >
                    {" "}
                    Remover{" "}
                  </button> */}
                  <div className="quantidadeDiv">
                    <p onClick={() => {diminui(e)}}>-</p>
                    <p> {e.quantidade} </p>
                    <p onClick={() => {aumenta(e);}}>+</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <ul className="tabelaPerfil">
          <ul className="tabelaPerfil_head">
            <li>Endereço:</li>
            <li>Carteira:</li>
            <li>Email:</li>
            <li className="total">Total:</li>
          </ul>
          <ul className="tabelaPerfil_data">
            <li>Av Uirapuru 157</li>
            <li>Pagar na entrega</li>
            <li>Guilherme@gmail.com</li>
            <li className="total">R$ {total.toFixed(2)}</li>
          </ul>
        </ul>
        <Link
          onClick={() => {
            mostraMensagem("Compra Finalizada", "success");
            finalizaPedido();
          }}
          to="/home"
          className="adicionarCarrinho"
        >
          Finalizar pedido
        </Link>
      </div>
      <Footer />
      <Snackbar
        open={msgTrigger}
        autoHideDuration={2000}
        onClose={() => {
          setMsgTrigger(false);
          console.log(mensagem);
        }}
      >
        <Alert
          onClose={() => {
            setMsgTrigger(false);
            console.log(mensagem);
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

export default Carrinho;
