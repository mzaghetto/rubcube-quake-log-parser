import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGamesRepository } from '../repositories/in-memory/in-memory-games-repository'
import { PlayerStatisticsUseCase } from './player-statistics.use-case'
import { NoGamesFoundError } from './errors/no-games-found-error'

let gamesRepository: InMemoryGamesRepository
let sut: PlayerStatisticsUseCase

describe('Player Statistics Use Case', () => {
  beforeEach(() => {
    gamesRepository = InMemoryGamesRepository.getInstance()
    sut = new PlayerStatisticsUseCase(gamesRepository)

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
      players: ['Player 2', 'Player 3', 'Player 4'],
      ranking: {
        'Player 2': 5,
        'Player 3': 1,
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
      players: ['Player 1', 'Player 2', 'Player 3'],
      ranking: {
        'Player 1': 2,
        'Player 2': -3,
        'Player 3': 1,
      },
    })
  })

  it('should be able to get statics by player name', async () => {
    const { games } = await sut.execute('Player 1')

    expect(games).toHaveLength(2)
    expect(games[0].winner).toBe('Player 1')
  })

  it('should be able to order the games by ranking', async () => {
    const { games } = await sut.execute('Player 4')

    expect(games[0].ranking).toStrictEqual({
      'Player 4': 8,
      'Player 2': 5,
      'Player 3': 1,
    })
  })

  it('should be able to has negative ranking', async () => {
    const { games } = await sut.execute('Player 2')

    expect(games[2].ranking['Player 2']).toBe(-3)
  })

  it('should get message error if player not existe', async () => {
    expect(() => sut.execute('Player 7')).rejects.toBeInstanceOf(
      NoGamesFoundError,
    )
  })
})
