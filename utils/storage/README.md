# StorageManager

StorageManager is a utility class for managing sessionStorage and localStorage. It provides functions to set, get, and remove data, supports setting an expiration time for automatic removal of expired data, and offers a common function to listen for storage changes. StorageManager also supports customizing the storage key prefix, making it convenient to use in different applications.

## Features

- Supports simultaneous operations on sessionStorage and localStorage.
- Allows setting an expiration time for automatic removal of expired data.
- Supports adding observers to listen for storage changes.
- Supports customizing the storage key prefix.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install StorageManager.

```bash
npm install storage-manager
```

## Usage

```javascript
const StorageManager = require('storage-manager');

const storage = new StorageManager('myapp_');
storage.setItem('user', { name: 'John' }, 3600);
const user = storage.getItem('user');
console.log(user); // { name: 'John' }
storage.removeItem('user');
```

## API

### `setItem(key, value, expiration, storageType)`

Set a storage item.

- `key` (string): The key of the storage item.
- `value` (any): The value of the storage item.
- `expiration` (number | null): The expiration time in milliseconds (optional).
- `storageType` ('localStorage' | 'sessionStorage'): The storage type, can be 'localStorage' or 'sessionStorage' (optional, default is 'localStorage').

### `getItem(key, storageType)`

Get a storage item.

- `key` (string): The key of the storage item.
- `storageType` ('localStorage' | 'sessionStorage'): The storage type, can be 'localStorage' or 'sessionStorage' (optional, default is 'localStorage').
- Returns (any): The value of the storage item. Returns null if not found or expired.

### `removeItem(key, storageType)`

Remove a storage item from the storage.

- `key` (string): The key of the storage item.
- `storageType` ('localStorage' | 'sessionStorage'): The storage type, can be 'localStorage' or 'sessionStorage' (optional, default is 'localStorage').

### `addObserver(observer)`

Add an observer to listen for storage changes.

- `observer` (Object): The observer object implementing the Observer interface.

### `removeObserver(observer)`

Remove an observer.

- `observer` (Object): The observer object implementing the Observer interface.

## Note

StorageManager provides a simple and flexible way to manage sessionStorage and localStorage. By setting an expiration time and adding observers, you have better control over the stored data and can handle storage changes promptly. By customizing the storage key prefix, you can isolate stored data in different applications to avoid naming conflicts.

## License

[MIT](https://choosealicense.com/licenses/mit/)

We hope this information helps. If you have any further questions, please feel free to ask.