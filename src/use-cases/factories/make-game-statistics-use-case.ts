import { InMemoryGamesRepository } from '@/repositories/in-memory/in-memory-games-repository'
import { GameStatisticsUseCase } from '../game-statistics-use-case'

export function makeGameStatisticsUseCase() {
  const gamesRepository = InMemoryGamesRepository.getInstance()
  const gameStatistics = new GameStatisticsUseCase(gamesRepository)

  return gameStatistics
}
