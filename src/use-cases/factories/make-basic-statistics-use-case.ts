import { InMemoryGamesRepository } from '@/repositories/in-memory/in-memory-games-repository'
import { BasicStatisticsUseCase } from '../basic-statistics-use-case'

export function makeBasicStatisticsUseCase() {
  const gamesRepository = InMemoryGamesRepository.getInstance()
  const basicStatisticsLogUseCase = new BasicStatisticsUseCase(gamesRepository)

  return basicStatisticsLogUseCase
}
