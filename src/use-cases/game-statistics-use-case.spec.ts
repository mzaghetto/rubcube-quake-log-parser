import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGamesRepository } from '../repositories/in-memory/in-memory-games-repository'
import { GameStatisticsUseCase } from './game-statistics-use-case'
import { NoGameFoundError } from './errors/no-game-found-error'

let gamesRepository: InMemoryGamesRepository
let sut: GameStatisticsUseCase

describe('Player Statistics Use Case', () => {
  beforeEach(() => {
    gamesRepository = InMemoryGamesRepository.getInstance()
    sut = new GameStatisticsUseCase(gamesRepository)

    gamesRepository.create({
      id: 'a706b6bb-f7dc-4129-9d22-bd8407504199',
      total_kills: 5,
      world_kills: 1,
      means_of_deaths: {
        MOD_SHOTGUN: 3,
        MOD_ROCKET: 2,
      },
      players: ['Player 1', 'Player 2', 'Player 3'],
      ranking: {
        'Player 1': 5,
        'Player 2': 3,
        'Player 3': 1,
      },
    })
  })

  it('should be able to get games statics', async () => {
    const games = await sut.execute('a706b6bb-f7dc-4129-9d22-bd8407504199')

    expect(games.id).toBe('a706b6bb-f7dc-4129-9d22-bd8407504199')
  })

  it('should not be able to get game statics with invalid id', async () => {
    await expect(() => sut.execute('id-inválido')).rejects.toBeInstanceOf(
      NoGameFoundError,
    )
  })
})
