import Home from './pages/Home/home';
import Pesquisar from './pages/Pesquisar/pesquisar';
import Carrinho from './pages/Carrinho/carrinho';
import Perfil from './pages/Perfil/perfil';
import Login from './pages/Login/login';
import Produto from './pages/Produto/produto';
import Cadastro from './pages/Cadastro/cadastro';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="/home" exact>
                    <Home/>
                </Route>
                <Route path="/pesquisar" exact>
                    <Pesquisar/>
                </Route>
                <Route path="/carrinho" exact>
                    <Carrinho/>
                </Route>
                <Route path="/perfil" exact>
                    <Perfil/>
                </Route>
                <Route path="/produto" exact>
                    <Produto/>
                </Route>
                <Route path="/cadastro" exact>
                    <Cadastro/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;