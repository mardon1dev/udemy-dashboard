import teacherRepository from '../repositories/TeacherRepository'
import validationService from './validation/ValidationService'
import { Teacher } from '../types/entities'

class TeacherService {
  private getValidationSchema() {
    return {
      fullName: ['required', { type: 'minLength', value: 3 }],
      email: ['required', 'email'],
      subject: ['required'],
      teacherClass: ['required'],
      gender: ['required'],
    }
  }

  getAllTeachers(): Teacher[] {
    return teacherRepository.getAll()
  }

  getTeacherById(id: number | string): Teacher | undefined {
    return teacherRepository.getById(id)
  }

  createTeacher(data: Teacher): Teacher {
    const validation = validationService.validateForm(data, this.getValidationSchema())
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors))
    }

    const existingEmail = teacherRepository.findByEmail(data.email)
    if (existingEmail) {
      throw new Error('A teacher with this email already exists')
    }

    return teacherRepository.create(data)
  }

  updateTeacher(id: number | string, data: Teacher): Teacher {
    const validation = validationService.validateForm(data, this.getValidationSchema())
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors))
    }

    const existingEmail = teacherRepository.findByEmail(data.email)
    if (existingEmail && existingEmail.id !== Number(id)) {
      throw new Error('A teacher with this email already exists')
    }

    return teacherRepository.update(id, data)
  }

  deleteTeacher(id: number | string): boolean {
    return teacherRepository.delete(id)
  }

  searchTeachers(searchTerm: string): Teacher[] {
    if (!searchTerm.trim()) {
      return this.getAllTeachers()
    }
    return teacherRepository.searchByName(searchTerm)
  }
}

export default new TeacherService()


