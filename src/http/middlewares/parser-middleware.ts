import Parser from '@/lib/parser'
import path from 'path'
import { FastifyReply, FastifyRequest } from 'fastify'

export function parserMiddleware() {
  const parser = new Parser()
  const filePath = path.join(__dirname, '..', '..', '..', 'data', 'games.log')

  parser.readFile(filePath)

  const games = parser.toObject()

  return async (request: FastifyRequest, reply: FastifyReply) => {
    request.body = { games: Object.values(games) }
  }
}
