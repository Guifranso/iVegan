import "./style.css";
import Footer from "../../components/Footer/Footer";
import Item from "../../components/Item/Item";
import React from "react";

function Home() {

  return (
    <>
      <main className="homeMain">
        <h2> Promoções </h2>
        <div className="banner">
          <button className="banner_button"> Explorar </button>
        </div>
        <h2> Destaques </h2>
        <Item />
      </main>
      <Footer />
    </>
  );
}

export default Home;
