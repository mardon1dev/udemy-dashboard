import { DataProvider } from '../data/providers/DataProvider'

export default class BaseRepository<T extends { id?: number }> {
  constructor(private provider: DataProvider<T>) {}

  protected getNextId(items: T[]): number {
    if (!items.length) return 1
    const ids = items
      .map((item) => item.id ?? 0)
      .filter((id) => typeof id === 'number')
    return Math.max(...ids) + 1
  }

  getAll(): T[] {
    return this.provider.getItems()
  }

  getById(id: number | string): T | undefined {
    return this.getAll().find((item) => item.id === Number(id))
  }

  create(item: T): T {
    const items = this.getAll()
    const newItem = {
      ...item,
      id: this.getNextId(items),
    }
    items.push(newItem)
    this.save(items)
    return newItem
  }

  update(id: number | string, updatedItem: Partial<T>): T {
    const items = this.getAll()
    const index = items.findIndex((item) => item.id === Number(id))
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`)
    }
    const merged = { ...items[index], ...updatedItem, id: Number(id) } as T
    items[index] = merged
    this.save(items)
    return merged
  }

  delete(id: number | string): boolean {
    const items = this.getAll()
    const filtered = items.filter((item) => item.id !== Number(id))
    this.save(filtered)
    return filtered.length !== items.length
  }

  protected save(items: T[]): void {
    this.provider.saveItems(items)
  }

  search(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate)
  }
}


