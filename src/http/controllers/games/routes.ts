import { FastifyInstance } from 'fastify'
import { parserMiddleware } from '@/http/middlewares/parser-middleware'
import { parser } from './parser'

export async function gamesRoutes(app: FastifyInstance) {
  app.get('/parser', { onRequest: [parserMiddleware()] }, parser)
}
