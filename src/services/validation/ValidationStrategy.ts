export default abstract class ValidationStrategy {
  abstract validate(value: unknown): boolean
  abstract getErrorMessage(): string
}


