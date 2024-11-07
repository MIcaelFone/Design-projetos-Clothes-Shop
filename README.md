# Padrões-projetos-Clothes-Shop
 
Este projeto é o frontend desenvolvido para o projeto de Experiência Criativa no 5º período. Ele utiliza React.js e tem como objetivo oferecer uma interface interativa e intuitiva para o usuário. Implementamos cinco padrões de projeto para melhorar a organização e manutenção do código: **Componentização** (ou Composição) ,**Facade** ,**Observer**,**Strategy** e **Factory**.

# Padrões de Projeto Utilizados

## 1.Componentizando os inputs


A **Componentização** ajuda a criar componentes isolados e reutilizáveis, simplificando a manutenção e permitindo a reutilização em outras partes do projeto. Utilizamos esse padrão para os campos de formulário, tornando-os componentes individuais e configuráveis.

##### Componente `InputField`

Criamos um componente chamado `InputField`, que é usado para representar campos de formulário como Nome, E-mail e Senha. Cada campo de formulário é transformado em uma instância de `InputField`, passando as propriedades adequadas.
Neste projeto, refatoramos a página Cadastro.js para melhorar a estrutura do código e evitar a repetição de elementos de entrada (inputs). Originalmente, os campos de formulário (como nome, e-mail e senha) estavam sendo definidos repetidamente no código, o que resultava em redundância e dificultava a manutenção.

![image](https://github.com/user-attachments/assets/d933dd5c-b998-415c-b83b-8f6caf49046f)
![image](https://github.com/user-attachments/assets/a7606026-dc24-4275-88e7-3fb970ed603e)

   Para resolver esse problema, decidimos componentizar os inputs, transformando cada campo de entrada em um componente reutilizável. Agora, o Cadastro.js importa e usa esses componentes ao invés de definir cada input diretamente, tornando o código mais modular e fácil de gerenciar.

##### Código do `InputField`

```javascript
// components/InputField.js

import React from "react";

const InputField = ({ label, value, onChange, placeholder, error, type = "text" }) => (
   <div className="mt-4">
      <label>{label}</label>
      <input
         type={type}
         value={value}
         placeholder={placeholder}
         className="form-control"
         onChange={onChange}
      />
      {error && <span className="text-danger">{error}</span>}
   </div>
);

export default InputField;

```
##### Aplicando o InputField no cadastro.js
No código acima, estamos utilizando o componente InputField para tornar os inputs do formulário mais organizados, reutilizáveis e fáceis de manter. Em vez de definir cada campo de input individualmente, como nome, e-mail, senha, confirmar senha, e telefone, transformamos cada um deles em uma instância do componente InputField, o que simplifica o código e evita a repetição.
```javascript
<InputField
            label={<FormattedMessage id="formLabels.name" defaultMessage="Nome" />}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            error={erroNome}
            id="nome"
         />

         <InputField
            label={<FormattedMessage id="formLabels.email" defaultMessage="Email" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@email.com"
            error={erroEmail}
            type="email"
            id="email"
         />

         <InputField
            label={<FormattedMessage id="formLabels.password" defaultMessage="Senha" />}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a sua senha"
            error={erroSenha}
            type="password"
            id="senha"
         />

         <InputField
            label={<FormattedMessage id="formLabels.confirmPassword" defaultMessage="Confirmar Senha" />}
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            placeholder="Confirme sua senha"
            error={erroConfirmaSenha}
            type="password"
            id="confirmaSenha"
         />

         <InputField
            label={<FormattedMessage id="formLabels.phone" defaultMessage="Telefone" />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digite seu telefone"
            id="phone"
         />
```
 ##### Benefícios da Componentização

- **Reutilização**: Os componentes de input podem ser usados em diferentes partes da aplicação.
- **Facilidade de Manutenção**: Alterações no estilo ou no comportamento dos inputs podem ser feitas diretamente nos componentes.
- **Código Mais Limpo e Organizado**: A página `Cadastro.js` ficou mais legível e enxuta, com menos duplicação de código e uma estrutura mais clara.
- **Escalabilidade e Sustentabilidade**: Esta abordagem de componentização ajuda a tornar o projeto mais escalável e sustentável no longo prazo.


 
 ## 2. Criação da Funções  para as chamadas de API Resquest(Facade)
 
 O **padrão Facade** é uma técnica de design que cria uma interface simplificada e unificada para gerenciar operações complexas em um sistema. Ao utilizar o Facade, escondemos a complexidade de interações internas e fornecemos uma interface de fácil uso para o consumidor final do código.

A função apiRequest centraliza as chamadas à API,Usar o padrão Facade para centralizar as chamadas à API em uma função apiRequest ajuda a simplificar o código e reduzir a duplicação de lógica para fazer requisições HTTP. Essa função pode tratar questões comuns, como cabeçalhos, URL base, e tratamento de erros.
![image](https://github.com/user-attachments/assets/4d2c1b00-e1d4-4b35-9828-653302e1a465)
 ![image](https://github.com/user-attachments/assets/c00351da-22f5-44f4-8af5-c37ac95b3957)
 
Melhorar modularidade e manutenção: quaisquer mudanças na configuração de chamadas podem ser feitas diretamente na apiRequest, sem necessidade de modificar cada função individualmente.
  Para resolver esses problemas, implementamos o padrão Facade na forma de uma função apiRequest. Esta função centraliza as chamadas de API, simplificando o código e eliminando duplicações ao fornecer uma interface unificada e consistente  todos os cabeçalhos, URL base e tratamento de erros são definidos em um único local. 

 ##### Implementação do Facade com `apiRequest`
 ```javascript

async function apiRequest(url, method, data = {}) {
    try {
        const response = await axios({
            url: `http://localhost:8080/cartao${url}`,
            method,
            data,
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("API Error:", error);
        toast.error("Erro na requisição. Tente novamente mais tarde.");
        throw error;
    }
}

export default apiRequest;

```
Com apiRequest implementado, simplificamos as funções de API no Editacartao.js ao substituir as chamadas diretas por chamadas à função Facade. Cada função específica se torna mais direta e legível:

 ```javascript
const buscandocartao = async () => {
        try {
            const data = await apiRequest('/buscarcartaonumerocartao', 'POST', { numerocartao: Numbercard });
            const responseData = data.data[0];
            setNome(responseData.nome);
            setNumbercard(responseData.numerocartao);
            setExpiry(responseData.expiry);
            setCvc(responseData.cvc);
        } catch (error) {
            console.error("Erro ao buscar o cartão:", error);
        }
    };

    const deletacartao = async () => {
        try {
            await apiRequest('/deletacartao', 'DELETE', { numerocartao: Numbercard });
            toast.success("Cartão deletado com sucesso");
            setTimeout(() => window.location.href = "/cadastrocartao", 4000);
        } catch (error) {
            toast.error("Erro ao deletar o cartão");
        }
    };

    const atualizacartao = async () => {
        try {
            await apiRequest('/atualizacartao', 'PUT', { nome, cvc, expiry });
            toast.success("Atualização do cartão bem-sucedida");
        } catch (error) {
            toast.error("Erro ao atualizar o cartão");
        }
    };
```

##### Benefícios da Implementação Facade

1. **Melhoria na Modularidade e Manutenção**:
   - Alterações na configuração de chamadas podem ser feitas diretamente na função `apiRequest`, sem a necessidade de modificar cada função individualmente.

2. **Redução de Duplicação e Complexidade**:
   - A lógica comum é centralizada, tornando as funções de API mais diretas e legíveis, ao reduzir redundâncias.

3. **Maior Manutenibilidade**:
   - Qualquer mudança nos requisitos de chamada, como URL base ou configuração de cabeçalhos, pode ser atualizada apenas na `apiRequest`.


## 3. Implementação do Padrão Observer para Notificações

 O  **padrão Observer** serve para resolver o problema de notificação de mudanças de estado em um sistema de maneira eficiente e desacoplada. Em outras palavras, ele permite que um objeto (sujeito) notifique automaticamente outros objetos dependentes (observadores) sobre mudanças de seu estado, sem que o sujeito precise saber ou se preocupar com os detalhes de quem está sendo notificado.
 
 O código do arquivo Cart.js possui notificações acopladas diretamente às funções que manipulam o carrinho, como `handleRemoveFromCart` e `clearCart`. Isso torna o código menos flexível e dificultando a manutenção. Para resolver problema criamos um arquivo observer.js com objetivo de implementar o observer.
 
##### Antes
As notificações `notifyRemovedFromCart` e `notifyCartCleared` eram chamadas diretamente nas funções que manipulavam os itens no carrinho:
![image](https://github.com/user-attachments/assets/66c996f0-1645-4bf2-bd1f-b2fe5af8cf2a)

##### Implementando o Observer
 ```javascript
// observer.js
const events = {};

export const subscribe = (event, callback) => {
    if (!events[event]) {
        events[event] = [];
    }
    events[event].push(callback);
};

export const unsubscribe = (event, callback) => {
    if (!events[event]) return;
    events[event] = events[event].filter(cb => cb !== callback);
};

export const notify = (event, data) => {
    if (!events[event]) return;
    events[event].forEach(callback => callback(data));
};

```
##### Implementando o observer no cart.js
```javascript
### Usando o observer.js no cart.js

import { subscribe, unsubscribe, notify } from '../../config/observer';
import { useEffect } from 'react';

export default function Cart({ showModal, toggle }) {
    const notifyEvent = (message) => toast.error(message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        style: { backgroundColor: '#000', color: '#fff' }
    });

    // useEffect para gerenciar a inscrição e cancelamento no Observer
    useEffect(() => {
        const onItemRemoved = (item) => notifyEvent(`${item.nome} removed from cart!`);
        const onCartCleared = () => notifyEvent('Cart cleared!');

        subscribe('itemRemoved', onItemRemoved);
        subscribe('cartCleared', onCartCleared);

        return () => {
            unsubscribe('itemRemoved', onItemRemoved);
            unsubscribe('cartCleared', onCartCleared);
        };
    }, []);

    const handleRemoveFromCart = (product) => {
        removeFromCart(product);
        notify('itemRemoved', product); // Notifica a remoção de um item do carrinho
    };

    const clearCartHandler = () => {
        clearCart();
        notify('cartCleared'); // Notifica que o carrinho foi esvaziado
    };
}
```

##### Benefícios da Implementação do padrão Observer

1. **Desacoplamento:**
-Separa a lógica de manipulação de dados das notificações.
2. **Reutilização de Código:**
-Permite o uso do mesmo mecanismo de notificação em diferentes componentes, sem duplicar o código.
3. **Notificações em Tempo Real:**
- Garante que a interface reaja instantaneamente as mudanças.

## 4.Aplicando o Padrão Strategy para Validação do modal de cartão 
  
  O padrão **Strategy** permite definir uma família de algoritmos ou comportamentos intercambiáveis, encapsulando cada um deles em classes separadas, para que possam ser utilizados de forma flexível e 
  independente.
  No código original do arquivo CartaoModal.js, a função validateInfo é responsável por verificar cada campo dos dados do cartão. Podemos aplicar o padrão Strategy aqui ao separar as validações específicas 
  de cada campo.
  ![image](https://github.com/user-attachments/assets/23ed43fb-fcac-4a1c-856e-16d636805837)
  No novo código, definimos um objeto validationStrategies para separar as validações de cada campo individualmente, tornando o processo de validação mais modular e fácil de atualizar.
  ##### Transformando em Strategy: 
  ```javascript
 const validationStrategies = {
  name: (value) => (!value ? { variant: 'danger', message: 'Nome é obrigatório' } : null),
  number: (value) => (!value ? { variant: 'danger', message: 'Número do cartão é obrigatório' } : null),
  expiry: (value) => (!value ? { variant: 'danger', message: 'Validade é obrigatória' } : null),
  cvc: (value) => (!value ? { variant: 'danger', message: 'Código de segurança é obrigatório' } : null),
};

const validateInfo = (data) => {
  const errors = {};
  Object.keys(data).forEach((key) => {
    const error = validationStrategies[key](data[key]);
    if (error) errors[key] = error;
  });
  return errors;
};
```
##### Utilizando o objeto validationStrategies na validações:
 ```javascript
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
```
##### Benificios do padrão Strategy
1. **Flexibilidade**:
-Permite adicionar, remover ou modificar comportamentos sem alterar a estrutura principal do código.
2.**Organização**:
-O código fica limpo e fácil de entender, com lógicas separadas.
3.**Estratégias**:
-Podem ser reutilizadas em diferentes contextos.
4.**Testabilidade**
-Facilita o teste unitário, pois cada comportamento pode ser testado de forma independente.

## 5. Adicionar uma Função Factory para Notificações

**Factory** é um padrão criacional fornecem uma interface para criar objetos em uma superclasse, mas permite as subclasses alterem o tipo de objetos que serão criados.

### Código atual da tela_produto_masculino.js
```javascript
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage } from 'react-intl';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../../Carrinhoprodutos/config/Cartprovider';
import { toast } from 'react-toastify';
import '../styles/tela_produtos.css';

function CardProductMasculino() {
    const [produtos, setProdutos] = useState([]);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const notifyAddedToCart = (item) => toast.success(
        <> {item.nome} <FormattedMessage id='adicao_produto' /> </>,
        {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            style: {
                backgroundColor: '#fff',
                color: '#000',
            }
        }
    );

    const notifyRemovedFromCart = (item) => toast.error(
        <>{item.nome} <FormattedMessage id='removendo_produto'></FormattedMessage> </>,
        {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            style: {
                backgroundColor: '#000',
                color: '#fff',
            }
        }
    );

    const detailproduct = (nome) => {
        window.location.href = `/roupa/${nome}`;
    };

    const handleAddToCart = (produto) => {
        addToCart(produto);
        notifyAddedToCart(produto);
    };

    const handleRemoveFromCart = (produto) => {
        removeFromCart(produto);
        notifyRemovedFromCart(produto);
    };

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/produto/produtosmasculino");
                if (response.status === 200) {
                    setProdutos(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProdutos();
    }, []);

    return (
        <div>
            <center>
                <h1><FormattedMessage id="produtosmasculino_title"></FormattedMessage></h1>
            </center>
            <div className="card-container">
                {produtos.map((produto) => (
                    <Card className="card-product" key={produto.idproduto}>
                        <Card.Body className="card-body">
                            <Card.Title className="card-title">{truncateText(produto.nome, 20)}</Card.Title>
                            <div className="card-text">
                                <h3 style={{ fontSize: '1.3rem' }}>
                                    <FormattedMessage id='money'></FormattedMessage> {produto.preco}
                                </h3>
                            </div>
                            <div className="button-container">
                                <Button className="button button-primary" onClick={() => { detailproduct(produto.nome); }}>
                                    <FormattedMessage id='about_produto'></FormattedMessage>
                                </Button>
                                {
                                    cartItems.find(item => item.nome === produto.nome) ? (
                                        <div className="quantity-container">
                                            <button
                                                className="button button-secondary"
                                                onClick={() => {
                                                    handleAddToCart(produto);
                                                }}
                                            >
                                                +
                                            </button>
                                            <p className='quantity-text'>
                                                {cartItems.find(item => item.nome === produto.nome)?.quantity}
                                            </p>
                                            <button
                                                className="button button-secondary"
                                                onClick={() => {
                                                    const cartItem = cartItems.find((item) => item.nome === produto.nome);
                                                    if (cartItem.quantity === 1) {
                                                        handleRemoveFromCart(produto);
                                                    } else {
                                                        removeFromCart(produto);
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ) : (
                                        <FaShoppingCart
                                            size={35}
                                            style={{ marginLeft: '10px', color: 'black', cursor: 'pointer' }}
                                            onClick={() => {
                                                handleAddToCart(produto);
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default CardProductMasculino;
```

Para modularizar e otimizar o código do componente tela_produto_masculino.js, podemos implementar uma função Factory chamada createToastNotification em um novo arquivo notificationFactory.js

##### Implementando a função factory
```javascript
// notificationFactory.js

import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

export const createToastNotification = (type, item) => {
    const options = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    };

    if (type === 'add') {
        toast.success(
            <> {item.nome} <FormattedMessage id='adicao_produto' /> </>,
            { 
                ...options, 
                style: { backgroundColor: '#fff', color: '#000' } 
            }
        );
    } else if (type === 'remove') {
        toast.error(
            <> {item.nome} <FormattedMessage id='removendo_produto' /> </>,
            { 
                ...options, 
                style: { backgroundColor: '#000', color: '#fff' } 
            }
        );
    }
};
```
No arquivo tela_produto_masculino.js, substituimos as notificações manuais por chamadas à createToastNotification: 

```javascript
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage } from 'react-intl';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../../Carrinhoprodutos/config/Cartprovider';
import { createToastNotification } from './notificationFactory'; // Importa a Factory
import '../styles/tela_produtos.css';

function CardProductMasculino() {
    const [produtos, setProdutos] = useState([]);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const detailproduct = (nome) => {
        window.location.href = `/roupa/${nome}`;
    };

    const handleAddToCart = (produto) => {
        addToCart(produto);
        createToastNotification('add', produto); // Usando a Factory para notificação de adição
    };

    const handleRemoveFromCart = (produto) => {
        removeFromCart(produto);
        createToastNotification('remove', produto); // Usando a Factory para notificação de remoção
    };

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/produto/produtosmasculino");
                if (response.status === 200) {
                    setProdutos(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProdutos();
    }, []);

    return (
        <div>
            <center>
                <h1><FormattedMessage id="produtosmasculino_title"></FormattedMessage></h1>
            </center>
            <div className="card-container">
                {produtos.map((produto) => (
                    <Card className="card-product" key={produto.idproduto}>
                        <Card.Body className="card-body">
                            <Card.Title className="card-title">{truncateText(produto.nome, 20)}</Card.Title>
                            <div className="card-text">
                                <h3 style={{ fontSize: '1.3rem' }}>
                                    <FormattedMessage id='money'></FormattedMessage> {produto.preco}
                                </h3>
                            </div>
                            <div className="button-container">
                                <Button className="button button-primary" onClick={() => { detailproduct(produto.nome); }}>
                                    <FormattedMessage id='about_produto'></FormattedMessage>
                                </Button>
                                {
                                    cartItems.find(item => item.nome === produto.nome) ? (
                                        <div className="quantity-container">
                                            <button
                                                className="button button-secondary"
                                                onClick={() => {
                                                    handleAddToCart(produto);
                                                }}
                                            >
                                                +
                                            </button>
                                            <p className='quantity-text'>
                                                {cartItems.find(item => item.nome === produto.nome)?.quantity}
                                            </p>
                                            <button
                                                className="button button-secondary"
                                                onClick={() => {
                                                    const cartItem = cartItems.find((item) => item.nome === produto.nome);
                                                    if (cartItem.quantity === 1) {
                                                        handleRemoveFromCart(produto);
                                                    } else {
                                                        removeFromCart(produto);
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ) : (
                                        <FaShoppingCart
                                            size={35}
                                            style={{ marginLeft: '10px', color: 'black', cursor: 'pointer' }}
                                            onClick={() => {
                                                handleAddToCart(produto);
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default CardProductMasculino;
```
##### Benificios do padrão Factory
1. **Encapsulamento da Lógica de Criação**
A criação dos objetos fica isolada na fábrica, simplificando o código principal.
2. **Facilidade de Manutenção**
Alterações são feitas apenas na fábrica, facilitando a manutenção em sistemas grandes.
3. **Reutilização de Código**
Evita duplicação de código ao centralizar a criação de objetos semelhantes.
