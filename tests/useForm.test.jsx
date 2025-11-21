import { renderHook, act } from '@testing-library/react'
import { useForm } from '../src/hooks/useForm'

describe('useForm', () => {
  it('updates values on change and submits data', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() =>
      useForm(
        {
          name: '',
        },
        handleSubmit,
      ),
    )

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John' },
      })
    })

    expect(result.current.values.name).toBe('John')

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      })
    })

    expect(handleSubmit).toHaveBeenCalledWith({ name: 'John' })
  })

  it('captures validation errors thrown by submit handler', async () => {
    const error = { name: 'Name is required' }
    const handleSubmit = vi.fn().mockRejectedValue(new Error(JSON.stringify(error)))
    const { result } = renderHook(() =>
      useForm(
        {
          name: '',
        },
        handleSubmit,
      ),
    )

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      })
    })

    expect(result.current.errors).toEqual(error)
  })
})


