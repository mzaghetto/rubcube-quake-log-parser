export type User = {
  user: string
  role: string
}

export interface UsersRepository {
  findByName(username: string): Promise<User | null>
}
