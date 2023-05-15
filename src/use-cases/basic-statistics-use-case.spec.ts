import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGamesRepository } from '../repositories/in-memory/in-memory-games-repository'
import { BasicStatisticsUseCase } from './basic-statistics-use-case'

let gamesRepository: InMemoryGamesRepository
let sut: BasicStatisticsUseCase

describe('Basic Statistics Use Case', () => {
  beforeEach(() => {
    gamesRepository = InMemoryGamesRepository.getInstance()
    sut = new BasicStatisticsUseCase(gamesRepository)
  })

  it('should be able to save games into database', async () => {
    gamesRepository.create({
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

    const { games } = await sut.execute()

    expect(games).toHaveLength(1)
    expect.objectContaining({ total_kills: 5 })
    expect.objectContaining({ world_kills: 1 })
    expect.objectContaining({
      means_of_deaths: { MOD_SHOTGUN: 3, MOD_ROCKET: 2 },
    })
  })
})
