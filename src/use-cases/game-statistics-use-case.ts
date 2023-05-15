import { GamesRepository } from '@/repositories/games-repositories'
import { NoGameFoundError } from './errors/no-game-found-error'

interface GameStatisticsUseCaseResponse {
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

export class GameStatisticsUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(gameId: string): Promise<GameStatisticsUseCaseResponse> {
    const game = await this.gamesRepository.getGameStatisticsById(gameId)

    if (!game) {
      throw new NoGameFoundError()
    }

    return game
  }
}
