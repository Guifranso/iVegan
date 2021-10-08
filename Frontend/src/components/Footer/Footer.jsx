import './Footer.css';
import { Link } from "react-router-dom";
import {ReactComponent as HomeSVG} from './../../assets/svgs/Home.svg'
import {ReactComponent as CarrinhoSVG} from './../../assets/svgs/Carrinho.svg'
import {ReactComponent as PerfilSVG} from './../../assets/svgs/Perfil.svg'
import {ReactComponent as PesquisarSVG} from './../../assets/svgs/Search.svg'

function Footer() {
  return (
      <footer>
          <Link to="/home" className="footer_item">
            <HomeSVG/>
            <p className="footer_link"> Home </p>
          </Link>

          <Link to="/pesquisar" className="footer_item">
          <PesquisarSVG/>
            <p className="footer_link"> Pesquisar </p>
          </Link>
          
          <Link to="/carrinho" className="footer_item">
            <CarrinhoSVG/>
            <p className="footer_link"> Carrinho </p>
          </Link>
          <Link to="/perfil" className="footer_item">
            <PerfilSVG/>
            <p className="footer_link"> Perfil </p>
          </Link>
      </footer>
  );
}

export default Footer;
