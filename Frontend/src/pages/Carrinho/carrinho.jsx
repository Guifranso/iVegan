import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
//import Item from "../../components/Item/Item";
import { Redirect } from "react-router-dom";
import Salada from "../../assets/img/salada.png";
import React from "react";

function Carrinho() {
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("carrinho")));
  console.log(cart);

  React.useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify([]))
    localStorage.setItem("carrinho", JSON.stringify(cart))
  },[cart]);

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado");
    return <Redirect to="/" />;
  }
  const removeCarrinho = (e) => {
    console.log(cart.filter(c => c.id !== e));
    setCart(cart.filter(c => c.id !== e))
    console.log(cart)
    localStorage.setItem("carrinho", JSON.stringify([]))
    console.log(cart)
  }
  const finalizaPedido = (e) => {
    alert("pedido finalizado")
    localStorage.setItem("carrinho", JSON.stringify([]))
  }
  return (
    <>
      <div className="carrinhoMain">
        <h2 className="title"> Carrinho </h2>

        {cart.map((e) => {
          return (
            <div className="item">
              <img src={Salada} alt="Salada"></img>
              <div className="item_div">
                <div className="item_text">
                  <p> {e.nome} </p>
                  <p> {e.preco} </p>
                </div>
                <div className="item_text">
                  <p> {e.descricao} </p>
                  <button onClick={() => removeCarrinho(e.id)} className="adicionar_produto"> Remover </button>
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
          </ul>
          <ul className="tabelaPerfil_data">
            <li>Av Uirapuru 157</li>
            <li>Pagar na entrega</li>
            <li>Guilherme@gmail.com</li>
          </ul>
        </ul>
        <Link onClick={() => finalizaPedido() } to="/home" className="adicionarCarrinho">
          Finalizar pedido
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Carrinho;
