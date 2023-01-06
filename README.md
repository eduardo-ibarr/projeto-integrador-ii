## Stacks utilizadas:

- Node.js
- React.js
- Express.js
- MongoDB (mongoose)
- MUI
- Moment.js
- Axios
- UUID
- CORS

No front, foram utilizados componentes funcionais em React, além de hooks e contexto para o consumo de API local ou em nuvem. 
A estilização foi feita através do MUI - Material UI, uma biblioteca de componentes estilizados para diversos casos de uso.
As validações foram completamente baseadas em expressões regulares (REGEX).

No back, a API foi toda desenvolvida em Node.js, utlizando Express.js e o banco de dados não-relacional MongoDB, além de controle de acesso à API através de CORS. Modelada através de controllers, services, routes e models, ela se apresenta em um bom nível organizacional.

## Funcionalidades até o momento:

- Criar, ler, editar e deletar clientes e serviços
- Criar atendimentos através de clientes e serviços cadastrados
- Tabelas com paginação personalizada
- Filtros de clientes e serviços
- Exibição de atendimentos por data selecionada
- Ocultação de dados sensíveis dos clientes, como CPF, RG e Contato
- Exibição de data e hora de criação e última alteração de clientes e serviços
- Validações por expressões regulares em todos os inputs
- Exibição de apenas clientes, serviços e atendimentos ativos

### Validações

- Nome
        
        - Min. 2 máx. 100 caracteres.
        - Bloqueio para +3 caracteres iguais.
        - Bloqueio para +2 espaços.
        - Bloqueio para -2 palavras.

- Número de celular

        - Máx. 13 caracteres.
        - DDD e 9 obrigatórios.
        - Separadores opcionais (espaço e -).
        - Bloqueio para +5 números iguais.
        - Bloqueio para sequências crescentes e decrescentes.

- CPF

        - Validação através de algoritmo adaptado do sistema da Receita Federal do Brasil.


- RG

        - Máx. 11 caracteres.
        - Separadores opcionais (espaço, . e -).
        - Bloqueio para +5 números iguais.
        - Bloqueio para sequências crescentes e decrescentes.

- Endereço

        - Min. 2 máx. 180 caracteres.
        - Bloqueio para +3 caracteres iguais.
        - Bloqueio para +2 espaços.
        - Bloqueio para -2 palavras.



#### Gentileza atualizar este arquivo a cada adição de nova funcionalidade.
