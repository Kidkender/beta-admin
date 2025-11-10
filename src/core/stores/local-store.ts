export class LocalStore {
  private static instance: LocalStore

  private constructor() {}

  public static getInstance(): LocalStore {
    if (!LocalStore.instance) {
      LocalStore.instance = new LocalStore()
    }
    return LocalStore.instance
  }

  // Các phương thức cơ bản
  public set<T>(key: string, value: T): void {
    // Nếu giá trị là string, không cần JSON.stringify
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, valueToStore)
  }

  public get<T>(key: string): T | null {
    const value: string = localStorage.getItem(key)
    if (!value) return null
    try {
      // Nếu value bắt đầu bằng { hoặc [ thì đó là JSON
      return value.startsWith('{') || value.startsWith('[') ? (JSON.parse(value) as T) : (value as unknown as T)
    } catch {
      return value as unknown as T
    }
  }

  public remove(key: string): void {
    localStorage.removeItem(key)
  }

  public clear(): void {
    const localStores = localStorage.get()
    Object.keys(localStores).forEach((key) => this.remove(key))
  }

  // Các phương thức kiểm tra
  public has(key: string): boolean {
    return !!localStorage.getItem(key)
  }
}

// Export instance mặc định
export default LocalStore.getInstance()
