# Projeto em python para cadastros de cartão de crédito

## Motivação
Para o back, o projeto foi desenvolvido em python, e utilizei o Django Rest Framework para as APIs. Para a persistência dos dados, utilizei o MySQL. E, para testar as requisições, utilizei o pytest. Além disso, para fazer a criptografia do número do cartão de crédito, foi utilizado a lib cryptography. Para a verificação do número do cartão de crédito e para descobrir a bandeira do cartão de crédito informado, foi utilizando a lib [creditcard](https://github.com/MaisTodos/python-creditcard).

Para o front, o projeto foi desenvolvido em angular - [Angular CLI](https://github.com/angular/angular-cli) versão 11.0.5, e [bulma](https://bulma.io) como framework css.

As escolhas de frameworks, libs e etc. para o projeto foram tomadas com base no meu conhecimento prévio e nas pesquisas realizadas ao longo do desenvolvimento.

## Para execução - back
### Rodar Projeto 

1. Instalar dependências presente no arquivo requirements.txt
2. Aplicar as migrações
```bash
$ python manage.py migrate
```
3. Rodar a aplicação para realizar as chamadas de api (certifique-se de que estará rodando na porta 8000 para testar o front)
```bash
$ python manage.py runserver
```
4. Realizar as chamadas de api, as quais podem ser feitas pelo front ou de acordo com os exemplos fornecidos na seção ["Documentação APIs"](https://github.com/cacalsonari/apiPythonCreditCard/blob/main/README.md#documentação-apis)

### Rodar Testes

1. Entrar na pasta app/tests
```bash
$ cd app/tests
```
2. Executar os testes presente no arquivo tests.py
```bash
$ python -m pytest tests.py

# or
$ coverage run -m pytest tests.py
$ coverage report -m
```

## Para execução - front
1. Entrar na pasta front
```bash
$ cd front
```
2. Instalar dependências 
```bash
$ npm install
```
3. Instalar angular client 11 caso ainda não tenha - tutorial para ubuntu [aqui](https://tecadmin.net/install-angular-on-ubuntu/)

4. Executar o projeto
```bash
$ ng serve
```
5. Usuário para logar no sistema
      Usuário: admin
      Senha: 123456

## Documentação APIs

### Api para autenticação e conceder acesso as outras apis
#### Método: POST
#### URL: http://127.0.0.1:8000/api/v1/token-auth
#### Parâmetros
      username: string
      password: string
#### Exemplo requisição POST como administrador: 
      {
          "username": "admin",
          "password": 123456
      }
#### Exemplo requisição POST como administrador utilizando [HTTPie](https://httpie.io): 
    http post http://127.0.0.1:8000/api/v1/token-auth username=admin password=123456

#### Retorno da api
    {
          "token": string
    }

### Api para cadastro e listagem de cartão de crédito
#### Métodos: POST e GET
#### URL: http://127.0.0.1:8000/api/v1/credit-card
#### Parâmetros
     exp_date: string,
     holder: string,
     number: string,
     cvv: string
   
#### Exemplo requisição POST: 
      {
          "exp_date": "02/26",
          "holder": "Fulano",
          "number": "4539578763621486",
          "cvv": 123,
      }
      
#### Exemplo requisição POST utilizando [HTTPie](https://httpie.io): 
    http post http://127.0.0.1:8000/api/v1/credit-card 'Authorization: Token f1abc72c59dc232f61057ce68f37d2093c7ab171' exp_date="02/26" holder="Fulano" number="4539578763621486" cvv=123
    
#### Exemplo requisição GET utilizando [HTTPie](https://httpie.io):
      //para listagem de todos os cartões cadastrados
      http http://127.0.0.1:8000/api/v1/credit-card 'Authorization: Token f1abc72c59dc232f61057ce68f37d2093c7ab171'
      
      //para listagem do cartão cujo id é 1
      http http://127.0.0.1:8000/api/v1/credit-card?id=1 'Authorization: Token f1abc72c59dc232f61057ce68f37d2093c7ab171'
      
#### Retorno da api após requisição GET
    [
        {
            "brand": "visa",
            "cvv": "123",
            "exp_date": "2026-02-28",
            "holder": "Teste",
            "id": 1,
            "number": "************1486"
        },
        {
            "brand": "visa",
            "cvv": "",
            "exp_date": "2026-02-28",
            "holder": "Teste2",
            "id": 2,
            "number": "************1486"
        }
    ]
