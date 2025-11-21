import userRepository from '../repositories/UserRepository'
import { UserCredentials } from '../types/entities'

class AuthService {
  register(userData: UserCredentials): UserCredentials {
    if (!userData.login || !userData.password) {
      throw new Error('Login and password are required')
    }

    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    return userRepository.createOrUpdate(userData)
  }

  login(login: string, password: string) {
    if (!login || !password) {
      throw new Error('Login and password are required')
    }

    const isValid = userRepository.verifyCredentials(login, password)
    if (!isValid) {
      throw new Error('Invalid login credentials')
    }

    localStorage.setItem('token', JSON.stringify({ login, password }))
    return { login, password }
  }

  logout() {
    localStorage.removeItem('token')
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  getCurrentUser(): UserCredentials | null {
    return userRepository.getCurrentUser()
  }
}

export default new AuthService()


