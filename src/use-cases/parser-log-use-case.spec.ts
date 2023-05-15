import { expect, describe, it, beforeEach } from 'vitest'
import { ParserLogUseCase } from './parser-log-use-case'
import { InMemoryGamesRepository } from '../repositories/in-memory/in-memory-games-repository'

let gamesRepository: InMemoryGamesRepository
let sut: ParserLogUseCase

interface GamesParser {
  total_kills: number
  world_kills: number
  means_of_deaths: {
    [key: string]: number
  }
  players: string[]
  ranking: {
    [key: string]: number
  }
}

describe('Parser Log Use Case', () => {
  beforeEach(() => {
    gamesRepository = InMemoryGamesRepository.getInstance()
    sut = new ParserLogUseCase(gamesRepository)
  })

  it('should be able to get parse data and save games into database', async () => {
    const games: GamesParser[] = [
      {
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
      },
      {
        total_kills: 0,
        world_kills: 0,
        means_of_deaths: {},
        players: ['Player 1', 'Player 2'],
        ranking: {
          'Player 1': 0,
          'Player 2': 0,
        },
      },
    ]

    const { parser } = await sut.execute({ games })

    expect(parser).toEqual('logs registered')
  })
})
