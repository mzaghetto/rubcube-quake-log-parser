import z from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makePlayerStatisticsUseCase } from '@/use-cases/factories/make-player-statistics-use-case'
import { NoGamesFoundError } from '@/use-cases/errors/no-games-found-error'

export async function playerStatistics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const playerStatisticsBodySchema = z.object({
    playerName: z.string(),
  })

  const { playerName } = playerStatisticsBodySchema.parse(request.body)

  try {
    const playerStatistics = makePlayerStatisticsUseCase()

    const games = await playerStatistics.execute(playerName)

    return reply.status(200).send(games)
  } catch (error) {
    if (error instanceof NoGamesFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
