module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;
  const databases = new Map();
  class IDBVersionChangeEvent {
    constructor(type, target) {
      this.type = type;
      this.target = target;
    }
  }

  class IDBOpenDBRequest {
    constructor(name, version) {
      this.name = name;
      this.version = version;
      this.result = null;
      this.onerror = null;
      this.onsuccess = null;
      this.onupgradeneeded = null;
    }
  }

  class MockObjectStore {
    constructor(name, options = {}) {
      this.name = name;
      this.keyPath = options.keyPath || null;
      this.autoIncrement = !!options.autoIncrement;
      this.data = new Map();
    }

    add(value, key) {
      const id = this.autoIncrement ? this.data.size + 1 : key;
      if (this.data.has(id)) throw new Error(`Key ${id} already exists`);
      this.data.set(id, value);
      return id;
    }

    get(key) {
      return this.data.get(key);
    }

    getAll() {
      return Array.from(this.data.values());
    }

    delete(key) {
      this.data.delete(key);
    }
  }

  class MockIDBDatabase {
    constructor(name, version) {
      this.name = name;
      this.version = version;
      this.objectStores = new Map();
    }

    /** 模拟 createObjectStore() */
    createObjectStore(storeName, options = {}) {
      if (this.objectStores.has(storeName)) {
        throw new Error(`Object store "${storeName}" already exists`);
      }
      const store = new MockObjectStore(storeName, options);
      this.objectStores.set(storeName, store);
      return store;
    }

    /** 模拟 transaction(storeName) */
    transaction(storeName) {
      const store = this.objectStores.get(storeName);
      if (!store) throw new Error(`Object store "${storeName}" not found`);
      return store;
    }

    close() {
      console.log(`[MockDB] ${this.name} closed`);
    }
  }

  class IDBFactory {
    constructor() {
    }

    open(name, version = 1) {
      const request = new IDBOpenDBRequest(name, version);

      setTimeout(() => {
        const oldVersion = databases.get(name)?.version || 0;

        if (version > oldVersion) {
          const db = new MockIDBDatabase(name, version);
          databases.set(name, db);

          if (typeof request.onupgradeneeded === "function") {
            const event = new IDBVersionChangeEvent("upgradeneeded", { result: db });
            request.onupgradeneeded(event);
          }

          // setTimeout(() => {
          //   request.result = db;
          //   if (typeof request.onsuccess === "function") {
          //     request.onsuccess({ target: { result: db } });
          //   }
          // }, 0);
        // } else {
        //   const db = databases.get(name);
        //   request.result = db;
        //   if (typeof request.onsuccess === "function") {
        //     request.onsuccess({ target: { result: db } });
        //   }
        }
      }, 0);

      return request;
    }
  }
  const indexedDB = {
    __proto__: IDBFactory.prototype
  };
  window.IDBFactory = IDBFactory;
  window.indexedDB = indexedDB;
  sdenv.tools.setNativeFuncName(window.IDBFactory, 'IDBFactory');
  sdenv.tools.setNativeObjName(window.indexedDB, 'IDBFactory');
}
