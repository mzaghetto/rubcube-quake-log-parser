import { Parser } from './parser'
const WORLD_ID = 1022

interface PlayerData {
  id: string
  username: string
  kills: number
  deathsByWorld: number
}

class Player {
  id: string
  username: string
  kills: number
  deathsByWorld: number
  meansOfDeath: { [key: string]: number }

  constructor(line = '') {
    const playerData = Player.getPlayerData(line)
    this.id = playerData.id
    this.username = playerData.username
    this.kills = playerData.kills
    this.deathsByWorld = playerData.deathsByWorld
    this.meansOfDeath = {}
  }

  static getPlayerData(line: string): PlayerData {
    const regex = /Client(Connect|UserinfoChanged): ([0-9]*)/
    const playerId = line.match(regex)?.[2] ?? '0'
    return {
      id: playerId,
      username: '',
      kills: 0,
      deathsByWorld: 0,
    }
  }

  static new(parser: Parser, line: string): void {
    const currentGame = parser.getCurrentGame()
    currentGame.newPlayer(new Player(line))
  }

  static update(parser: Parser, line: string): void {
    const currentGame = parser.getCurrentGame()
    const player = currentGame.getPlayerById(Player.getPlayerData(line).id)

    if (player) {
      player.update(line)
    } else {
      console.log(`[WARNING] Could not find player by ID (line: ${line})`)
    }
  }

  static kill(parser: Parser, line: string): void {
    const currentGame = parser.getCurrentGame()
    const regex = /Kill: ([0-9]+) ([0-9]+) ([0-9]+):/
    const players = line.match(regex) // players[1] => Killer user ID, players[2] => Loser user ID, players[3] => means of death

    if (players) {
      currentGame.addKill()
      if (players[1] === WORLD_ID.toString()) {
        const loser = currentGame.players.get(players[2])
        if (loser) {
          loser.deathsByWorld++
          if (loser.meansOfDeath[players[3]]) {
            loser.meansOfDeath[players[3]]++
          } else {
            loser.meansOfDeath[players[3]] = 1
          }
        }
      } else {
        const killer = currentGame.players.get(players[1])
        if (killer) {
          killer.addKill()
          if (killer.meansOfDeath[players[3]]) {
            killer.meansOfDeath[players[3]]++
          } else {
            killer.meansOfDeath[players[3]] = 1
          }
        }
      }
    } else {
      console.log(
        `[WARNING] Could not find players to count kills (line: ${line})`,
      )
    }
  }

  calcScore(): number {
    const score = this.kills - this.deathsByWorld
    return score
  }

  addKill(): void {
    this.kills++
  }

  removeKill(): void {
    const killsToBeRemoved = this.kills > 0 ? 1 : 0
    this.kills -= killsToBeRemoved
  }

  update(line: string): void {
    this.username =
      line.match(
        /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/,
      )?.[1] ?? ''
  }
}

export default Player
