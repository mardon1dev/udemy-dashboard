import studentRepository from '../repositories/StudentRepository'
import validationService from './validation/ValidationService'
import { Student } from '../types/entities'

class StudentService {
  private getValidationSchema() {
    return {
      firstName: ['required', { type: 'minLength', value: 2 }],
      lastName: ['required', { type: 'minLength', value: 2 }],
      email: ['required', 'email'],
      phone: ['required', 'phone'],
      studentId: ['required', 'number'],
    }
  }

  getAllStudents(): Student[] {
    return studentRepository.getAll()
  }

  getStudentById(id: number | string): Student | undefined {
    return studentRepository.getById(id)
  }

  createStudent(data: Student): Student {
    const validation = validationService.validateForm(data, this.getValidationSchema())
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors))
    }

    const existingEmail = studentRepository.findByEmail(data.email)
    if (existingEmail) {
      throw new Error('A student with this email already exists')
    }

    const existingStudentId = studentRepository.findByStudentId(data.studentId)
    if (existingStudentId) {
      throw new Error('A student with this student ID already exists')
    }

    return studentRepository.create(data)
  }

  updateStudent(id: number | string, data: Student): Student {
    const validation = validationService.validateForm(data, this.getValidationSchema())
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors))
    }

    const existingEmail = studentRepository.findByEmail(data.email)
    if (existingEmail && existingEmail.id !== Number(id)) {
      throw new Error('A student with this email already exists')
    }

    return studentRepository.update(id, data)
  }

  deleteStudent(id: number | string): boolean {
    return studentRepository.delete(id)
  }

  searchStudents(searchTerm: string): Student[] {
    if (!searchTerm.trim()) {
      return this.getAllStudents()
    }
    return studentRepository.searchByName(searchTerm)
  }
}

export default new StudentService()


