import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Editacartao() {
    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [id, setId] = useState('');
    const intl = useIntl();  

    useEffect(() => {
        const url = decodeURIComponent(window.location.href);
        const tamanho = url.split("/");
        const nome = tamanho[tamanho.length - 1];
        setNome(nome);
    }, []);

    const buscandoproduto = async () => {
        try {
            const response = await axios.post("http://localhost:8080/produto/buscandoprodutoespecifico", { nome });
            if (response.status === 200) {
                const responseData = response.data.data[0];
                setMarca(responseData.marca);
                setDescricao(responseData.descricao);
                setPreco(responseData.preco);
                setId(responseData.idproduto);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (nome) {
            buscandoproduto();
        }
    }, [nome]);

    const deletaproduto = async () => {
        try {
            const deleta = await axios.delete("http://localhost:8080/produto/deletandoproduto", { data: { idproduto:id } });
            if (deleta.status === 200) {
                toast.success("Produto deletado com sucesso");
                setTimeout(() => {
                    window.location.href = "/gerenciamentoprodutos";
                }, 4000);
            }
        } catch (error) {
            toast.error("Erro para deletar produto");
        }
    };

    const atualizaproduto = async () => {
        try {
            const atualizacao = await axios.put("http://localhost:8080/produto/atualizandoproduto", {
                nome,
                marca,
                descricao,
                preco,
                idproduto: id
            });
            if (atualizacao.status === 200) {
                toast.success(intl.formatMessage({ id: "Edita_roupa_sucesso"}));
            }
        } catch (error) {
            toast.error("Erro para atualizar");
        }
    };

    return (
        <> 
            <div className='Perfil template d-flex justify-content-center vh-97 bg-white' style={{ marginTop: "3rem" }}>
                <div className='form_container p-50 rounded bg-white'>    
                    <form>
                        <h1 className='text-center'><FormattedMessage id="Edita_roupa" /></h1>
                        <div className='mb-2'>
                            <label htmlFor='nome'><FormattedMessage id="formLabels_name" /></label>
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
                            <label htmlFor='marca'><FormattedMessage id="marca" /></label>
                            <input
                                type='text'
                                placeholder="Nike"
                                className='form-control'
                                id="marca"
                                required
                                onChange={(e) => setMarca(e.target.value)}
                                value={marca}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='descricao'>Descrição</label>
                            <input
                                type='text'
                                placeholder="Produto é bom e legal"
                                className='form-control'
                                id="descricao"
                                required
                                onChange={(e) => setDescricao(e.target.value)}
                                value={descricao}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='preco'>Preço</label>
                            <input
                                type='text'
                                placeholder='123,50'
                                className='form-control'
                                id="preco"
                                required
                                onChange={(e) => setPreco(e.target.value)}
                                value={preco}
                            />
                        </div>
                        <div className='d-flex mt-3' style={{ gap: "1rem" }}>
                            <Button variant="primary" onClick={atualizaproduto}> <FormattedMessage id="Atualiza_roupa" /></Button>
                            <Button variant="danger" onClick={deletaproduto}><FormattedMessage id="profile_delete" /></Button>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Editacartao;
