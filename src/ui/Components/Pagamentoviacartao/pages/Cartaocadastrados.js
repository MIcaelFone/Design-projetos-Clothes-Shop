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
    }

    useEffect(() => {
        if (iduser) {
            buscandocartao();
        }
    }, [iduser]);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center">
                <center>
                    <h1 className="text-center text-5xl font-weight-bold mb-4">
                        <FormattedMessage id="cartaotitle" />
                    </h1>
                </center>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-4">
                <button className="btn btn-primary btn-lg responsive-btn" onClick={() => setShowModal(true)}>
                    <FormattedMessage id="adiciona_cartao" />
                </button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
            {cartao && cartao.length > 0 ? (
                cartao.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>
                                    <FormattedMessage id="responsavel_cartao" />: {item.nome}
                                </Card.Title>
                                <Card.Text>
                                    <FormattedMessage id="number" /> {item.numerocartao}
                                </Card.Text>
                                <Button variant="primary" onClick={() => editarcartao(item.numerocartao)}>
                                    <FormattedMessage id="edit" />
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <div className="no-cards" id="NoCards">
                    <center>
                        <h2><FormattedMessage id="noCardsMessage" defaultMessage="No cards registered" /></h2>
                    </center>
                </div>
            )}
        </div>
    );
}

export default Cartaocadastrado;