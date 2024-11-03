import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage
import '../styles/produtoscomprados.css';  // Importe o arquivo CSS

function ProdutosComprados() {
  const [numerocompra, setNumerocompra] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const url = decodeURIComponent(window.location.href);
    const partesUrl = url.split("/");
    const numerocompra = partesUrl[partesUrl.length - 1];
    setNumerocompra(numerocompra);
  }, []);

  useEffect(() => {
    if (numerocompra) {
      const buscandoProdutos = async () => {
        try {
          const response = await axios.post("http://localhost:8080/pedido/produtospedidos", { idcompra: numerocompra });
          if (response.status === 200) {
            setProdutos(response.data.data);
          } 
        } catch (error) {
          console.log(error);
        }
      };

      buscandoProdutos();
    }
  }, [numerocompra]);

  return (
    <>
      <ToastContainer />
      <div className="produtos-comprados-container">
        <h1 className="produtos-comprados-header">
          <FormattedMessage id="produtos_comprados_title" />
        </h1>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <Card key={produto.idproduto} className="produto-card">
              <Card.Body>
                <Card.Title className="produto-card-title">
                  <FormattedMessage id="produto" defaultMessage="Produto" />
                </Card.Title>
                <Card.Text className="produto-card-text">
                  <p><FormattedMessage id="nome" defaultMessage="Nome" />: {produto.nome}</p>
                  <p><FormattedMessage id="marca" defaultMessage="Marca" />: {produto.marca}</p>
                  <p><FormattedMessage id="quantidade" defaultMessage="Quantidade" />: {produto.quantidade}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p><FormattedMessage id="nenhum_produto_encontrado" /></p>
        )}
      </div>
    </>
  );
}

export default ProdutosComprados;
