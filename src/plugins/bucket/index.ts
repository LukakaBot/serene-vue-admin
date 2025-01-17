import Bucket from './core/Bucket';

export function setupBucket() {
  const storageType = import.meta.env.VITE_STORAGE_TYPE;
  window.$bucket = new Bucket(storageType);
}
