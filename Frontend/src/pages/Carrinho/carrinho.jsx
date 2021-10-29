import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Salada from "../../assets/img/salada.png";
import React, { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Context } from "../../context"

function Carrinho() {
  const {

    msgTrigger,
    setMsgTrigger,
    severity,
    mensagem,
    Alert,
    mostraMensagem,
    // cart,
    // removeCarrinho,
    // diminui,
    // aumenta,
    // finalizaPedido
  } = useContext(Context)

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")));

  React.useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }, [cart]);

  const diminui = (e) => {
    e.quantidade--;
    if (e.quantidade <= 0) {
      removeCarrinho(e.id);
    }
    localStorage.setItem("total", (Math.abs(total - e.preco)).toFixed(2));
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setTotal(total - e.preco);
  };

  const aumenta = (e) => {
    e.quantidade++;
    localStorage.setItem("total", (total + e.preco).toFixed(2));
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setTotal(total + e.preco);
  };

  const removeCarrinho = (e) => {
    setCart(cart.filter((c) => c.id !== e));
    localStorage.setItem("carrinho", JSON.stringify([]));
  };

  const finalizaPedido = (e) => {
    setCart([]);
    setTotal(0)
    localStorage.setItem("carrinho", JSON.stringify([]));
    localStorage.setItem("total", JSON.stringify(0));
  };
  
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
                  <div className="quantidadeDiv">
                    <p
                      onClick={() => {
                        diminui(e);
                      }}
                    >
                      -
                    </p>
                    <p> {e.quantidade} </p>
                    <p
                      onClick={() => {
                        aumenta(e);
                      }}
                    >
                      +
                    </p>
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
            <li className="total">R$ {Math.abs(total).toFixed(2)}</li>
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

export default Carrinho;
