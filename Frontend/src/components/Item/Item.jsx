import './Item.css';
import Salada from '../../assets/img/salada.png'
import { Link } from "react-router-dom";

function Item() {
  return (
    <Link to="/produto" className="item">
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
  </Link>
  );
}

export default Item;
