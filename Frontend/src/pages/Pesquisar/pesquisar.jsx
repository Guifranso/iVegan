import "./style.css";
import Footer from "../../components/Footer/Footer";
//import Item from "../../components/Item/Item";
import { Redirect } from "react-router-dom";
import React from "react";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";
import Item from "../../components/Item/Item";

function Pesquisar() {
  const [pesquisa, setPesquisa] = React.useState("");
  const comidas = ["arroz", "feijao", "salada", "sushi", "feijoada"];
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
    cart.forEach(function (o, index) {
      o.linhas = index;
    });

    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
  };

  const pesquisar = (e) => {
    setPesquisa(e.target.value);
    // setCart(cart.filter((c) => c.nome === pesquisa));
  };

  const filtrarArray = (e) => {};
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
            return(<div className="item" key={e.id}>
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
          </div>);
          }
        })}
      </div>

      <Footer />
    </>
  );
}

export default Pesquisar;
