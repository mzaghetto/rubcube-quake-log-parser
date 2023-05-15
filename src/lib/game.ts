import { Parser } from './parser'
import Player from './player'
import * as enums from '../../enums'

export class Game {
  players: Map<string, Player>
  total_kills: number

  constructor(line: string = '') {
    this.players = new Map()
    this.total_kills = 0
  }

  static new(parser: Parser, line: string): void {
    parser.addGame(new Game(line))
  }

  addKill(): void {
    this.total_kills++
  }

  getPlayerById(id: string): Player | null {
    if (this.players.has(id)) {
      return this.players.get(id)!
    }
    return null
  }

  newPlayer(player: Player): void {
    this.players.set(player.id, player)
  }

  playersNames(): string[] {
    const result: string[] = []
    this.players.forEach((player) => {
      result.push(player.username)
    })
    return result
  }

  playersKills(): { [key: string]: number } {
    let result: { [key: string]: number } = {}
    this.players.forEach((player) => {
      result[player.username] = player.calcScore()
    })
    result = Object.entries(result)
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1]
        } else {
          return a[0].localeCompare(b[0])
        }
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    return result
  }

  meansOfDeaths(): { [key: string]: number } {
    const result: { [key: string]: number } = {}
    this.players.forEach((player) => {
      Object.keys(player.meansOfDeath).forEach((key) => {
        const meansOfDeathName =
          enums.MEANS_OF_DEATH[key] || `Unknown means of death (${key})`
        if (result[meansOfDeathName]) {
          result[meansOfDeathName] += player.meansOfDeath[key]
        } else {
          result[meansOfDeathName] = player.meansOfDeath[key]
        }
      })
    })
    return result
  }

  deathsByWorld(): number {
    let result = 0
    this.players.forEach((player) => {
      result += player.deathsByWorld
    })
    return result
  }
}
