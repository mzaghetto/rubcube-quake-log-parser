import { FastifyInstance } from 'fastify'
import { parserMiddleware } from '@/http/middlewares/parser-middleware'
import { parser } from './parser'
import { adminOnly } from '@/http/middlewares/admin-validation'
import { basicStatistics } from './basic-statistics'
import { playerStatistics } from './player-statistics'
import { gamesStatistics } from './games-statistics'
import { gameStatistics } from './game-statistics'

export async function gamesRoutes(app: FastifyInstance) {
  app.get('/parser', { onRequest: [parserMiddleware()] }, parser)

  // historia 1
  app.get('/basic-stats', { onRequest: [adminOnly] }, basicStatistics)

  // historia 2
  app.post('/player-statistics', playerStatistics)

  // historia 3
  app.get('/games-statistics', { onRequest: [adminOnly] }, gamesStatistics)
  app.get(
    '/games-statistics/:gameId',
    { onRequest: [adminOnly] },
    gameStatistics,
  )
}
