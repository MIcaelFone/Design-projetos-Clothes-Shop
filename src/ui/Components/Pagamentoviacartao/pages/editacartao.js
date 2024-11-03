import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Editacartao(){
    const [nome,setNome]=useState('')
    const [numero,setNumerocartao]=useState('')
    const [cvc,setCvc]=useState('')
    const [expiry,setExpiry]=useState('')
    const [Numbercard,setNumbercard]=useState('')
    const intl = useIntl();  
   
    useEffect(() => {
        const url = decodeURIComponent(window.location.href);
        const tamanho = url.split("/");
        const cardnumber = tamanho[tamanho.length - 1];
        setNumbercard(cardnumber)
    },[])
       
 
    const buscandocartao= async()=>{
        try {
            await axios.post("http://localhost:8080/cartao/buscarcartaonumerocartao",{numerocartao:Numbercard})
            .then((response)=>{
                if(response.status===200){
                    const responseData=response.data.data[0]
                    setNome(responseData.nome)
                    setNumbercard(responseData.numerocartao)
                    setExpiry(responseData.expiry)
                    setCvc(responseData.cvc)
                }    
                 
            })
        
        }catch (error) {
            console.error(error)
        }
    }
    const deletacartao= async()=>{
        try {
           const deleta= await axios.delete("http://localhost:8080/cartao/deletacartao",{ data: { numerocartao:Numbercard }})
           if(deleta.status===200){
                toast.success("Produto deletado com sucesso")
                setTimeout(()=>{
                   window.location.href="/cadastrocartao"
                },4000)
           }
        } catch (error) {
            toast.error("Erro para deletar produto")
        }
    }
    const atualizacartao= async()=>{
        try {
            const atualizacao=await axios.put("http://localhost:8080/cartao/atualizacartao",{nome:nome,cvc,expiry:expiry})
            if(atualizacao.status===200){
                toast.success("Atualização do cartão bem sucedida")
            }
        } catch (error) {
            toast.error("Erro para atualizar")
        }
    }
    useEffect(()=>{
      buscandocartao()
    },[Numbercard])

   
    
    return (
        <> 
            <div className='Perfil template d-flex justify-content-center vh-97 bg-white' style={{marginTop:"3rem"}}>
                <div className='form_container p-50 rounded bg-white'>    
                    <form>
                        <h1 className='text-center'><FormattedMessage id="edit_card" /></h1>
                        <div className='mb-2'>
                            <label htmlFor='text'><FormattedMessage id="formLabels_name" /></label>
                            <input type='text' placeholder={intl.formatMessage({ id: 'formLabels_enterYourName' })} className='form-control' id="nome"required onChange={(e)=>setNome(e.target.value)} value={nome}></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='text'><FormattedMessage id="numero_cartao" /></label>
                            <input type='text' placeholder="xxxx-xxxx-xxxx-xxxx" className='form-control' id="numerocartao" required onChange={(e)=>setNumbercard(e.target.value)} value={Numbercard}></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='cvc'>CVC</label>
                            <input type='number' placeholder="xxx" className='form-control' id="cvc" required onChange={(e)=>setCvc(e.target.value)} value={cvc}></input>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='numero'><FormattedMessage id="expiry_date"/></label>
                            <input type='text' placeholder='xx/xx' className='form-control' id="numero" required onChange={(e)=>setExpiry(e.target.value)} value={expiry}></input>
                        </div>
                        <div className='d-flex mt-3' style={{gap:"1rem"}}>
                            <Button variant="primary" onClick={()=>atualizacartao()}> <FormattedMessage id="update_card"/></Button>
                            <Button variant="danger" onClick={()=>deletacartao()}><FormattedMessage id="profile_delete"/></Button>
                        </div>
                        <br></br>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Editacartao;
