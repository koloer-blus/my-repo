interface Observer {
    update(key: string, newValue: any): void;
  }
  
  interface StorageData {
    value: any;
    expiration: number | null;
  }
  
  class StorageManager {
    private prefix: string;
    private observers: Set<Observer>;
  
    constructor(prefix = '') {
      this.prefix = prefix;
      this.observers = new Set<Observer>();
      this.observeStorageChanges();
    }
  
    /**
     * Set an item in the storage.
     * @param key - The key of the item.
     * @param value - The value of the item.
     * @param expiration - The expiration time in milliseconds (optional).
     * @param storageType - The storage type, either "localStorage" or "sessionStorage" (optional, default is "localStorage").
     */
    setItem(key: string, value: any, expiration?: number | null, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
      const prefixedKey = this.prefix + key;
      const data: StorageData = {
        value,
        expiration: expiration ? Date.now() + expiration : null,
      };
      const storage = this.getStorage(storageType);
      storage.setItem(prefixedKey, JSON.stringify(data));
    }
  
    /**
     * Get an item from the storage.
     * @param key - The key of the item.
     * @param storageType - The storage type, either "localStorage" or "sessionStorage" (optional, default is "localStorage").
     * @returns The value of the item, or null if not found or expired.
     */
    getItem(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): any {
      const prefixedKey = this.prefix + key;
      const storage = this.getStorage(storageType);
      const dataString = storage.getItem(prefixedKey);
      if (dataString) {
        const data: StorageData = JSON.parse(dataString);
        if (!data.expiration || data.expiration > Date.now()) {
          return data.value;
        }
      }
      return null;
    }
  
    /**
     * Remove an item from the storage.
     * @param key - The key of the item.
     * @param storageType - The storage type, either "localStorage" or "sessionStorage" (optional, default is "localStorage").
     */
    removeItem(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
      const prefixedKey = this.prefix + key;
      const storage = this.getStorage(storageType);
      storage.removeItem(prefixedKey);
    }
  
    /**
     * Add an observer to listen for storage changes.
     * @param observer - The observer object that implements the Observer interface.
     */
    addObserver(observer: Observer): void {
      this.observers.add(observer);
    }
  
    /**
     * Remove an observer.
     * @param observer - The observer object that implements the Observer interface.
     */
    removeObserver(observer: Observer): void {
      this.observers.delete(observer);
    }
  
    private notifyObservers(key: string, newValue: any): void {
      this.observers.forEach((observer) => observer.update(key, newValue));
    }
  
    private observeStorageChanges(): void {
      window.addEventListener('storage', (event) => {
        const { key, newValue } = event;
        if (key && key.startsWith(this.prefix)) {
          this.notifyObservers(key.slice(this.prefix.length), JSON.parse(String(newValue)).value);
        }
      });
    }
  
    private getStorage(storageType: 'localStorage' | 'sessionStorage'): Storage {
      return storageType === 'sessionStorage' ? sessionStorage : localStorage;
    }
  }
  
  export default StorageManager;