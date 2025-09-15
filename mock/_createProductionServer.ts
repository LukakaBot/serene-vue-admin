import { createProdMockServer } from 'vite-plugin-mock/client'
import api from './api'

export function setupMockServer() {
  createProdMockServer([...api])
}
