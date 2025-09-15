import Bucket from './core/Bucket'

function setupBucket() {
  const storageType = import.meta.env.VITE_STORAGE_TYPE
  window.$bucket = new Bucket(storageType)
}

export default setupBucket
