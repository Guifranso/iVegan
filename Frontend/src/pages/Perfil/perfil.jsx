import "./style.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as SairSVG } from "./../../assets/svgs/Sair.svg";
import { Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context"

function Perfil() {
  const {deslogado, setDeslogado, handleLogout, usuario} = useContext(Context)

  if (deslogado === true) {
    setDeslogado(false);
    return <Redirect to="/" />;
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
