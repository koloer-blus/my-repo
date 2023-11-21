# Axios Request Cache

Axios Request Cache is a request caching library based on Axios, which automatically caches data when sending requests, improving response speed and reducing server load.

## Features

- Provides encapsulated methods for GET, POST, PUT, and DELETE requests.
- Automatically caches response data and returns cached data directly for the same request next time.
- Uses IndexedDB to store cached data, allowing persistent storage on the client-side.
- Supports cancelling unfinished requests to avoid duplicate requests.

## Installation

Install the dependencies:

```bash
npm install axios dexie
```

## Usage

Import the required modules and classes:

```typescript
import { AxiosRequestConfig } from 'axios';
import { AxiosRequest } from './axios-request';

// Create an instance of AxiosRequest
const request = new AxiosRequest();
```

### Sending GET Requests

```typescript
async function fetchData() {
  try {
    const data = await request.get('https://api.example.com/data');
    console.log('Response Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

### Sending POST Requests

```typescript
async function sendData() {
  const requestData = { name: 'John', age: 30 };

  try {
    const data = await request.post('https://api.example.com/data', requestData);
    console.log('Response Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendData();
```

### Sending PUT Requests

```typescript
async function updateData() {
  const requestData = { name: 'John', age: 35 };

  try {
    const data = await request.put('https://api.example.com/data/1', requestData);
    console.log('Response Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

updateData();
```

### Sending DELETE Requests

```typescript
async function deleteData() {
  try {
    const data = await request.delete('https://api.example.com/data/1');
    console.log('Response Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteData();
```

Please modify the URL and data according to your specific needs, and handle the response data accordingly.

## Configuration

The Axios Request Cache library allows you to configure the following options:

- `cacheEnabled` (boolean): Enable or disable caching. Default: `true`.
- `cacheLifetime` (number): The lifetime of cached data in seconds. Default: `3600`.
- `indexedDBName` (string): The name of the IndexedDB database used for caching. Default: `'axios-request-cache'`.
- `indexedDBVersion` (number): The version number of the IndexedDB database. Default: `1`.
- `language` (string): The language used for displaying error messages. Default: `'en'`.

To configure these options, you can pass an optional configuration object when creating the AxiosRequest instance:

```typescript
const config: AxiosRequestConfig = {
  cacheEnabled: true,
  cacheLifetime: 3600,
  indexedDBName: 'my-cache-db',
  indexedDBVersion: 2,
  language: 'en',
};

const request = new AxiosRequest(config);
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to submit a pull request or open an issue on the GitHub repository.

## Contributors

Thanks to the following contributors for their contributions to this library:

- [Contributor 1](https://github.com/contributor1)
- [Contributor 2](https://github.com/contributor2)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).