
class Bucket {
  private storage: Storage;

  constructor(storageType: 'localStorage' | 'sessionStorage' = 'localStorage') {
    this.storage = storageType === 'localStorage' ? localStorage : sessionStorage;
  }

  /** 设置缓存 */
  set<T>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /** 获取缓存 */
  get<T>(key: string) {
    if (this.storage.getItem(key)) {
      return JSON.parse(this.storage.getItem(key)!) as T;
    }
    return null;
  }

  /** 删除缓存 */
  remove(key: string) {
    this.storage.removeItem(key);
  }

  /** 清空缓存 */
  clear() {
    this.storage.clear();
  }
}

export default Bucket;


