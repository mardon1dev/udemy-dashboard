import BaseRepository from './BaseRepository'
import { UserCredentials } from '../types/entities'
import { getProvider } from './providerRegistry'

class UserRepository extends BaseRepository<UserCredentials> {
  constructor() {
    super(getProvider('user'))
  }

  getCurrentUser(): UserCredentials | null {
    const users = this.getAll()
    return users.length ? users[0] : null
  }

  createOrUpdate(user: UserCredentials): UserCredentials {
    const existing = this.getAll()
    if (existing.length) {
      return this.update(existing[0].id ?? 1, { ...existing[0], ...user })
    }
    return this.create(user)
  }

  verifyCredentials(login: string, password: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false
    return user.login === login && user.password === password
  }
}

export default new UserRepository()


