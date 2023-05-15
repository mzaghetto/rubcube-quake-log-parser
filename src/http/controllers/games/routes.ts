import { FastifyInstance } from 'fastify'
import { parserMiddleware } from '@/http/middlewares/parser-middleware'
import { parser } from './parser'
import { adminOnly } from '@/http/middlewares/admin-validation'
import { basicStatistics } from './basic-statistics'

export async function gamesRoutes(app: FastifyInstance) {
  app.get('/parser', { onRequest: [parserMiddleware()] }, parser)

  // historia 1
  app.get('/basic-stats', { onRequest: [adminOnly] }, basicStatistics)
}
