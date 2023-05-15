import { UUID } from 'crypto'

export type GamesCreateInput = {
  id?: UUID
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

export type Games = {
  id: string
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

export type BasicStatistics = {
  id: string
  total_kills: number
  world_kills: number
  means_of_deaths: {
    [key: string]: number
  }
}

export interface GamesRepository {
  create(data: GamesCreateInput): Promise<Games>
  getAll(): Promise<BasicStatistics[]>
}
