# Design-projetos-Clothes-Shop
 
Este projeto é o frontend desenvolvido para o projeto de Experiência Criativa no 5º período. Ele utiliza React.js e tem como objetivo oferecer uma interface interativa e intuitiva para o usuário. Implementamos dois padrões de projeto para melhorar a organização e manutenção do código: **Componentização** (ou Composição) e **Facade** para as chamadas de API.

## Padrões de Projeto Utilizados
### 1.Componentizando os inputs
####  Componentização (ou Composição) 

A **Componentização** ajuda a criar componentes isolados e reutilizáveis, simplificando a manutenção e permitindo a reutilização em outras partes do projeto. Utilizamos esse padrão para os campos de formulário, tornando-os componentes individuais e configuráveis.

#### Componente `InputField`

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


 
 ## 2. Criação da Funções  para as chamadas de API Resquest(FACADE)
 
 O **padrão Facade** é uma técnica de design que cria uma interface simplificada e unificada para gerenciar operações complexas em um sistema. Ao utilizar o Facade, escondemos a complexidade de interações internas e fornecemos uma interface de fácil uso para o consumidor final do código.

A função apiRequest centraliza as chamadas à API,Usar o padrão Facade para centralizar as chamadas à API em uma função apiRequest ajuda a simplificar o código e reduzir a duplicação de lógica para fazer requisições HTTP. Essa função pode tratar questões comuns, como cabeçalhos, URL base, e tratamento de erros.
![image](https://github.com/user-attachments/assets/4d2c1b00-e1d4-4b35-9828-653302e1a465)
 ![image](https://github.com/user-attachments/assets/c00351da-22f5-44f4-8af5-c37ac95b3957)
 
Melhorar modularidade e manutenção: quaisquer mudanças na configuração de chamadas podem ser feitas diretamente na apiRequest, sem necessidade de modificar cada função individualmente.
  Para resolver esses problemas, implementamos o padrão Facade na forma de uma função apiRequest. Esta função centraliza as chamadas de API, simplificando o código e eliminando duplicações ao fornecer uma interface unificada e consistente  todos os cabeçalhos, URL base e tratamento de erros são definidos em um único local. 

 ### Implementação do Facade com `apiRequest`
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
### Benefícios da Implementação Facade

1. **Melhoria na Modularidade e Manutenção**:
   - Alterações na configuração de chamadas podem ser feitas diretamente na função `apiRequest`, sem a necessidade de modificar cada função individualmente.

2. **Redução de Duplicação e Complexidade**:
   - A lógica comum é centralizada, tornando as funções de API mais diretas e legíveis, ao reduzir redundâncias.

3. **Maior Manutenibilidade**:
   - Qualquer mudança nos requisitos de chamada, como URL base ou configuração de cabeçalhos, pode ser atualizada apenas na `apiRequest`.


