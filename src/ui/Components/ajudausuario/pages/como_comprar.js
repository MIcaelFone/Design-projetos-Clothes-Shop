import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function ComoComprar() {

          
    return (
      
            <div>
                <br />
                <center>
                    <h3>
                        <FormattedMessage id="title" defaultMessage="Como Comprar na Clothes Shop" />
                    </h3>
                </center>
                <ol>
                    <li>
                        <FormattedMessage id="step1" defaultMessage="Basta navegar pelas páginas de compra e clicar no ícone Comprar. Ou clique em Ver Detalhes para mais informações sobre o produto. Depois disso, o produto será adicionado ao seu carrinho de compras." />
                    </li>
                    <li>
                        <FormattedMessage id="step2" defaultMessage="Continue navegando em nosso site até escolher todos os produtos que deseja comprar. Agora, basta clicar no link Checkout à direita para concluir sua compra." />
                    </li>
                    <li>
                        <FormattedMessage id="step3" defaultMessage="Agora, insira seu email e senha. Se você não estiver registrado, registre-se rapidamente clicando no link Registrar." />
                    </li>
                    <li>
                        <FormattedMessage id="step4" defaultMessage="Feito isso, escolha o método de envio. Trabalhamos com envio via Correio." />
                    </li>
                    <li>
                        <FormattedMessage id="step5" defaultMessage="Agora, basta escolher o método de pagamento." />
                    </li>
                </ol>
            </div>
      
    );

}

export default ComoComprar;
