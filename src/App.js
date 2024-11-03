import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from '../src/ui/Components/Cadastrousuario/pages/Cadastro.js';
import Login from './ui/Components/Login/pages/Login.js';
import Header from '../src/ui/partials/pages/header.js';
import Footer from '../src/ui/partials/pages/Footer.js';
import Perfil from '../src/ui/Components/Perfil/pages/Perfil.js';
import InfoPagamento from '../src/ui/Components/ajudausuario/pages/info_pagamento.js';
import PrazosEnvios from '../src/ui/Components/ajudausuario/pages/prazos_envios.js';
import ComoComprar from '../src/ui/Components/ajudausuario/pages/como_comprar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Home from '../src/ui/Components/Home/pages/home.js';
import Cadastroproduto from '../src/ui/Components/Roupa/pages/cadastroproduto.js';
import { ToastContainer, toast } from 'react-toastify';
import ProductPage from './ui/Components/Roupa/pages/ProductPage.js';
import Navpages from './ui/partials/pages/Navpages.js';
import Moda_masculina from "../src/ui/Components/Tela_produtos/pages/tela_produto_masculino.js";
import Moda_feminina from "../src/ui/Components/Tela_produtos/pages/tela_cadastro_feminino.js";
import Edita_cartao from "../src/ui/Components/Pagamentoviacartao/pages/editacartao.js";
import Telapagamento from "../src/ui/Components/Compra/pages/tela_pagamento.js";
import Minhascompras from "../src/ui/Components/Minhascompras/pages/paginadascompras.js";
import Minhascomprasprodutos from "../src/ui/Components/Minhascompras/pages/produtoscomprados.js";
import Cadastroadmin from "../src/ui/Components/Admin/pages/cadastro.js";
import Loginadmin from "../src/ui/Components/LoginAdmin/pages/Login.js";
import Gerenciamentoprodutos from "../src/ui/Components/gerenciamentoroupas/pages/paginagerenciamento.js";
import Gerenciamentoprodutosedit from "../src/ui/Components/Editproduto/pages/editproduct.js";
import Gerenciamentousuarios from "../src/ui/Components/gerenciamentousuario/pages/gerenciamentousuario.js";
import Perfiladmin from "../src/ui/Components/PerfilAdmin/pages/Perfiladmin.js";
import ProdutoChartPage from "./ui/Components/grafico/ProdutoChartPage.js";
import  Cartaousuario from "./ui/Components/Cartaodousuario/pages/Cartaocadastrados.js"

function App() {
  // Função Authentication deve ser declarada antes de ser usada
  const Authentication = () => {
    const token = localStorage.getItem("token");
    if (token === null) return false;

    try {
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        toast.error("Sessão expirada");
        localStorage.removeItem("token");
        if (IsAdmin()) {
          window.location.href = "/loginadmin";
        } else {
          window.location.href = "/Login";
        }
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const IsAdmin = () => {
    const isAdmin = localStorage.getItem("IsAdmin");
    return isAdmin === "true";
  };

  // Estado de autenticação e useEffect para atualização dinâmica
  const [isLogged, setIsLogged] = useState(Authentication());

  useEffect(() => {
    // Atualiza o estado de autenticação sempre que necessário
    setIsLogged(Authentication());
  }, []);

  const AdminRoute = ({ element }) => {
    return isLogged && IsAdmin() ? element : <Navigate to="/loginadmin" />;
  };

  const ClientRoute = ({ element }) => {
    return isLogged && !IsAdmin() ? element : <Navigate to="/Login" />;
  };

  return (
    <>
      <ToastContainer theme="colored" />
      <BrowserRouter>
        {isLogged && <Header />}
        {isLogged && <Navpages />}
       
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={ClientRoute({ element: <Home /> })} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={ClientRoute({ element: <Home /> })} />
          <Route path="/Perfil" element={ClientRoute({ element: <Perfil /> })} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Info_pagamento" element={ClientRoute({ element: <InfoPagamento /> })} />
          <Route path="/prazos_envios" element={ClientRoute({ element: <PrazosEnvios /> })} />
          <Route path="/como_comprar" element={ClientRoute({ element: <ComoComprar /> })} />
          <Route path="/ProductPage" element={ClientRoute({ element: <ProductPage /> })} />
          <Route path="/moda_feminina" element={ClientRoute({ element: <Moda_feminina /> })} />
          <Route path="/moda_masculina" element={ClientRoute({ element: <Moda_masculina /> })} />
          <Route path="/roupa/:nome" element={ClientRoute({ element: <ProductPage /> })} />
          <Route path="/cartao/:numero" element={ClientRoute({ element: <Edita_cartao /> })} />
          <Route path="/pagamento" element={ClientRoute({ element: <Telapagamento /> })} />
          <Route path="/minhascompras" element={ClientRoute({ element: <Minhascompras /> })} />
          <Route path="/minhascompras/:id" element={ClientRoute({ element: <Minhascomprasprodutos /> })} />
          <Route path="/cadastrocartao" element={ClientRoute({ element: <Cartaousuario /> })} />
          {/* Admin Routes */}
          <Route path="/cadastroadmin" element={<Cadastroadmin />} />
          <Route path="/loginadmin" element={<Loginadmin />} />
          <Route path="/perfiladmin" element={AdminRoute({ element: <Perfiladmin /> })} />
          <Route path="/cadastroproduto" element={AdminRoute({ element: <Cadastroproduto /> })} />
          <Route path="/gerenciamentoprodutos" element={AdminRoute({ element: <Gerenciamentoprodutos /> })} />
          <Route path="/gerenciamentoprodutos/:nomeproduto" element={AdminRoute({ element: <Gerenciamentoprodutosedit /> })} />
          <Route path="/gerenciamentousuarios" element={AdminRoute({ element: <Gerenciamentousuarios /> })} />
          <Route path="/produto-chart" element={AdminRoute({ element: <ProdutoChartPage /> })} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;