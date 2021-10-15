import "./Item.css";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";
import React from "react";

function Item() {
  const [cartAux, setCartAux] = React.useState([]);
  const cart = [];

  React.useEffect(async () => {
    try {
      const res = await api.get("/produtos");
      console.log(res);
      setCartAux(res.data);
      console.log(cartAux);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const adicionarCarrinho = (cartAux) => {
    alert("Item Adicionado");
    cart.push(cartAux);
    console.log(cartAux);
    cart.forEach(function (o, index) {
      o.linhas = index;
    });

    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
  };
  return cartAux.map((e) => {
    return (
      <div className="item" key={e.id}>
        <img src={Salada} alt="Salada"></img>
        <div className="item_div">
          <div className="item_text">
            <p> {e.nome} </p>
            <p> {e.preco} </p>
          </div>
          <div className="item_text">
            <p> {e.descricao} </p>
            <button
              className="adicionar_produto"
              onClick={() => adicionarCarrinho(e)}
            >
              Adicionar +
            </button>
          </div>
        </div>
      </div>
    );
  });
}

export default Item;
