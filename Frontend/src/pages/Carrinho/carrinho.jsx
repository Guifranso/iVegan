import './style.css';
import { Link } from "react-router-dom";
import Footer from '../../components/Footer/Footer'
import Item from '../../components/Item/Item'
import { Redirect } from 'react-router-dom';

function Carrinho() {

  const cart = JSON.parse(localStorage.getItem('carrinho'));
  console.log(cart);
  const userLogado = localStorage.getItem('logado')
  if(userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado")
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="carrinhoMain">
        <h2 className="title"> Carrinho </h2>

        <Item />

        <table className="tabelaPerfil">
          <tr className="tabelaPerfil_head">
            <th>Endereço:</th>
            <th>Carteira:</th>
            <th>Email:</th>
          </tr>
          <tr className="tabelaPerfil_data">
            <td>Av Uirapuru 157</td>
            <td>Visa ****-****-157</td>
            <td>Guilherme@gmail.com</td>
          </tr>
        </table>
        <Link to="/carrinho" className="adicionarCarrinho">
          Finalizar pedido
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Carrinho;
