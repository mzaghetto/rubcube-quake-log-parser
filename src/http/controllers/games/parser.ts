import z from 'zod'
import { makeParserLogUseCase } from '@/use-cases/factories/make-parser-log-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function parser(request: FastifyRequest, reply: FastifyReply) {
  const logParserBodySchema = z.object({
    games: z.array(
      z.object({
        total_kills: z.number(),
        world_kills: z.number(),
        means_of_deaths: z.record(z.number()),
        players: z.array(z.string()),
        ranking: z.record(z.number()),
      }),
    ),
  })

  const { games: gamesData } = logParserBodySchema.parse(request.body)

  const parserLogUseCase = makeParserLogUseCase()

  await parserLogUseCase.execute({
    games: gamesData,
  })

  return reply.status(200).send({ message: 'logs registered' })
}
