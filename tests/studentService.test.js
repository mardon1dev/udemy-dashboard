import studentService from '../src/services/StudentService'

describe('StudentService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  const baseStudent = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    studentId: '1001',
  }

  it('creates a student with validation', () => {
    const created = studentService.createStudent(baseStudent)
    expect(created.id).toBe(1)
    expect(studentService.getAllStudents()).toHaveLength(1)
  })

  it('prevents duplicate email', () => {
    studentService.createStudent(baseStudent)
    expect(() =>
      studentService.createStudent({ ...baseStudent, studentId: '1002' }),
    ).toThrow('A student with this email already exists')
  })

  it('searches students by name', () => {
    studentService.createStudent(baseStudent)
    studentService.createStudent({
      ...baseStudent,
      email: 'jane@example.com',
      studentId: '1002',
      firstName: 'Jane',
    })
    const results = studentService.searchStudents('Jane')
    expect(results).toHaveLength(1)
    expect(results[0].firstName).toBe('Jane')
  })
})


