import "./Item.css";
import Salada from "../../assets/img/salada.png";
import api from "../../services/api";
import React, { useContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Redirect } from "react-router-dom";
import { Context } from "../../context";

function Item() {
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
    produtos,
    setProdutos
  } = useContext(Context)

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("carrinho"))
  );

  const [token, setToken] = useState(localStorage?.getItem("token"));
  React.useEffect(async () => {
    try {
      const res = await api.get("/produtos",{headers:{"token":token}});
      setProdutos(res.data);
    } catch (e) {
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

  return produtos.map((e) => {
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
              onClick={() => adicionarCarrinho(e)}
            >
              Adicionar +
            </button>
          </div>
        </div>
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
      </div>
    );
  });
}

export default Item;
