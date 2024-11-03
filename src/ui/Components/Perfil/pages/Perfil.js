import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import '../styles/Perfil_component.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Perfil() {
    const intl = useIntl();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuario, setUsuario] = useState({ nome: '', email: '', senha: '', telefone: '' });
    const [idusuario, setId] = useState('');

    const atualizarusuario = async () => {
        try {
            const resposta_atualizando = await axios.put("http://localhost:8080/usuario/atualizarusuario", { nome, email, senha, telefone, idusuario });
            if (resposta_atualizando.status === 200) {
                toast.success("Usuário atualizado com sucesso!");
                setTimeout(() => {
                    window.location.href = "/Home";
                }, 3100);
            }
        } catch (error) {
            toast.error("Erro para atualizar o cadastro!");
        }
    };

    const deletarusuario = async () => {
        try {
            const resposta_delete = await axios.delete("http://localhost:8080/usuario/deletarusuario", { data: { idusuario } });
            if (resposta_delete.status === 200) {
                toast.success("Usuário removido com sucesso!");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("nome");
                    window.location.href = "/Login";
                }, 3100);
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
                const { idusuario } = decodedToken;
                setId(idusuario);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setNome(usuario.nome || '');
        setSenha(usuario.senha || '');
        setTelefone(usuario.telefone || '');
        setEmail(usuario.email || '');
    }, [usuario]);

    useEffect(() => {
        const Buscandonome = async () => {
            try {
                if (idusuario) {
                    const response = await axios.post("http://localhost:8080/usuario/buscandousuario", { idusuario });
                    if (response.status === 200) {
                        setUsuario(response.data.data[0] || { nome: '', email: '', senha: '', telefone: '' });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        Buscandonome();
    }, [idusuario]);

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
                            <Button variant="primary" onClick={atualizarusuario}> <FormattedMessage id="profile_savechanges" /></Button>
                            <Button variant="danger" onClick={deletarusuario}><FormattedMessage id="profile_delete" /></Button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Perfil;