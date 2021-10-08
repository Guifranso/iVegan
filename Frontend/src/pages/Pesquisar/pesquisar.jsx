import "./style.css";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item/Item";
import { Redirect } from "react-router-dom";
import React from "react";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";

function Pesquisar() {
  const [cartAux, setCartAux] = React.useState([]);
  const [pesquisa, setPesquisa] = React.useState('');
  console.log(pesquisa)

  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("carrinho")));
  console.log(cart);

  React.useEffect(async () => {
    try {
      const res = await api.get("/produtos");
      console.log(res);
      setCart(res.data);
      console.log(cart);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const adicionarCarrinho = (cartAux) => {
    cart.push(cartAux);
    console.log(cartAux);
    cart.forEach(function (o, index) {o.linhas = index});

    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
  };

  const pesquisar = (e) => {
    console.log("rodo")
    setPesquisa(e.target.value)
    setCart(cart.filter(c => c.nome === pesquisa))
    console.log(cart)
    // localStorage.setItem("carrinho", JSON.stringify([]))
    // console.log(cart)
  }
  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado");
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="pesquisaMain">
        <h2 className="title"> Pesquisar </h2>
        <input
          className="barraPesquisa"
          onChange={(e) => {pesquisar(e)}}
          placeholder="Digite o nome do produto"
        ></input>

        {cartAux.map((e) => {
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
        })}
      </div>

      <Footer />
    </>
  );
}

export default Pesquisar;
