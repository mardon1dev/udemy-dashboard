import ValidationStrategy from './ValidationStrategy'

export class EmailValidator extends ValidationStrategy {
  validate(value: unknown): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return typeof value === 'string' && emailRegex.test(value)
  }

  getErrorMessage(): string {
    return 'Please enter a valid email address'
  }
}

export class RequiredValidator extends ValidationStrategy {
  validate(value: unknown): boolean {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    return true
  }

  getErrorMessage(): string {
    return 'This field is required'
  }
}

export class PhoneValidator extends ValidationStrategy {
  validate(value: unknown): boolean {
    if (typeof value !== 'string') return false
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10
  }

  getErrorMessage(): string {
    return 'Please enter a valid phone number'
  }
}

export class MinLengthValidator extends ValidationStrategy {
  constructor(private minLength: number) {
    super()
  }

  validate(value: unknown): boolean {
    if (value === null || value === undefined) return false
    return value.toString().length >= this.minLength
  }

  getErrorMessage(): string {
    return `This field must be at least ${this.minLength} characters`
  }
}

export class NumberValidator extends ValidationStrategy {
  validate(value: unknown): boolean {
    if (value === null || value === undefined) return false
    return !isNaN(Number(value))
  }

  getErrorMessage(): string {
    return 'Please enter a valid number'
  }
}


