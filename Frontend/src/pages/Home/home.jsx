import './style.css';
import Footer from '../../components/Footer/Footer'
import Item from '../../components/Item/Item'
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import Salada from '../../assets/img/salada.png'

function Home() {

  var cartAux = [{ id: 2, nome: 'Saladaa', descricao: 'alfacea e tomatea', preco: "R$a" + 19.90 },
  { id: 4, nome: 'Saladaa', descricao: 'alfacea e tomatea', preco: "R$a" + 19.90 } ];
  const cart = []

  const userLogado = localStorage.getItem('logado')
  if (userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado")
    return <Redirect to="/" />
  }
  const adicionarCarrinho = (cartAux) => {
    cart.push(cartAux);
    console.log(cartAux);
    console.log(cart);
    localStorage.setItem('carrinho', JSON.stringify(cart))
  }
  const handleProduto = async () => {
    try {
      const res = await api.get('/produtos')
      console.log(res.data);
      cartAux = res.data;
      console.log(cartAux);
    } catch (err) {
      alert("Valores inválidos")
      console.log(err);
    }
  }
  // handleProduto();
  // function CriaItens(cartAux) {
  //   for (let i = 0; i < cartAux.length; i++) {
      
  //     console.log(i)
  //     console.log(cartAux.length);
  //     return <div className="item">
  //       <img src={Salada} alt="Salada"></img>
  //       <div className="item_div">
  //         <div className="item_text">
  //           <p> {cartAux[0].nome} </p>
  //           <p> {cartAux[0].preco} </p>
  //         </div>
  //         <div className="item_text">
  //           <p> {cartAux[0].descricao} </p>
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

        <Item />

        <div className="item">
        <img src={Salada} alt="Salada"></img>
        <div className="item_div">
          <div className="item_text">
            <p> {cartAux[0].nome} </p>
            <p> {cartAux[0].preco} </p>
          </div>
          <div className="item_text">
            <p> {cartAux[0].descricao} </p>
            <button className="adicionar_produto" onClick={() => adicionarCarrinho(cartAux[0]) }> AdicionarAA + </button>
          </div>
        </div>
      </div>

      </main>
      <Footer />
    </>
  );
}

export default Home;
