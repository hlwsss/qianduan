import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api/index.js' // [已切换为真实后端接口]

export const useCaseStore = defineStore('case', () => {
  // 状态
  const cases = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({})
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const selectedCase = ref(null)
  // 固定筛选项
  const filterOptions = ref({
    countries: [
      { value: '中国', label: 'country_cn' },
      { value: '日本', label: 'country_jp' },
      { value: '美国', label: 'country_us' },
      { value: '韩国', label: 'country_kr' }
    ],
    types: [
      { value: '知识产权', label: 'type_ip' },
      { value: '反垄断', label: 'type_antitrust' },
      { value: '合同纠纷', label: 'type_contract' },
      { value: '劳动争议', label: 'type_labor' },
      { value: '国际贸易', label: 'type_trade' },
      { value: '投资并购', label: 'type_invest' },
      { value: '海事海商', label: 'type_maritime' },
      { value: '金融证券', label: 'type_finance' }
    ],
    years: [
      { value: '1', label: 'year_1' },
      { value: '5', label: 'year_5' },
      { value: '10', label: 'year_10' }
    ]
  })

  // 计算属性
  const hasMorePages = computed(() => {
    return pagination.value.page < pagination.value.totalPages
  })

  const currentFilters = computed(() => {
    return filters.value
  })

  // 操作
  const setLoading = (isLoading) => {
    loading.value = isLoading
  }

  const setError = (err) => {
    error.value = err
  }

  const clearError = () => {
    error.value = null
  }

  // 搜索案例
  const searchCases = async (searchParams = {}) => {
    const start = Date.now();
    try {
      setLoading(true)
      clearError()
      const currentLang = localStorage.getItem('lang') || 'zh'
      const params = {
        ...filters.value,
        ...searchParams,
        page: pagination.value.page,
        limit: pagination.value.limit,
        lang: currentLang
      }
      console.log(params)
      // [后端接口] GET /api/cases/search
      const response = await api.case.search(params)
      if (response.success) {
        cases.value = response.data.cases
        pagination.value = response.data.pagination
      } else {
        throw new Error('搜索失败')
      }
    } catch (err) {
      setError(err.message)
      console.error('搜索案例失败:', err)
    } finally {
      const elapsed = Date.now() - start;
      const minLoading = 300;
      if (elapsed < minLoading) {
        setTimeout(() => setLoading(false), minLoading - elapsed);
      } else {
        setLoading(false);
      }
    }
  }

  // 获取案例详情
  const getCaseDetail = async (caseId) => {
    try {
      setLoading(true)
      clearError()
      const currentLang = localStorage.getItem('lang') || 'zh'
      // [后端接口] GET /api/cases/:id
      console.log('getCaseDetail', caseId, { lang: currentLang }) 
      const response = await api.case.getDetail(caseId, { lang: currentLang })
      if (response.success) {
        selectedCase.value = response.data
        return response.data
      } else {
        throw new Error('获取案例详情失败')
      }
    } catch (err) {
      setError(err.message)
      console.error('获取案例详情失败:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 更新筛选条件
  const updateFilters = (newFilters) => {
    // 合并并删除空字段，保证彻底清除
    const merged = { ...filters.value, ...newFilters }
    Object.keys(merged).forEach(key => {
      if (merged[key] === '' || merged[key] === undefined) {
        delete merged[key]
      }
    })
    
    // 确保始终有一个排序选项
    if (!merged.sort) {
      merged.sort = 'date-desc'
    }
    
    filters.value = merged
    pagination.value.page = 1 // 重置页码
  }

  // 清除筛选条件
  const clearFilters = async () => {
    // 保留默认排序选项，清除其他筛选条件
    filters.value = { sort: 'date-desc' }
    pagination.value.page = 1
    await searchCases() // 清除后立即刷新案例列表
  }

  // 加载更多案例（分页）
  const loadMoreCases = async () => {
    if (loading.value || !hasMorePages.value) return
    try {
      setLoading(true)
      clearError()
      const currentLang = localStorage.getItem('lang') || 'zh'
      const nextPage = pagination.value.page + 1
      const params = {
        ...filters.value,
        page: nextPage,
        limit: pagination.value.limit,
        lang: currentLang
      }
      const response = await api.case.search(params)
      if (response.success) {
        cases.value = [...cases.value, ...response.data.cases]
        pagination.value = response.data.pagination
      } else {
        throw new Error('加载更多案例失败')
      }
    } catch (err) {
      setError(err.message)
      console.error('加载更多案例失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 刷新案例列表
  const refreshCases = async () => {
    pagination.value.page = 1
    await searchCases()
  }

  // 设置选中的案例
  const setSelectedCase = (caseData) => {
    selectedCase.value = caseData
  }

  // 清除选中的案例
  const clearSelectedCase = () => {
    selectedCase.value = null
  }

  return {
    // 状态
    cases,
    loading,
    error,
    filters,
    pagination,
    selectedCase,
    filterOptions,
    // 计算属性
    hasMorePages,
    currentFilters,
    // 操作
    setLoading,
    setError,
    clearError,
    searchCases,
    getCaseDetail,
    updateFilters,
    clearFilters,
    loadMoreCases,
    refreshCases,
    setSelectedCase,
    clearSelectedCase
  }
}) 