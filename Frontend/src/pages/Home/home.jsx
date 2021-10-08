import "./style.css";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item/Item";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import Salada from "../../assets/img/salada.png";
import React from "react";

function Home() {
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

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado");
    return <Redirect to="/" />;
  }

  const adicionarCarrinho = (cartAux) => {
    cart.push(cartAux);
    console.log(cartAux);
    cart.forEach(function (o, index) {o.linhas = index});

    console.log(cart);
    localStorage.setItem("carrinho", JSON.stringify(cart));
  };

  // handleProduto();
  // function CriaItens(cartAux) {
  //   for (let i = 0; i < cartAux.length; i++) {
  //     console.log(i)
  //     console.log(cartAux.length);
  //     return <div className="item">
  //       <img src={Salada} alt="Salada"></img>
  //       <div className="item_div">
  //         <div className="item_text">
  //           <p> {e.nome} </p>
  //           <p> {e.preco} </p>
  //         </div>
  //         <div className="item_text">
  //           <p> {e.descricao} </p>
  //           <button className="adicionar_produto" onClick= {() => console.log("aaaaa")}> AdicionarAA + </button>
  //         </div>
  //       </div>
  //     </div>
  //   }
  // }

  return (
    <>
      <main className="homeMain">
        <h2> Promoções </h2>
        <div className="banner">
          <button className="banner_button"> Explorar </button>
        </div>
        <h2> Destaques </h2>

        {/* <Item /> */}
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
        {/* <div to="/produto" className="item">
          <img src={Salada} alt="Salada"></img>
          <div className="item_div">
            <div className="item_text">
              <p> Salada </p>
              <p> R$ 19,90 </p>
            </div>
            <div className="item_text">
              <p> Alface, tomate, brócolis </p>
              <button className="adicionar_produto"> Adicionar + </button>
            </div>
          </div>
        </div> */}
      </main>
      <Footer />
    </>
  );
}

export default Home;
