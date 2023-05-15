import * as fs from 'fs'
import { Game } from './game'
import Player from './player'

export interface GameData {
  total_kills: number
  world_kills: number
  ranking: { [key: string]: number }
  players: string[]
  means_of_deaths: { [key: string]: number }
}

export class Parser {
  games: Map<number, Game>
  currentGame: number

  constructor() {
    this.games = new Map()
    this.currentGame = 0
  }

  addGame(game: Game): this {
    this.currentGame++
    this.games.set(this.currentGame, game)
    return this
  }

  toObject(): { [key: string]: GameData } {
    const ret: { [key: string]: GameData } = {}
    this.games.forEach((item, idx) => {
      ret[`game_${idx + 1}`] = {
        total_kills: item.total_kills,
        world_kills: item.deathsByWorld(),
        ranking: item.playersKills(),
        players: item.playersNames(),
        means_of_deaths: item.meansOfDeaths(),
      }
    })
    return ret
  }

  readFile(logFile: string): void {
    const lines: string[] = fs.readFileSync(logFile).toString().split('\n')
    this.parseLines(lines)
  }

  parseLines(lines: string[]): void {
    let command = ''
    const lastLine = lines.length
    for (let i = 0; i < lastLine; i++) {
      command = lines[i].match(/^.{0,7}([a-z A-Z][^:]*)/)?.[1] || ''
      if (command) {
        this.checkCommand(command, lines[i], i)
      } else {
        console.log(`Could not find command on line ${i}`)
      }
    }
  }

  checkCommand(command: string, line: string, idx: number): void {
    switch (command) {
      case 'InitGame':
        Game.new(this, line)
        break
      case 'ClientConnect':
        Player.new(this, line)
        break
      case 'ClientUserinfoChanged':
        Player.update(this, line)
        break
      case 'Kill':
        Player.kill(this, line)
        break
      default:
        // console.log(`[INFO] Command ${command} ignored (line: ${idx})`)
        break
    }
  }

  getCurrentGame(): Game {
    return this.games.get(this.currentGame) ?? new Game()
  }
}

export default Parser
