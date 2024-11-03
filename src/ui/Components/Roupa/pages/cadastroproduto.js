import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import "../styles/cadastro_produto.css";
import imagemRoupas from '../../../../assests/roupas-masculinas-estilosas-com-jeans-e-camiseta.webp';
import { toast } from "react-toastify";
import axios from 'axios';

function TelaCadastroProduto() {
    const intl = useIntl();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [marca, setMarca] = useState('');
    const [preco, setPreco] = useState('');
    const [moda, setModa] = useState('moda_masculina');
    const isNomeValid = (nome) => {
        const pattern = new RegExp("^[A-Za-z]");
        if (!pattern.test(nome) && nome !== "") {
            toast.warning(intl.formatMessage({ id: "toast_invalidNome" }));
        } if (nome === "") {
            toast.error(intl.formatMessage({ id: "toast_emptyNome" }));
        }
    }
    
    const isdescricaoValid = (descricao) => {
      
        const pattern = new RegExp("[A-Za-z]+");
        if (!pattern.test(descricao) && descricao !== "") {
            toast.warning(intl.formatMessage({ id: "toast_invalidDescricao" }));
        } if (descricao === "") {
            toast.error(intl.formatMessage({ id: "toast_emptyDescricao" }));
        }
    }
    
    const ismarcaValid = (marca) => {
        const pattern = new RegExp("[A-Za-z]+");
        if (!pattern.test(marca) && marca !== "") {
            toast.warning(intl.formatMessage({ id: "toast_invalidMarca" }));
        } if (marca === "") {
            toast.error(intl.formatMessage({ id: "toast_emptyMarca" }));
        }
    }
    
    const isprecoValid = (preco) => {
        const pattern = new RegExp('^[0-9]*\.?[0-9]*$');
        if (!pattern.test(preco) && preco !== "") {
            toast.warning(intl.formatMessage({ id: "toast_invalidPreco" }));
        } if (preco === "") {
            toast.error(intl.formatMessage({ id: "toast_emptyPreco" }));
        }
    };

    const handleChangeverificationname = (e) => {
        const value = e.target.value;
        setNome(value);
        isNomeValid(value);
    };

    const handleChangeverificationdescricao = (e) => {
        const value = e.target.value;
        setDescricao(value);
        isdescricaoValid(value);
    };

    const handleChangeverificationmarca = (e) => {
        const value = e.target.value;
        setMarca(value);
        ismarcaValid(value);
    };

    const handleChangepreco = (e) => {
        const value = e.target.value;
        setPreco(value);
        isprecoValid(value);
    };

    

    const Cadastroproduto = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:8080/produto/cadastrarproduto", { nome, marca, descricao, preco, moda })
                .then((response) => {
                    console.log(response.data);
                    if(response.status===201){
                        <FormattedMessage id='messagem_cadastro_produto'></FormattedMessage>
                        toast.success("Produto cadastrado com sucesso")
                        setTimeout(() => {
                            window.location.href="/gerenciamentoprodutos"
                        }, 3500);
                    }
                   
                });
        } catch (error) {
            console.log(error);
            toast.error("Cadastro inválido")
        }
    };

    return (
        <>
            <div style={{ backgroundImage: `url(${imagemRoupas})` }}>
                <div className="Cadastro template d-flex justify-content-center align-items-center bg-white">
                    <div className="form_container p-3 rounded bg-white">
                        <center><h2><FormattedMessage id="CadastroProduto_title" /></h2></center>
                        <form onSubmit={Cadastroproduto}>
                            <label htmlFor='nome_produto'><FormattedMessage id="CadastroProduto_nomeLabel" /></label>
                            <Form.Control
                                type="text"
                                name='nome'
                                placeholder={intl.formatMessage({ id: 'CadastroProduto_nomePlaceholder' })}
                                id='nome_produto'
                                required
                                value={nome}
                                onChange={handleChangeverificationname}
                            />
                            <label htmlFor='marca'><FormattedMessage id="CadastroProduto_marcaLabel" /></label>
                            <Form.Control
                                type="text"
                                id="marca"
                                name='marca'
                                placeholder={intl.formatMessage({ id: 'CadastroProduto_marcaPlaceholder' })}
                                required
                                value={marca}
                                onChange={handleChangeverificationmarca}
                            />
                            <label htmlFor='preco'><FormattedMessage id="CadastroProduto_precoLabel" /></label>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    aria-label="Amount (to the nearest dollar)"
                                    name='preco'
                                    placeholder={intl.formatMessage({ id: 'CadastroProduto_precoPlaceholder' })}
                                    value={preco}
                                    onChange={handleChangepreco}
                                    required
                                />
                            </InputGroup>
                            <label htmlFor='moda'><FormattedMessage id="CadastroProduto_modaLabel" /></label>
                            <Form.Select value={moda} onChange={(e) => setModa(e.target.value)}>
                                <option value={"moda_masculina"}><FormattedMessage id="CadastroProduto_modaMasculina" /></option>
                                <option value={"moda_feminina"}><FormattedMessage id="CadastroProduto_modaFeminina" /></option>
                            </Form.Select>
            
                            <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><FormattedMessage id="CadastroProduto_descricaoLabel" /></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    required
                                    value={descricao}
                                    onChange={handleChangeverificationdescricao}
                                />
                            </Form.Group>
                            <div className='d-grid'>
                                <button type="submit" className='btn btn-primary'><FormattedMessage id="CadastroProduto_submitButton" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TelaCadastroProduto;
