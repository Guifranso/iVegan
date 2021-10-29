import "./style.css";
import Footer from "../../components/Footer/Footer";
import { Redirect } from "react-router-dom";
import React, { useContext, useState } from "react";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";
import Item from "../../components/Item/Item";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Context } from "../../context"

function Pesquisar() {
  const {
    deslogado,
    setDeslogado,
    msgTrigger,
    setMsgTrigger,
    severity,
    mensagem,
    mostraMensagem,
    handleLogout,
    Alert,
    // adicionarCarrinho,
    pesquisar,
    pesquisa,
    produtos,
    setProdutos} = useContext(Context)

  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );

  React.useEffect(async () => {
    try {
      const res = await api.get("/produtos",{headers:{"token":token}});
      setProdutos(res.data);
    } catch (e) {
      console.log(e?.response?.status);
      if (e?.response?.status == 403 || e?.response?.status == 401 || e?.response?.status == null){
        handleLogout(); 
      } 
      console.log(e);
    }
  }, []);

  if (deslogado === true) {
    setDeslogado(false);
    return <Redirect to="/" />;
  }

  const adicionarCarrinho = (item) => {
    var itemExiste = false;
    cart.map((e) => {
      if(e.nome == item.nome) {
        e.quantidade+=1;
        itemExiste = true;
      }
    })
    if(!itemExiste) {
      cart.push(item);
    }
    localStorage.setItem("carrinho", JSON.stringify(cart));
    mostraMensagem("Item Adicionado", "success")
    var totalAux = JSON.parse(localStorage.getItem("total"))
    totalAux += item.preco;
    totalAux = totalAux.toFixed(2);
    localStorage.setItem("total", totalAux);
  };

  return (
    <>
      <div className="pesquisaMain">
        <h2 className="title"> Pesquisar </h2>
        <input
          className="barraPesquisa"
          onChange={(e) => {
            pesquisar(e);
          }}
          placeholder="Digite o nome do produto"
        ></input>
        {produtos.map((e) => {
          if (!e.nome.toLowerCase().indexOf(pesquisa.toLowerCase())) {
            return (
              <div className="item" key={e.id}>
                <img loading="lazy" src={Salada} alt="Salada"></img>
                <div className="item_div">
                  <div className="item_text">
                    <p> {e.nome} </p>
                    <p> R$ {e.preco.toFixed(2)} </p>
                  </div>
                  <div className="item_text">
                    <p> {e.descricao} </p>
                    <button
                      className="adicionar_produto"
                      onClick={() => {adicionarCarrinho(e)}}
                    >
                      Adicionar +
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <Footer />
      <Snackbar
        open={msgTrigger}
        autoHideDuration={2000}
        onClose={() => {
          setMsgTrigger(false);
        }}
      >
        <Alert
          onClose={() => {
            setMsgTrigger(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Pesquisar;
