import BaseRepository from './BaseRepository'
import { Student } from '../types/entities'
import { getProvider } from './providerRegistry'

class StudentRepository extends BaseRepository<Student> {
  constructor() {
    super(getProvider('students'))
  }

  searchByName(searchTerm: string): Student[] {
    return this.search((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
  }

  findByEmail(email: string): Student | null {
    return this.search((student) => student.email === email)[0] ?? null
  }

  findByStudentId(studentId: string): Student | null {
    return this.search((student) => student.studentId === studentId)[0] ?? null
  }
}

export default new StudentRepository()


