import { randomUUID } from 'crypto'
import {
  BasicStatistics,
  Games,
  GamesCreateInput,
  GamesRepository,
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
}
