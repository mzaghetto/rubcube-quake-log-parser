import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function adminOnly(request: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new InMemoryUsersRepository()
  const username = request.headers.user as string

  if (!username) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const foundUser = await usersRepository.findByName(username)

  if (!foundUser) {
    return reply.status(404).send({ message: 'User not found' })
  }

  if (foundUser.role !== 'administrator') {
    return reply
      .status(403)
      .send({ message: 'Only administrators can access this route' })
  }
}
