import axios from 'axios'

// Function to get the correct API URL based on environment
const getApiUrl = () => {
  // Server-side (NextAuth runs here): use internal Docker service
  if (typeof window === 'undefined') {
    return process.env.NEXTAUTH_BACKEND_URL || 'http://backend:8000'
  }
  
  // Client-side (browser): use the public API URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}

export const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Always use the correct URL for each request
    config.baseURL = getApiUrl()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient