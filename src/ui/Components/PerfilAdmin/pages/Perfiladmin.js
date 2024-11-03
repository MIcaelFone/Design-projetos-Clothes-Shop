import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import '../styles/Perfil_component.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PerfilAdmin() {
    const intl = useIntl();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [admin, setAdmin] = useState('');
    const [idadmin, setId] = useState('');

    const atualizaradmin = async () => {
        try {
            const resposta_atualizando = await axios.put("http://localhost:8080/admin/atualizaradmin", { nome, email, senha, telefone, idadmin });
            if (resposta_atualizando.status === 200) {
                toast.success("Usuário atualizado com sucesso!");
                setTimeout(() => {
                    window.location.href = "gereciamentousuarios";
                }, 3100);
            }
        } catch (error) {
            toast.error("Erro para atualizar o cadastro!");
        }
    };

    const deletaradmin = async () => {
        try {
            const resposta_delete = await axios.delete("http://localhost:8080/admin/deletaradmin", { data: { idadmin } });
            if (resposta_delete.status === 200) {
                toast.success("Usuário removido com sucesso!");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("nome");
                    window.location.href = "/login";
                }, 3500);
            }
        } catch (error) {
            toast.error("Erro para remover usuário!");
        }
    };

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                const { idadmin } = decodedToken;
                console.log("ID", idadmin);
                setId(idadmin);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setNome(admin.nome);
        setSenha(admin.senha );
        setTelefone(admin.telefone );
        setEmail(admin.email);
    }, [idadmin]);

    useEffect(() => {
        const buscandoadmin = async () => {
            try {
                if (idadmin) {
                    const response = await axios.post("http://localhost:8080/admin/buscandoadmin", { idadmin:idadmin });
                    console.log("Resposta",response);
                    if (response.status === 200) {
                        console.log("Dados",response.data.data[0]);
                        setNome(response.data.data[0].nome);
                        setEmail(response.data.data[0].email);
                        setSenha(response.data.data[0].senha);
                        setTelefone(response.data.data[0].telefone);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        buscandoadmin();
    }, [idadmin]);

    return (
        <>
            <div className='Perfil template d-flex justify-content-center vh-97 bg-white' style={{ marginTop: "3rem" }}>
                <div className='form_container p-50 rounded bg-white'>
                    <form>
                        <h1 className='text-center'><FormattedMessage id="profile_alterar_informacao" /></h1>
                        <div className='mb-2'>
                            <label htmlFor='text'><FormattedMessage id="formLabels_name" /></label>
                            <input
                                type='text'
                                placeholder={intl.formatMessage({ id: 'formLabels_enterYourName' })}
                                className='form-control'
                                id="nome"
                                required
                                onChange={(e) => setNome(e.target.value)}
                                value={nome}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'><FormattedMessage id="FormLabels_email" /></label>
                            <input
                                type='email'
                                placeholder={intl.formatMessage({ id: 'FormLabels_exampleEmail' })}
                                className='form-control'
                                id="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password'><FormattedMessage id="FormLabels_password" /></label>
                            <input
                                type='password'
                                placeholder={intl.formatMessage({ id: 'FormLabels_enterYourPassword' })}
                                className='form-control'
                                id="senha"
                                required
                                onChange={(e) => setSenha(e.target.value)}
                                value={senha}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='numero'><FormattedMessage id="FormsLabels_phoneNumber" /></label>
                            <input
                                type='text'
                                placeholder='(xx) xxxxx-xxxx'
                                className='form-control'
                                id="numero"
                                required
                                onChange={(e) => setTelefone(e.target.value)}
                                value={telefone}
                            />
                        </div>
                        <div className='d-flex mt-3' style={{ gap: "1rem" }}>
                            <Button variant="primary" onClick={atualizaradmin}> <FormattedMessage id="profile_savechanges" /></Button>
                            <Button variant="danger" onClick={deletaradmin}><FormattedMessage id="profile_delete" /></Button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
}

export default PerfilAdmin;