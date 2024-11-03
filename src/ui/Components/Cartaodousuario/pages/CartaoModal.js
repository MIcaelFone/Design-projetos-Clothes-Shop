import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { X } from 'lucide-react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedDate, FormattedMessage } from "react-intl";

function Modal({ onClose }) {
  const [values, setValues] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    focus: ''
  });
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [allValid, setAllValid] = useState(false);

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

  useEffect(() => {
    setAllValid(Object.values(errors).every(error => !error));
  }, [errors]);

  const validateInfo = (data) => {
    let errors = {};
    if (!data.name) {
      errors.name = { variant: 'danger', message: 'Nome é obrigatório' };
    }
    if (!data.number) {
      errors.number = { variant: 'danger', message: 'Número do cartão é obrigatório' };
    }
    if (!data.expiry) {
      errors.expiry = { variant: 'danger', message: 'Validade é obrigatória' };
    }
    if (!data.cvc) {
      errors.cvc = { variant: 'danger', message: 'Código de segurança é obrigatório' };
    }
    return errors;
  };

  const CadastraCartao = async () => {
    try {
      const response = await axios.post("http://localhost:8080/cartao/cadastrarcartao", {
        nome: values.name,
        numerocartao: values.number,
        expiry: values.expiry,
        cvc: values.cvc,
        idusuario: userId
      });
      if (response.status === 201) {
        toast.success("Cartão inserido com sucesso");
      }
    } catch (error) {
      toast.error("Cartão não pode ser cadastrado");
    }
  };

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    const updatedErrors = validateInfo({ ...values, [name]: value });
    setErrors(updatedErrors);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInfo(values);
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      await CadastraCartao();
      onClose();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (allValid) {
      await CadastraCartao();
      onClose();
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="mt-10"
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <button onClick={onClose}
          style={{ alignSelf: "flex-end", background: "none", border: "none", cursor: "pointer" }}><X size={30} /></button>
        <div style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center", margin: "0 1rem" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: "800", color: "black" }}><FormattedMessage id="adicionar_cartao"></FormattedMessage></h1>

          <Cards
            name={values.name}
            number={values.number}
            expiry={values.expiry}
            cvc={values.cvc}
            focused={values.focus}
          />

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>

            <div className="Nome">
              <input
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  color: "black",
                  borderColor: "#D1D5DB",
                  borderRadius: "0.375rem",
                  marginBottom: "1rem"
                }}
                type="text"
                placeholder="Nome completo"
                name="name"
                value={values.name}
                onChange={handleChanges}
                onFocus={handleFocus}
                required
              />
              {errors.name && <div className={`alert alert-${errors.name.variant}`} role="alert">{errors.name.message}</div>}
            </div>

            <div className="Numero_Cartao">
              <input
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  color: "black",
                  borderColor: "#D1D5DB",
                  borderRadius: "0.375rem",
                  marginBottom: "1rem"
                }}
                type="tel"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                name="number"
                value={values.number}
                onChange={handleChanges}
                onFocus={handleFocus}
                required
              />
              {errors.number && <div className={`alert alert-${errors.number.variant}`} role="alert">{errors.number.message}</div>}
            </div>

            <div className="Validade">
              <input
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  color: "black",
                  borderColor: "#D1D5DB",
                  borderRadius: "0.375rem",
                  marginBottom: "1rem"
                }}
                type="text"
                placeholder="xx/xx"
                name="expiry"
                value={values.expiry}
                onChange={handleChanges}
                onFocus={handleFocus}
                required
              />
              {errors.expiry && <div className={`alert alert-${errors.expiry.variant}`} role="alert">{errors.expiry.message}</div>}
            </div>

            <div className="Codigo_Seguranca">
              <input
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  color: "black",
                  borderColor: "#D1D5DB",
                  borderRadius: "0.375rem",
                }}
                type="tel"
                placeholder="xxx"
                name="cvc"
                value={values.cvc}
                onChange={handleChanges}
                onFocus={handleFocus}
                required
              />
              {errors.cvc && <div className={`alert alert-${errors.cvc.variant}`} role="alert">{errors.cvc.message}</div>}
            </div>

            <button className="btn btn-primary btn-lg d-flex justify-content-center align-items-center mt-3 ml-3" onClick={handleAdd}>Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
