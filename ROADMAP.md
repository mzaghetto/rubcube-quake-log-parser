## Historia 1
Eu como administrador do jogo, quero ter a estatística por jogo, do total de mortes, de mortes por causa e de mortes causadas pelo `<world>` para entender dificuldade dos jogadores.

#### Requisitos funcionais
  - [x] Deve ser possível pegar as estatísticas dos jogos
  - [x] Deve registrar o número total de mortes ocorridas em cada jogo
  - [x] Deve categorizar as mortes por causa (MOD_UNKNOWN, MOD_SHOTGUN, MOD_GAUNTLET, MOD_MACHINEGUN, etc)

#### Regras de negócio
  - [x] Somente administradores terão acesso as estatísticas
  - [x] As estatísticas serão classificadas por jogos
  - [x] Poderá ser pego todas as estatísticas de todos os jogos

## História 2
Eu como player, quero ver o ranking de cada partida para saber o vencedor e meu desempenho.

Critérios de aceite:
Os jogadores começam com zero pontos
A cada kill o jogador ganha um ponto
A cada morte pelo mundo o jogador perde um ponto
É permitido pontuação negativa
O <world> não deve entrar no ranking de jogadores
Os jogadores podem mudar de nome no meio da partida, mas só o último nome deve ser considerado no ranking

#### Requisitos funcionais
  - [x] Deve ser possível visualizar o ranking da partida

#### Regras de negócio
  - [x] Cada jogador terá a sua visibilidade
  - [x] Os ranking serão classificadas por jogos
  - [x] Deve ser apresentado o nome mais recente do jogador na lista dos rankings
  - [x] Deve ser permitido pontuação negativa
  - [x] World não deve ser apresentado no ranking

## História 3
Eu como administrador do jogo, quero poder consultar as estatísticas de um jogo específicou ou de todos os jogos de maneira estruturada por uma API para montar uma visualização para os jogadores

#### Requisitos funcionais
  - [x] Deve ser possível pegar as estatísticas dos jogos

#### Regras de negócio
  - [x] Somente o administrador deve ter acesso
  - [x] Pode ser pego as estatisticas de todas as partidas
  - [x] Pode ser pego as estatisticas por ID da partida
  - [x] World não deve ser apresentado no ranking

## Regras gerais
Abaixo as regras gerais independente da história

#### Regras de negócio (gerais)
  - [x] As estatísticas dos jogos virão de um arquivo .log
  - [x] Cada partida/game é iniciada com InitGame
  - [x] Cada partida/game é finalizada com a leitura de uma linha antes do próximo InitGame

#### Regras não funcionais
  - [x] Rodar via docker
  - [x] Rodar localmente

## Com mais tempo, mais responsabilidades *Tio ben da programação
Neste momento foi pensado em implementar as regras para atender ao básico da aplicação e também mostrar um pouco do conhecimento que possuo com código / arquitetura.

Claro que pode ser melhorado a aplicação pra atender de diversas outras maneiras, mas pelo tempo este é o resultado.

Abaixo algumas coisas que poderia ser implementado com mais tempo

#### Implementações futuras (com mais tempo de implementação)
  - [ ] Rota para registro de usuários
  - [ ] Rota para trocar o tipo de usuário (administrador ou player)
  - [ ] Rota de autenticação (JWT)
  - [ ] Checar se o log enviado já foi alguma vez enviado ao servidor (envio duplicado)
  - [ ] Os dados da aplicação precisam estar persistidos em um banco [MongoDB, PostgreSQL, etc];
  - [ ] Adicionar swagger para documentação de rotas
  - [ ] Testes E2E
  - [ ] Docker compose (pra subir o banco + aplicação em conjunto)