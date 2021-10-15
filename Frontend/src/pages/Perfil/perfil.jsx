import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as SairSVG } from "./../../assets/svgs/Sair.svg";
import { Redirect } from "react-router-dom";
import { useState } from "react";

function Perfil() {
  const [sair, setSair] = useState(false);

  const userLogado = localStorage.getItem("logado");
  if (userLogado === false || userLogado == null) {
    return <Redirect to="/" />;
  }

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("logado");
    localStorage.removeItem("user");
    setSair(true);
    return <Redirect to="/" />;
  };
  if (sair === true) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="perfilMain">
        <h2 className="title"> Perfil </h2>
        <div className="fotoPerfil"></div>
        <h2> {usuario.nome} </h2>

        <ul className="tabelaPerfil">
          <ul className="tabelaPerfil_head">
            <li>Endereço:</li>
            <li>Carteira:</li>
            <li>Email:</li>
          </ul>
          <ul className="tabelaPerfil_data">
            <li>{usuario.endereco}</li>
            <li>Pagar na entrega</li>
            <li>{usuario.email}</li>
          </ul>
        </ul>

        <Link onClick={handleLogout} to="/" className="sair">
          <p>Sair</p>
          <SairSVG />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
