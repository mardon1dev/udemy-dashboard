import { useState } from 'react'

type Errors<T> = Partial<Record<keyof T | 'general', string>>

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<unknown> | unknown,
) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const setValue = (name: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const setErrorsObj = (errorsObj: Errors<T>) => {
    setErrors(errorsObj)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await onSubmit(values)
    } catch (error) {
      if (error instanceof Error) {
        try {
          const parsed = JSON.parse(error.message)
          setErrors(parsed)
        } catch {
          setErrors({ general: error.message })
        }
      } else {
        setErrors({ general: 'An unexpected error occurred' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    setValue,
    setError: (name: keyof T, error: string) =>
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      })),
    setErrors: setErrorsObj,
    reset,
    handleSubmit,
  }
}


