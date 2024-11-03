import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import palavrasingles from './lang/en.json';
import palavrasportugues from './lang/pt.json';
import { CartProvider } from './ui/Components/Carrinhoprodutos/config/Cartprovider';

// Definindo a linguagem do usuário e o dicionário de palavras traduzidas
let userLanguage = navigator.language || 'pt-BR';
let dicionario_palavras_traduzido;

if (userLanguage === 'pt-BR') {
  dicionario_palavras_traduzido = palavrasportugues;
} else {
  userLanguage = 'en-US';
  dicionario_palavras_traduzido = palavrasingles;
}

// Renderizando a aplicação React
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <IntlProvider locale={userLanguage} messages={dicionario_palavras_traduzido}>
        <App />
      </IntlProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
