import { InMemoryGamesRepository } from '@/repositories/in-memory/in-memory-games-repository'
import { GamesStatisticsUseCase } from '../games-statistics-use-case'

export function makeGamesStatisticsUseCase() {
  const gamesRepository = InMemoryGamesRepository.getInstance()
  const gamesStatistics = new GamesStatisticsUseCase(gamesRepository)

  return gamesStatistics
}
