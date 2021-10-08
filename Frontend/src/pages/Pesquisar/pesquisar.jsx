import './style.css';
import Footer from '../../components/Footer/Footer'
import Item from '../../components/Item/Item'
import { Redirect } from 'react-router-dom';

function Pesquisar() {

  const userLogado = localStorage.getItem('logado')
  if(userLogado === false || userLogado == null) {
    console.log("Voce nao esta logado")
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="pesquisaMain">
        <h2 className="title"> Pesquisar </h2>
        <input className="barraPesquisa" placeholder="Digite o nome do produto"></input>

        <Item/>

        <Item/>

        <Item/>
      </div>
      
      <Footer/>
    </>
  );
}

export default Pesquisar;
