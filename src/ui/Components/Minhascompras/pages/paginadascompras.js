import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/compras.css';  // Import the CSS file
import { useIntl } from 'react-intl';  // Import useIntl for internationalization

function Minhascompras() {
  const [compras, setCompras] = useState([]);
  const [idusuario, setId] = useState('');
  const intl = useIntl();  // Initialize the hook for accessing messages
  
  const verproduto = (idcompra) => {
    window.location.href = `/minhascompras/${idcompra}`;
  };

  useEffect(() => {
    const buscandoCompras = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const { idusuario } = decodedToken;
          setId(idusuario);

          const response = await axios.post("http://localhost:8080/pedido/pedidosrealizados", { idusuario });
          if (response.status === 200) {
            setCompras(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    buscandoCompras();
  }, [idusuario]);

  return (
    <div className="minhas-compras-container">
      <h1 className="minhas-compras-header">{intl.formatMessage({ id: 'minhas_compras.header' })}</h1>
      {compras.length > 0 ? (
        compras.map((compra) => (
          <Card key={compra.idcompra} className="compra-card">
            <Card.Body>
              <Card.Title className="compra-card-title">{intl.formatMessage({ id: 'minhas_compras.card_title' })}</Card.Title>
              <Card.Text className="compra-card-text">
                <p>{intl.formatMessage({ id: 'minhas_compras.delivery_address' })}: {compra.enderenco}</p>
                <p>{intl.formatMessage({ id: 'minhas_compras.city' })}: {compra.cidade}</p>
                <p>{intl.formatMessage({ id: 'minhas_compras.cep' })}: {compra.CEP}</p>
                <p>{intl.formatMessage({ id: 'minhas_compras.state' })}: {compra.estado}</p>
                <p>{intl.formatMessage({ id: 'minhas_compras.country' })}: {compra.pais}</p>
                <p>{intl.formatMessage({ id: 'minhas_compras.total_value' })}: {compra.valortotal}</p>
              </Card.Text>
              <Button 
                variant="primary" 
                className="compra-card-button" 
                onClick={() => verproduto(compra.idcompra)}
              >
                {intl.formatMessage({ id: 'minhas_compras.view_products' })}
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h1 className="minhas-compras-header">{intl.formatMessage({ id: 'minhas_compras.no_purchases' })}</h1>
      )}
    </div>
  );
}

export default Minhascompras;