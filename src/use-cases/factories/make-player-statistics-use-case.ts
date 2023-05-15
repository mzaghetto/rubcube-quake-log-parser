import { InMemoryGamesRepository } from '@/repositories/in-memory/in-memory-games-repository'
import { PlayerStatisticsUseCase } from '../player-statistics.use-case'

export function makePlayerStatisticsUseCase() {
  const gamesRepository = InMemoryGamesRepository.getInstance()
  const playerStatistics = new PlayerStatisticsUseCase(gamesRepository)

  return playerStatistics
}
