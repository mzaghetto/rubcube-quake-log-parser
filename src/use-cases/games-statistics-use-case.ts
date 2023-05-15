import { GamesRepository } from '@/repositories/games-repositories'

interface GamesStatistics {
  id: string
  total_kills: number
  world_kills: number
  winner: string
  means_of_deaths: {
    [key: string]: number
  }
  players: string[]
  ranking: {
    [key: string]: number
  }
}

interface GamesStatisticsUseCaseResponse {
  games: GamesStatistics[]
}

export class GamesStatisticsUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(): Promise<GamesStatisticsUseCaseResponse> {
    const games = await this.gamesRepository.getAllGameStatistics()

    return {
      games,
    }
  }
}
