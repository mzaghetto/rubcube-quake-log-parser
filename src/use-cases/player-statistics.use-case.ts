import { GamesRepository } from '@/repositories/games-repositories'
import { NoGamesFoundError } from './errors/no-games-found-error'

interface GamesParser {
  players: string[]
  winner: string
  my_position: number
  ranking: {
    [key: string]: number
  }
}

interface PlayerStatisticsUseCaseResponse {
  games: GamesParser[]
}

export class PlayerStatisticsUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(playerName: string): Promise<PlayerStatisticsUseCaseResponse> {
    const games = await this.gamesRepository.getByPlayerName(playerName)

    if (games.length === 0) {
      throw new NoGamesFoundError()
    }

    return {
      games,
    }
  }
}
