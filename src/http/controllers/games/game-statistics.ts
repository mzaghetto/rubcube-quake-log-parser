import { FastifyReply, FastifyRequest } from 'fastify'
import { NoGameFoundError } from '@/use-cases/errors/no-game-found-error'
import { makeGameStatisticsUseCase } from '@/use-cases/factories/make-game-statistics-use-case'

export async function gameStatistics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { gameId } = request.params as { gameId: string }

  try {
    const gameStatistics = makeGameStatisticsUseCase()

    const game = await gameStatistics.execute(gameId)

    return reply.status(200).send(game)
  } catch (error) {
    if (error instanceof NoGameFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
