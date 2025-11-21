import { renderHook, act } from '@testing-library/react'
import { useEntity } from '../src/hooks/useEntity'

const createMockService = () => {
  let items = [{ id: 1, name: 'Item 1' }]
  return {
    getAll: vi.fn(() => items),
    create: vi.fn((item) => {
      const newItem = { ...item, id: items.length + 1 }
      items = [...items, newItem]
      return newItem
    }),
    update: vi.fn((id, item) => {
      const updated = { ...item, id: Number(id) }
      items = items.map((i) => (i.id === updated.id ? updated : i))
      return updated
    }),
    delete: vi.fn((id) => {
      items = items.filter((i) => i.id !== Number(id))
    }),
  }
}

describe('useEntity', () => {
  it('loads initial items and creates new item', async () => {
    const service = createMockService()
    const { result } = renderHook(() => useEntity(service, 'Item'))

    expect(result.current.items).toHaveLength(1)

    await act(async () => {
      await result.current.createItem({ name: 'Item 2' })
    })

    expect(result.current.items).toHaveLength(2)
    expect(service.create).toHaveBeenCalled()
  })

  it('updates and deletes items', async () => {
    const service = createMockService()
    const { result } = renderHook(() => useEntity(service, 'Item'))

    await act(async () => {
      await result.current.updateItem(1, { name: 'Updated Item' })
    })

    expect(result.current.items[0].name).toBe('Updated Item')

    await act(async () => {
      await result.current.deleteItem(1)
    })

    expect(result.current.items).toHaveLength(0)
  })
})


