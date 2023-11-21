import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import Dexie from 'dexie';

/**
 * 创建 IndexedDB 数据库
 */
const db = new Dexie('requestCache');
db.version(1).stores({
  cache: '++id, url',
});

/**
 * 请求缓存类
 */
class RequestCache<T> {
  /**
   * 获取缓存的键
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {string} 缓存键的字符串表示
   */
  private getCacheKey(url: string, options: AxiosRequestConfig): string {
    return JSON.stringify({ url, options });
  }

  /**
   * 获取缓存数据
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T | undefined>} 缓存数据，如果不存在则返回 undefined
   */
  async get(url: string, options: AxiosRequestConfig): Promise<T | undefined> {
    const cacheKey = this.getCacheKey(url, options);
    const cacheData = await db.cache.where({ url: cacheKey }).first();
    return cacheData?.data;
  }

  /**
   * 设置缓存数据
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @param {T} data 要缓存的数据
   * @returns {Promise<void>}
   */
  async set(url: string, options: AxiosRequestConfig, data: T): Promise<void> {
    const cacheKey = this.getCacheKey(url, options);
    await db.cache.put({ url: cacheKey, data });
  }
}

/**
 * 请求队列类
 */
class RequestQueue<T> {
  private pendingRequests: Map<string, Canceler> = new Map();

  /**
   * 添加请求到队列
   * @param {Promise<T>} promise 请求的 Promise 对象
   * @param {string} url 请求的 URL
   * @param {Canceler} cancel 请求的取消函数
   */
  add(promise: Promise<T>, url: string, cancel: Canceler): void {
    this.pendingRequests.set(url, cancel);
    promise.finally(() => {
      this.pendingRequests.delete(url);
    });
  }

  /**
   * 取消队列中的所有请求
   */
  cancelAll(): void {
    this.pendingRequests.forEach((cancel) => {
      cancel();
    });
    this.pendingRequests.clear();
  }
}

/**
 * 请求函数类
 */
class Request {
  private cache = new RequestCache<any>();
  private queue = new RequestQueue<any>();

  /**
   * 发送请求
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T>} 请求的响应数据
   */
  async send<T>(url: string, options: AxiosRequestConfig): Promise<T> {
    const cacheData = await this.cache.get(url, options);
    if (cacheData) {
      console.log(`${getMessage('get_cache_data')} ${cacheData}`);
      return cacheData;
    }

    console.log(getMessage('sending_request'));
    const source = axios.CancelToken.source();
    options.cancelToken = source.token;

    const promise = axios.request<T>(options);
    this.queue.add(promise, url, source.cancel);

    try {
      const response = await promise;
      const data = response.data;
      this.cache.set(url, options, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * GET 请求
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T>} 请求的响应数据
   */
  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.send<T>(url, { ...options, method: 'GET' });
  }

  /**
   * POST 请求
   * @param {string} url 请求的 URL
   * @param {any} data 请求的数据
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T>} 请求的响应数据
   */
  async post<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.send<T>(url, { ...options, method: 'POST',data });
  }

  /**
   * PUT 请求
   * @param {string} url 请求的 URL
   * @param {any} data 请求的数据
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T>} 请求的响应数据
   */
  async put<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.send<T>(url, { ...options, method: 'PUT', data });
  }

  /**
   * DELETE 请求
   * @param {string} url 请求的 URL
   * @param {AxiosRequestConfig} options 请求的配置项
   * @returns {Promise<T>} 请求的响应数据
   */
  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.send<T>(url, { ...options, method: 'DELETE' });
  }
}

/**
 * 基于 Axios 的请求类
 */
class AxiosRequest extends Request {
  private instance: axios.AxiosInstance;

  constructor() {
    super();
    this.instance = axios.create();
  }

  async send<T>(url: string, options: AxiosRequestConfig): Promise<T> {
    const config = {
      url,
      ...options,
    };

    return super.send<T>(config);
  }
}

/**
 * 获取浏览器当前语言
 * @returns {string} 浏览器当前语言的小写字符串表示
 */
function getBrowserLanguage(): string {
  return (navigator.language || navigator.userLanguage).toLowerCase();
}

/**
 * 根据语言设置获取对应的提示信息
 * @param {string} key 提示信息的键
 * @returns {string} 对应语言的提示信息
 */
function getMessage(key: string): string {
  const language = getBrowserLanguage();
  const messages = {
    en: {
      request_in_progress: 'Request in progress...',
      sending_request: 'Sending request...',
      get_cache_data: 'Getting data from cache:',
    },
    zh: {
      request_in_progress: '请求正在进行中...',
      sending_request: '发起请求...',
      get_cache_data: '从缓存中获取数据：',
    },
  };

  const languagePrefix = language.split('-')[0];
  if (messages[languagePrefix] && messages[languagePrefix][key]) {
    return messages[languagePrefix][key];
  } else {
    return messages.en[key];
  }
}

/**
 * 在页面关闭前清空当前缓存
 */
window.addEventListener('beforeunload', () => {
  db.cache.clear();
});

// 使用示例
export const request = new AxiosRequest();