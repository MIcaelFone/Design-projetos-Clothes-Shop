import React, { useEffect, useState } from "react";
import '../styles/cadastro.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";

function Cadastro() {
    const [nome, setNome] = useState("");  
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [telefone, setTelefone] = useState("");

    const [erronome, seterronome] = useState("");
    const [erroemail, seterroemail] = useState("");
    const [errosenha, setErrosenha] = useState("");
    const [erroconfirmaSenha, setErroconfirmaSenha] = useState("");
    const [errotelefone, seterrotelefone] = useState("");

    const usenavigate = useNavigate();
    const intl = useIntl();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        localStorage.setItem("IsAdmin",false);
    }, []); 
    const IsValidonome = (nome) => {
        const pattern = /^[A-Za-z\s]+$/;
        if (nome !== "" && !pattern.test(nome)) {
            seterronome(intl.formatMessage({ id: "errors_invalidName", defaultMessage: "Nome deve conter apenas letras. Ex: Micael" }));
            return false;
        }
        if (nome === "") {
            toast.error(intl.formatMessage({ id: "errors_emptyName", defaultMessage: "Nome não pode ficar vazio" }));
            return false;
        }
        seterronome("");
        return true;
    };

    const IsValidoemail = (email) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(email) && email !== "") {
            seterroemail(intl.formatMessage({ id: "errors_invalidEmail", defaultMessage: "Email inválido" }));
            return false;
        }
        if (email === null || email === '') {
            toast.error(intl.formatMessage({ id: "errors_invalidEmail", defaultMessage: "Email não pode ficar vazio" }));
            return false;
        }
        seterroemail("");
        return true;
    };

    const IsValidosenha = (senha) => {
        const senhaPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
        if (!senhaPattern.test(senha) && senha !== "") {
            setErrosenha(intl.formatMessage({ id: "errors_invalidPassword", defaultMessage: "Senha inválida" }));
            return false;
        }
        if (senha === "") {
            toast.error(intl.formatMessage({ id: "errors_emptyPassword", defaultMessage: "Senha não pode ficar vazia" }));
            return false;
        }
        setErrosenha("");
        return true;
    };

    const Isconfirmsenha = (senha, confirmaSenha) => {
        if (senha !== confirmaSenha && confirmaSenha !== "" && senha !== "") {
            setErroconfirmaSenha(intl.formatMessage({ id: "errors_passwordMismatch", defaultMessage: "As duas senhas são diferentes" }));
            return false;
        }
        setErroconfirmaSenha("");  
        return true;
    };

    const Isnumbervalido = (telefone) => {  
        const telefonePattern = new RegExp("^\\(?\\d{2}\\)?\\s?\\d{4,5}\\-?\\d{4}$");
        if (!telefonePattern.test(telefone) && telefone !== "") {
            seterrotelefone(intl.formatMessage({ id: "errors_invalidPhoneNumber", defaultMessage: "Telefone inválido" }));
            return false;
        }
        if (telefone === "" || telefone === null) { 
            toast.error(intl.formatMessage({ id: "errors_emptyPhoneNumber", defaultMessage: "Telefone não pode ficar vazio" }));
            return false;
        }
        seterrotelefone("");
        return true;
    };

    const Handlename = (event) => {
        const value = event.target.value;
        setNome(value);
        IsValidonome(value);
    };

    const Handleemail = (event) => {
        const value = event.target.value;
        setEmail(value);
        IsValidoemail(value);
    };

    const Handlesenha = (event) => {
        const value = event.target.value;
        setSenha(value);
        IsValidosenha(value);
        Isconfirmsenha(value, confirmaSenha);
    };

    const handleConfirmaSenha = (event) => {
        const value = event.target.value;
        setConfirmaSenha(value);
        Isconfirmsenha(senha, value);
    };

    const Handletelefone = (event) => {
        const value = event.target.value;
        setTelefone(value);
        Isnumbervalido(value);
    };

    const CadastraUsuario = async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de envio de formulário
        if (IsValidonome(nome) && IsValidoemail(email) && IsValidosenha(senha) && Isconfirmsenha(senha, confirmaSenha) && Isnumbervalido(telefone)) {
            try {    
                await axios.post("http://localhost:8080/usuario/cadastrarusuario", { nome, email, senha, telefone }).then((resposta) => {
                    if (resposta.status === 201) {
                        toast.success(intl.formatMessage({ id: "messages_registrationSuccess", defaultMessage: "Cadastro realizado com sucesso" }));
                        usenavigate("/Login");
                        localStorage.setItem("IsAdmin",false);
                        return;
                    }
                }); 
            } catch (error) {
                console.error(error);
                toast.error(intl.formatMessage({ id: "messages_existingRegistration", defaultMessage: "Cadastro já existente" }));
            }
        } else {
            toast.error(intl.formatMessage({ id: "messages_invalidData", defaultMessage: "Dados inválidos" }));
        }
    };

    return (
        <div className="Cadastro template d-flex justify-content-center align-items-center vh-100 bg-white">
            <div className="form_container p-5 rounded bg-white">
                <form onSubmit={CadastraUsuario}>
                    <h3 className="text-center">
                        <FormattedMessage id="formLabels_registration" defaultMessage="Cadastro" />
                    </h3>
                    <div className="mt-4">
                        <label htmlFor="text">
                            <FormattedMessage id="formLabels_name" defaultMessage="Nome" />
                        </label>
                        <input
                            type="text"
                            value={nome}
                            placeholder={intl.formatMessage({ id: "formLabels_enterYourName", defaultMessage: "Digite seu nome" })}
                            className="form-control"
                            id="nome"
                            onChange={Handlename}
                        />
                        {erronome && <span className="text-danger">{erronome}</span>}                  
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email">
                            <FormattedMessage id="FormLabels_email" defaultMessage="Email" />
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="email@email.com"
                            className="form-control"
                            id="email"
                            onChange={Handleemail}
                        />
                        {erroemail && <span className="text-danger">{erroemail}</span>}    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password">
                            <FormattedMessage id="FormLabels_password" defaultMessage="Senha" />
                        </label>
                        <input
                            type="password"
                            placeholder={intl.formatMessage({ id: "FormLabels_enterYourPassword", defaultMessage: "Digite a sua senha" })}
                            className="form-control"
                            id="senha"
                            onChange={Handlesenha}
                        />
                        {errosenha && <span className="text-danger">{errosenha}</span>}    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password">
                            <FormattedMessage id="FormLabels_confirmPassword" defaultMessage="Confirmar Senha" />
                        </label>
                        <input
                            type="password"
                            placeholder={intl.formatMessage({ id: "FormLabels_confirmYourPassword", defaultMessage: "Confirme sua senha" })}
                            className="form-control"
                            id="confirmaSenha"
                            onChange={handleConfirmaSenha}
                        />
                        {erroconfirmaSenha && <span className="text-danger">{erroconfirmaSenha}</span>}    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="phone">
                            <FormattedMessage id="FormsLabels_phoneNumber" defaultMessage="Número do telefone" />
                        </label>
                        <input
                            type="text"
                            value={telefone}
                            placeholder="(xx) xxxxx-xxxx"
                            className="form-control"
                            id="numero"
                            onChange={Handletelefone}
                        />
                        {errotelefone && <span className="text-danger">{errotelefone}</span>}
                    </div>
                    <br />
                    <div className="d-grid mt-3">
                        <button className="btn btn-primary">
                            <FormattedMessage id="createAccount" defaultMessage="Criar conta" />
                        </button>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="text-right">
                            <Link to="/Login" className="ms-2">
                                <FormattedMessage id="alreadyHaveAccount" defaultMessage="Já possui conta?" />
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
