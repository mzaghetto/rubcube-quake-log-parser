import { InMemoryGamesRepository } from '@/repositories/in-memory/in-memory-games-repository'
import { ParserLogUseCase } from '../parser-log-use-case'

export function makeParserLogUseCase() {
  const gamesRepository = InMemoryGamesRepository.getInstance()
  const parserLogUseCase = new ParserLogUseCase(gamesRepository)

  return parserLogUseCase
}
