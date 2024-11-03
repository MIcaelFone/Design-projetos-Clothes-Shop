import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useIntl, FormattedMessage } from 'react-intl'; // Certifique-se de importar useIntl e FormattedMessage
import { toast } from 'react-toastify'; // Certifique-se de importar toast
import 'react-toastify/dist/ReactToastify.css'; // Importar o CSS do Toastify   
import '../styles/gerenciamentoroupas.css'; // Importando o CSS

function GerenciamentoRoupa() {
    const [roupas, setRoupas] = useState([]);
    const intl = useIntl();

    const editproduto = (nome) => {
        window.location.href = `/gerenciamentoprodutos/${nome}`;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/produto/cadastroprodutolistar')
            .then(response => {
                setRoupas(response.data);    
            })
            .catch(error => {
                console.log(error);
            });
    }, [intl]);

    return (
        <div className="gerenciamento-roupa-container">
            {roupas.length > 0 ? (
                roupas.map((roupa) => (
                    <div className="gerenciamento-roupa-card-container" key={roupa.idroupa}>
                        <Card className="gerenciamento-roupa-card">
                            <Card.Body>
                                <Card.Text>
                                    <FormattedMessage id="nome" defaultMessage="Nome" />: {roupa.nome}
                                </Card.Text>
                                <Card.Text>
                                    <FormattedMessage id="marca" defaultMessage="Marca" />: {roupa.marca}
                                </Card.Text>
                                <Card.Text>
                                    <FormattedMessage id="preco" defaultMessage="Preço" />: {roupa.preco}
                                </Card.Text>
                                <Card.Text>
                                    <FormattedMessage id="moda" defaultMessage="Moda" />: {roupa.moda}
                                </Card.Text>
                                <Button variant="primary" onClick={() => editproduto(roupa.nome)}>
                                    <FormattedMessage id="editar" defaultMessage="Editar" />
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <h1>
                    <FormattedMessage id="nenhum_produto" defaultMessage="Não possui nenhum produto cadastrado" />
                </h1>
            )}
        </div>
    );
}

export default GerenciamentoRoupa;
