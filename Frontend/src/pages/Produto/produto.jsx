import './style.css';
import { Link } from "react-router-dom";
import Footer from '../../components/Footer/Footer'
import { Redirect } from 'react-router-dom';

function Produto() {

  const userLogado = localStorage.getItem('logado')
  if(userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado")
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="produtoMain">
        <h2 className="title"> Produto </h2>
        <div className="produtoImg"></div>
        <h2 className="detalhes"> Detalhes </h2>
        <h3> Alface, tomate, brócolis, azeite e sal. </h3>
        <h2 className="detalhes"> Adicionais </h2>
        <div className="preco">
          <h2> Preço </h2>
          <h2> R$ 19,90 </h2>
        </div>
        <Link to="/carrinho" className="adicionarCarrinho">
          Adicionar ao carrinho
        </Link>
      </div>
      <Footer/>
    </>
  );
}

export default Produto;
