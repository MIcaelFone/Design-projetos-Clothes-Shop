import React from "react";
import { FormattedMessage } from "react-intl";
function Info_pagamento(){
    return(
       
        <div>
            <br></br>
            <center> <h3>
                <FormattedMessage id="payment_methods_title" defaultMessage="Métodos de Pagamento"></FormattedMessage>
                 </h3> </center>
            <center>
                <p> <FormattedMessage id="payment_methods_description" defaultMessage="Trabalhamos com diversos métodos de pagamento. Após concluir sua compra, você pode escolher o que melhor lhe convier."></FormattedMessage>
                </p>
            </center>    
            
            <ul>
                <li><img src="https://images.tcdn.com.br/assets/store/img/icons/formas_pagamento/pag_peqcartaovisa.png?6af724b98f224680c58c3a461abc2b6c" alt="img1"></img></li>
                <li><img src="https://images.tcdn.com.br/assets/store/img/icons/formas_pagamento/pag_peqcartaomastercard.png?6af724b98f224680c58c3a461abc2b6c" alt="img2"></img></li>      
                <li><img src="https://images.tcdn.com.br/assets/store/img/icons/formas_pagamento/pag_peqcartaoamex.png?6af724b98f224680c58c3a461abc2b6c" alt="img3"></img></li>
                <li><img src="https://images.tcdn.com.br/assets/store/img/icons/formas_pagamento/pag_peqcartaoelo.png?6af724b98f224680c58c3a461abc2b6c" alt="img4"></img></li>  
                <li><img src="https://images.tcdn.com.br/assets/store/img/icons/formas_pagamento/pag_peqboletoonline.png?6af724b98f224680c58c3a461abc2b6c" alt="img5"></img></li>       
            </ul>

        </div> 
      
    
    )

}
export default Info_pagamento;