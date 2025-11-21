import teacherService from '../src/services/TeacherService'

describe('TeacherService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const baseTeacher = {
    fullName: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Math',
    teacherClass: 'ATT-50',
    gender: 'Female',
    age: '30',
    about: 'Experienced teacher',
    image: null,
  }

  it('creates a teacher', () => {
    const created = teacherService.createTeacher(baseTeacher)
    expect(created.id).toBe(1)
    expect(teacherService.getAllTeachers()).toHaveLength(1)
  })

  it('prevents duplicate teacher emails', () => {
    teacherService.createTeacher(baseTeacher)
    expect(() => teacherService.createTeacher(baseTeacher)).toThrow(
      'A teacher with this email already exists',
    )
  })

  it('updates a teacher', () => {
    const teacher = teacherService.createTeacher(baseTeacher)
    const updated = teacherService.updateTeacher(teacher.id, {
      ...baseTeacher,
      subject: 'Science',
    })
    expect(updated.subject).toBe('Science')
  })
})


