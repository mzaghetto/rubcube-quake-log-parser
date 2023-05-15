import { User, UsersRepository } from '../users-repositories'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [
    {
      user: 'admin',
      role: 'administrator',
    },
    {
      user: 'user',
      role: 'player',
    },
  ]

  async findByName(username: string): Promise<User | null> {
    const user = this.items.find((item) => item.user === username)

    if (!user) {
      return Promise.resolve(null)
    }

    return Promise.resolve(user)
  }
}
