import { beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('react-hot-toast', () => {
  const toast = {
    success: vi.fn(),
    error: vi.fn(),
  }
  return {
    default: toast,
    __esModule: true,
    success: toast.success,
    error: toast.error,
  }
})

beforeEach(() => {
  localStorage.clear()
})


