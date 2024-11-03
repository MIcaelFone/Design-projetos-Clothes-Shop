import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.component.css';

const Loginadmin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const intl = useIntl();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("IsAdmin",true);
    }, []);
    const ProceedLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/admin/login", { email, senha });
            if (response.status === 200) {
                const { token} = response.data;
                 
                localStorage.setItem("token", token);
                localStorage.setItem("IsAdmin",true);
                toast.success(intl.formatMessage({ id: 'login_message_success' }));
                window.location.href = "gerenciamentoprodutos";
               
            } else {
                toast.error(intl.formatMessage({ id: 'login_message_invalid' }));
            }
        } catch (err) {
            console.log(err);
            toast.error(intl.formatMessage({ id: 'login_message_error' }));
        }
    }

    return (
        <div className='Login template d-flex justify-content-center align-items-center vh-100 bg-white'>
            <div className='form_container p-5 rounded bg-white'>
                <form onSubmit={ProceedLogin}>
                    <h3 className='text-center'><FormattedMessage id="login_adm"></FormattedMessage></h3>
                    <div className='mb-2'>
                        <label htmlFor='email'><FormattedMessage id="login_Email" /></label>
                        <input type='email' placeholder='exemplo@gmail.com' value={email} className='form-control' id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'><FormattedMessage id="login_password" /></label>
                        <input type='password' placeholder={intl.formatMessage({ id: 'login_input' })} value={senha} className='form-control' id="senha" onChange={(e) => setSenha(e.target.value)}></input>
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className='btn btn-primary'><FormattedMessage id="login_buttom" /></button>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <p className="text-right">
                            <Link to="/cadastroadmin" className="ms-2"><FormattedMessage id="login_not_registered" /></Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Loginadmin;
