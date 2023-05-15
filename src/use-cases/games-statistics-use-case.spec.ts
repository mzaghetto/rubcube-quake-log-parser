import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGamesRepository } from '../repositories/in-memory/in-memory-games-repository'
import { GamesStatisticsUseCase } from './games-statistics-use-case'

let gamesRepository: InMemoryGamesRepository
let sut: GamesStatisticsUseCase

describe('Player Statistics Use Case', () => {
  beforeEach(() => {
    gamesRepository = InMemoryGamesRepository.getInstance()
    sut = new GamesStatisticsUseCase(gamesRepository)

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

    gamesRepository.create({
      total_kills: 5,
      world_kills: 1,
      means_of_deaths: {
        MOD_SHOTGUN: 3,
        MOD_ROCKET: 2,
      },
      players: ['Player 2', 'Player 4'],
      ranking: {
        'Player 2': 5,
        'Player 4': 8,
      },
    })

    gamesRepository.create({
      total_kills: 5,
      world_kills: 1,
      means_of_deaths: {
        MOD_SHOTGUN: 3,
        MOD_ROCKET: 2,
      },
      players: ['Player 1', 'Player 2', 'Player 3', 'Player 5'],
      ranking: {
        'Player 1': 2,
        'Player 2': -3,
        'Player 3': 1,
        'Player 5': 10,
      },
    })
  })

  it('should be able to get games statics', async () => {
    const { games } = await sut.execute()

    expect(games).toHaveLength(3)
  })

  it('should be able to order the games by ranking', async () => {
    const { games } = await sut.execute()

    expect(games[1].ranking).toStrictEqual({
      'Player 4': 8,
      'Player 2': 5,
    })
  })
})
