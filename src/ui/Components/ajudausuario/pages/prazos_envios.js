import React  from "react";
import { FormattedMessage } from "react-intl";
function prazos_envios(){
   return(
    <div>
        <br></br>
        <center> 
        <h3> <FormattedMessage id="delivery_times_title"  defaultMessage="Prazos e envios de entrega"></FormattedMessage>  </h3></center>
        <center><p><FormattedMessage id="delivery_times_content" defaultMessage="Todos os produtos serão enviados de acordo com a forma escolhida pelo cliente, em até 2 dias úteis da confirmação do pagamento. O prazo para a entrega varia de acordo com a forma de envio escolhida"></FormattedMessage> </p></center>
    </div> 
   )
   
}
export default prazos_envios;