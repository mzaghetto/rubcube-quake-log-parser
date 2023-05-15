import { FastifyReply, FastifyRequest } from 'fastify'
import { makeBasicStatisticsUseCase } from '@/use-cases/factories/make-basic-statistics-use-case'

export async function basicStatistics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const basicStatisticsLogUseCase = makeBasicStatisticsUseCase()

  const games = await basicStatisticsLogUseCase.execute()

  return reply.status(200).send(games)
}
