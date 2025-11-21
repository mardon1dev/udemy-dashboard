import {
  EmailValidator,
  RequiredValidator,
  PhoneValidator,
  MinLengthValidator,
  NumberValidator,
} from './validators'

type Rule =
  | 'email'
  | 'required'
  | 'phone'
  | 'number'
  | { type: 'minLength'; value: number }

type ValidationSchema<T> = {
  [K in keyof T]?: Rule[]
}

class ValidationService {
  private validators = {
    email: new EmailValidator(),
    required: new RequiredValidator(),
    phone: new PhoneValidator(),
    number: new NumberValidator(),
  }

  validateField(value: unknown, rules: Rule[] = []) {
    const errors: string[] = []

    for (const rule of rules) {
      let validator

      if (typeof rule === 'string') {
        validator = this.validators[rule]
      } else if (rule.type === 'minLength') {
        validator = new MinLengthValidator(rule.value)
      }

      if (validator && !validator.validate(value)) {
        errors.push(validator.getErrorMessage())
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  validateForm<T extends Record<string, unknown>>(formData: T, schema: ValidationSchema<T>) {
    const errors: Record<string, string> = {}
    let isValid = true

    for (const [field, rules] of Object.entries(schema)) {
      const validation = this.validateField(formData[field as keyof T], rules)
      if (!validation.isValid) {
        errors[field] = validation.errors[0]
        isValid = false
      }
    }

    return {
      isValid,
      errors,
    }
  }
}

export default new ValidationService()


