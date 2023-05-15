import { randomUUID } from 'crypto'
import {
  BasicStatistics,
  Games,
  GamesCreateInput,
  GamesRepository,
  GamesStatistics,
  PlayerStatistics,
} from '../games-repositories'

export class InMemoryGamesRepository implements GamesRepository {
  private items: Games[]

  private static INSTANCE: InMemoryGamesRepository

  private constructor() {
    this.items = []
  }

  public static getInstance(): InMemoryGamesRepository {
    if (!InMemoryGamesRepository.INSTANCE) {
      InMemoryGamesRepository.INSTANCE = new InMemoryGamesRepository()
    }

    return InMemoryGamesRepository.INSTANCE
  }

  async create(data: GamesCreateInput): Promise<Games> {
    const game = {
      id: data.id ?? randomUUID(),
      total_kills: data.total_kills,
      world_kills: data.world_kills,
      means_of_deaths: data.means_of_deaths,
      players: data.players,
      ranking: data.ranking,
    }

    this.items.push(game)

    return Promise.resolve(game)
  }

  async getAll(): Promise<BasicStatistics[]> {
    const games = this.items.map((item) => ({
      id: item.id,
      total_kills: item.total_kills,
      world_kills: item.world_kills,
      means_of_deaths: item.means_of_deaths,
    }))

    return Promise.resolve(games)
  }

  async getAllGameStatistics(): Promise<GamesStatistics[]> {
    const games = this.items

    const gamesStatistics = games.map((game) => {
      const sortedRanking = Object.entries(game.ranking)
      sortedRanking.sort((a, b) => b[1] - a[1])

      const ranking = Object.fromEntries(sortedRanking)

      const winner = Object.keys(ranking)[0]

      const gameReturn = {
        id: game.id,
        total_kills: game.total_kills,
        world_kills: game.world_kills,
        winner,
        means_of_deaths: game.means_of_deaths,
        players: game.players,
        ranking,
      }

      return gameReturn
    })

    return Promise.resolve(gamesStatistics)
  }

  async getByPlayerName(playerName: string): Promise<PlayerStatistics[]> {
    const games = this.items.filter((item) => item.players.includes(playerName))

    const playerStatistics = games.map((game) => {
      const sortedRanking = Object.entries(game.ranking)
      sortedRanking.sort((a, b) => b[1] - a[1])

      const ranking = Object.fromEntries(sortedRanking)

      const winner = Object.keys(ranking)[0]

      const positionPlayer =
        Object.keys(ranking).findIndex((player) => player === playerName) + 1

      const gameReturn = {
        id: game.id,
        players: game.players,
        winner,
        my_position: positionPlayer,
        ranking,
      }

      return gameReturn
    })

    return Promise.resolve(playerStatistics)
  }
}
