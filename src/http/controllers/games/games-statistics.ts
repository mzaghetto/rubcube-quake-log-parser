import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGamesStatisticsUseCase } from '@/use-cases/factories/make-games-statistics-use-case'

export async function gamesStatistics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const gamesStatistics = makeGamesStatisticsUseCase()

  const games = await gamesStatistics.execute()

  return reply.status(200).send(games)
}
