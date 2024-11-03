import React, { useEffect, useState } from "react";
import Modal from './CartaoModal';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/cartoescadastrados.css';  // Importar o arquivo CSS
import { FormattedMessage } from "react-intl";

function Cartaocadastrado() {
    const [showModal, setShowModal] = useState(false);
    const [iduser, setUserId] = useState(null);
    const [cartao, setCartao] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const { idusuario } = decodedToken;
                setUserId(idusuario);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    const buscandocartao = async () => {
        try {
            const response = await axios.post("http://localhost:8080/cartao/buscarcartao", { idusuario: iduser });
            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.message === 'Cartão encontrado com sucesso' && Array.isArray(responseData.data)) {
                  const cardDataArray = responseData.data;
                  setCartao(cardDataArray)
                }
            }  
        } catch (error) {
            console.log(error);
        }
    };

    const editarcartao = (cartao) => {
        window.location.href = `/cartao/${cartao}`;
    };

    useEffect(() => {
        if (iduser) {
            buscandocartao();
        }
    }, [iduser]);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center text-5xl font-weight-bold mb-4" style={{marginLeft:"35rem"}}>
                    <FormattedMessage id="cartaotitle" defaultMessage="Cartões Cadastrados" />
                </h1>
                <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
                    <FormattedMessage id="adiciona_cartao" defaultMessage="Adicionar Cartão" />
                </button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
            {cartao && cartao.length > 0 ? (
                cartao.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title> 
                                    <FormattedMessage id="responsavel_cartao" defaultMessage="Responsável pelo Cartão" />: {item.nome}
                                </Card.Title>
                                <Card.Text>
                                    <FormattedMessage id="number" defaultMessage="Número" /> {item.numerocartao}
                                </Card.Text>
                                <Button variant="primary" onClick={() => editarcartao(item.numerocartao)}>
                                    <FormattedMessage id="edit" defaultMessage="Editar" />
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <div className="no-cards">
                    <center><h2>
                        <FormattedMessage id="noCardsMessage" defaultMessage="Nenhum cartão cadastrado" />
                    </h2></center>
                </div>
            )}
        </div>
    );
}

export default Cartaocadastrado;