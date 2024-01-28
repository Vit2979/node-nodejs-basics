import { workerData, parentPort } from 'worker_threads';

const cache = new Map();

export const nthFibonacci = (n) => {
  if (cache.has(n)) {
    return cache.get(n);
  }

  const result = n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
  cache.set(n, result);
  return result;
};

export const sendResult = () => {
  const result = nthFibonacci(workerData);
  parentPort.postMessage(result);
};

sendResult();