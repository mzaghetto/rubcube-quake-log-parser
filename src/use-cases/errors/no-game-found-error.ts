export class NoGameFoundError extends Error {
  constructor() {
    super('No game found with id provided.')
  }
}
