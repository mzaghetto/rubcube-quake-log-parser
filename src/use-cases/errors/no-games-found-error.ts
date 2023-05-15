export class NoGamesFoundError extends Error {
  constructor() {
    super('No games found with player name provided.')
  }
}
