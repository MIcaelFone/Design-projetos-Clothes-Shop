import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useIntl, FormattedMessage } from 'react-intl'; // Import useIntl and FormattedMessage
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import "../styles/gerenciamento.css"; // Import the CSS file

function GerenciamentoRoupa() {
    const [usuario, setUsuario] = useState([]);
    const intl = useIntl(); // Initialize useIntl

    useEffect(() => {
        axios.get('http://localhost:8080/usuario/listarusuarios')
            .then(response => {
                setUsuario(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const deletarusuario = async (remover) => {
        try {
            const resposta_delete = await axios.delete("http://localhost:8080/usuario/deletarusuario", { data: { idusuario: remover } });
            if (resposta_delete.status === 200) {
                toast.success(intl.formatMessage({ id: 'usuario_removido_sucesso', defaultMessage: 'User removed successfully!' }));
                setUsuario(usuario.filter(user => user.id !== remover)); // Remove the user from the state
            }
        } catch (error) {
            toast.error(intl.formatMessage({ id: 'erro_remover_usuario', defaultMessage: 'Error removing user!' }));
        }
    };

    return (
        <div className="gerenciamento-roupa-container">
            {usuario.length > 0 ? (
                usuario.map((user, index) => (
                    <div className="gerenciamento-roupa-card-container" key={index}>
                        <Card className="gerenciamento-roupa-card">
                            <Card.Body>
                                <Card.Text>
                                    <FormattedMessage id="nome" defaultMessage="Name" />: {user.nome}
                                </Card.Text>
                                <Card.Text>
                                    <FormattedMessage id="email" defaultMessage="Email" />: {user.email}
                                </Card.Text>
                                <Card.Text>
                                    <FormattedMessage id="telefone" defaultMessage="Phone" />: {user.telefone}
                                </Card.Text>
                                <Button variant="danger" onClick={() => deletarusuario(user.idusuario)}>
                                    <FormattedMessage id="deletar" defaultMessage="Delete" />
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <h1>
                    <FormattedMessage id="nenhum_usuario_cadastrado" defaultMessage="No users registered" />
                </h1>
            )}
        </div>
    );
}

export default GerenciamentoRoupa;
