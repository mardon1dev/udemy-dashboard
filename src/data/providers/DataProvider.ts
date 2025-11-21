export interface DataProvider<T> {
  getItems(): T[]
  saveItems(items: T[]): void
}

export class LocalStorageProvider<T> implements DataProvider<T> {
  constructor(private storageKey: string) {}

  getItems(): T[] {
    const raw = localStorage.getItem(this.storageKey)
    return raw ? (JSON.parse(raw) as T[]) : []
  }

  saveItems(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }
}


