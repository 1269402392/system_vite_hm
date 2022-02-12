// 缓存相关
class Cache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  delCache(key: string) {
    if (key) {
      localStorage.removeItem(key)
    }
  }
}
const cache = new Cache()
export { cache }
