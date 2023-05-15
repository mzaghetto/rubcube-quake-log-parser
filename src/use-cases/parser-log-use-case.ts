import {
  GamesCreateInput,
  GamesRepository,
} from '@/repositories/games-repositories'

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

interface ParserLogUseCaseRequest {
  games: GamesParser[]
}

interface ParserLogUseCaseResponse {
  parser: string
}

export class ParserLogUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    games,
  }: ParserLogUseCaseRequest): Promise<ParserLogUseCaseResponse> {
    for (const game of games) {
      const gameData: GamesCreateInput = {
        total_kills: game.total_kills,
        world_kills: game.world_kills,
        means_of_deaths: game.means_of_deaths,
        players: game.players,
        ranking: game.ranking,
      }
      await this.gamesRepository.create(gameData)
    }

    return {
      parser: 'logs registered',
    }
  }
}
