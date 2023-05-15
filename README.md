## Rubcube - Quake Log Parser
O Objetivo desse repositório é desenvolver uma aplicação que atenda as histórias criadas pela equipe da [@Rubcube](https://www.rubcube.com/)

Você pode ver as histórias e regras criadas a partir das histórias no [roadmap](./ROADMAP.md)

## Tech Stack
- [Typescript](https://www.typescriptlang.org/)
- [tsup](https://github.com/egoist/tsup) (para transpilar de Typescript para JavaScript)
- [Node.js](https://nodejs.org/en)
- [Fastify](https://www.fastify.io/) (Framework utilizado nesta aplicação)
- [Zod](https://github.com/colinhacks/zod) (Validador de schema)
- [Vite](https://vitejs.dev/) (Utilizado para os testes)
- [Husky](https://www.npmjs.com/package/husky) (Restes pre-commit, só permite o commit se estiver com os testes em dia)
- [SuperTest](https://github.com/ladjs/supertest) (Seria utilizado para teste e2e)
- [Github Actions](https://github.com/features/actions) (Para que rode a esteira de testes sempre que sobe uma PR / Push)

## Como rodar a aplicação
Rodando localmente
```
npm run start:dev
```

Rodando pelo docker
```
npm run build:docker
npm run start:docker
```

## Documentação de boa utilização da aplicação
Como esta aplicação pode ser melhorada, segue algumas orientações para que você a utilize sem problemas

O parse do arquivo `games.log` é gerado a partir do momento que é utilizada a rota `/parser`. 

Desta forma, para que você consiga todos os dados nas outras rotas sem problemas, primeiro rode a rota `/parser`

#### cURL rota /parser
```shell
curl --location --request GET 'http://localhost:5001/parser'
```

Depois disso, você tem as seguintes alternativas:

### Rota para história 1
Para ter sucesso na rota, você pode utilizar o cURL abaixo:

#### cURL rota /basic-stats com admin
```shell
curl --location --request GET 'http://localhost:5001/basic-stats' \
--header 'user: admin'
```

Caso queira testar a história e tentar pegar as informações da rota como usuario (irá retornar erro 403):
#### cURL rota /basic-stats com user
```shell
curl --location --request GET 'http://localhost:5001/basic-stats' \
--header 'user: user' \
--header 'Content-Type: application/json' \
```

### Rota para história 2
Para ter sucesso na rota, você pode utilizar o cURL abaixo:
#### cURL rota /basic-stats com admin
```shell
curl --location --request POST 'http://localhost:5001/player-statistics' \
--header 'Content-Type: application/json' \
--data-raw '{
    "playerName": "Mal"
}'
```

### Rota para história 3
Existem 2 rotas, a primeira rota vai pegar todas as partidas e a segunda uma partida específica pelo ID.

Para utilizar a segunda rota, é interessante rodar a rota com todas partidas e pegar o ID da rota em específico que deseja visualizar
#### cURL rota com todas partidas /games-statistics com admin
```shell
curl --location --request GET 'http://localhost:5001/games-statistics' \
--header 'user: admin'
```

#### cURL rota com ID de partida específica /games-statistics/{gameID} com admin
```shell
curl --location --request GET 'http://localhost:5001/games-statistics/8e5afa7d-f050-4f3f-92f0-afd2bd615e62' \
--header 'user: admin'
```

## Testes
Essa aplicação possui alguns comandos de teste. Abaixo a lista dos comandos:

#### teste de unidade
```
npm test
```

#### teste de coverage
```
npm run test:coverage
```

#### testes em modo watch (cada momento que é alterado um arquivo, o teste é refeito)
```
npm run test:watch
```

#### testes com UI (para ver os testes por uma UI do vitest)
```
npm run test:ui
```

## CI
Foi adicionado nesta aplicaçao o github actions para que os testes sejam gerados ao realizar um push ou abrir uma PR

[Veja em ação](https://github.com/mzaghetto/rubcube-quake-log-parser/actions)