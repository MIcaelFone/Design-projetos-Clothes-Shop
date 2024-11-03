import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import { FormattedMessage } from "react-intl";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../../Carrinhoprodutos/config/Cartprovider'; // Importe o contexto do carrinho
import '../styles/produto.css'; // Importe o arquivo CSS criado

const ProductPage = () => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [produto, setProduto] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext); // Use o contexto do carrinho
  useEffect(() => {
    const url = decodeURIComponent(window.location.href);
    const tamanho = url.split("/");
    const nomeProdutoFromUrl = tamanho[tamanho.length - 1];
    console.log(nomeProdutoFromUrl);
    setNomeProduto(nomeProdutoFromUrl);
  }, []);
  useEffect(() => {
    if (nomeProduto) {
      const fetchProduto = async () => {
        try {
          const response = await axios.post("http://localhost:8080/produto/buscandoprodutoespecifico", { nome: nomeProduto });
          if (response.status === 200) {
            setProduto(response.data.data[0]);  // Assumindo que o backend retorna um array de produtos
            console.log("Produto voltou para o frontend");
            console.log(response.data.data);
          }
        } catch (error) {
          toast.error("Não foi possível buscar o produto");
        }
      };
      fetchProduto();
    }
  }, [nomeProduto]);

  const notifyAddedToCart = (item) => toast.success( <> {item.nome} <FormattedMessage id='adicao_produto' /> </>, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#fff',
      color: '#000',
    }
  });

  const notifyRemovedFromCart = (item) => toast.error(<>{item.nome} <FormattedMessage id='removendo_produto'></FormattedMessage> </>, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff',
    }
  });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  return (
    <div className="product-container">
      {produto ? (
        <div className="product-details">
          <div>
            <span className="product-brand">{produto.marca}</span>
            <h1 className="product-name">{produto.nome}</h1>
          </div>
          <p className="product-description">{produto.descricao}</p>
          <div>
            <h6 className="product-price"><FormattedMessage id="money" /> {produto.preco}</h6>
          </div>
          <div className="quantity-container">
            {cartItems.find(item => item.idproduto === produto.idproduto) ? (
              <React.Fragment>
                <button 
                  className="button"
                  onClick={() => addToCart(produto)}
                >
                  +
                </button>
                <p className="quantity-text">
                  {cartItems.find(item => item.idproduto === produto.idproduto)?.quantity}
                </p>
                <button
                  className="button"
                  onClick={() => {
                    const cartItem = cartItems.find((item) => item.idproduto === produto.idproduto);
                    if (cartItem.quantity === 1) {
                      handleRemoveFromCart(produto);
                    } else {
                      removeFromCart(produto);
                    }
                  }}
                >
                  -
                </button>
              </React.Fragment>
            ) : (
              <FaShoppingCart
                size={35}
                style={{ marginLeft: '10px', color: 'black', cursor: 'pointer' }}
                onClick={() => {
                  addToCart(produto);
                  notifyAddedToCart(produto);
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <p>Carregando produto...</p>
      )}
    </div>
  );
};

export default ProductPage;

