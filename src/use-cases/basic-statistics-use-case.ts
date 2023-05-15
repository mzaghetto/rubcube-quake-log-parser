import { GamesRepository } from '@/repositories/games-repositories'

interface GamesParser {
  total_kills: number
  world_kills: number
  means_of_deaths: {
    [key: string]: number
  }
}

interface BasicStatisticsUseCaseResponse {
  games: GamesParser[]
}

export class BasicStatisticsUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(): Promise<BasicStatisticsUseCaseResponse> {
    const games = await this.gamesRepository.getAll()

    return {
      games,
    }
  }
}
