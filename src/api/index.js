// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// 请求拦截器
const request = async (url, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // 添加认证token（如果有）
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 添加语言参数
  const currentLang = localStorage.getItem('lang') || 'zh'
  config.headers['Accept-Language'] = currentLang

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// 案例相关API
export const caseAPI = {
  // 搜索案例
  search: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/cases/search?${queryString}`)
  },

  // 获取案例详情
  getDetail: async (caseId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `/cases/${caseId}?${queryString}` : `/cases/${caseId}`
    return request(url)
  },

  // 获取案例列表
  getList: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/cases?${queryString}`)
  },

  // 获取推荐案例
  getRecommendations: async (caseId) => {
    return request(`/cases/${caseId}/recommendations`)
  },

  // 下载案例PDF
  downloadPDF: async (caseId) => {
    return request(`/cases/${caseId}/pdf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
  },
}

// 统计分析API
export const analyticsAPI = {
  // 获取案例统计
  getCaseStats: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/analytics/cases?${queryString}`)
  },

  // 获取趋势分析
  getTrends: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/analytics/trends?${queryString}`)
  },

  // 获取热门案例
  getPopularCases: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/analytics/popular?${queryString}`)
  },
}

// 法律条文API
export const lawAPI = {
  // 搜索法律条文
  search: async (params) => {
    const queryString = new URLSearchParams(params).toString()
    return request(`/laws/search?${queryString}`)
  },

  // 获取条文详情
  getDetail: async (lawId) => {
    return request(`/laws/${lawId}`)
  },

  // 获取条文分类
  getCategories: async () => {
    return request('/laws/categories')
  },
}

export default {
  case: caseAPI,
  analytics: analyticsAPI,
  law: lawAPI,
} 