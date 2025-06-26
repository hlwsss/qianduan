<template>
  <aside class="w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
    <div class="p-6">
      <div v-if="caseStore.loading" class="flex items-center justify-center mb-4 text-blue-600">
        <i class="fas fa-spinner fa-spin mr-2"></i> 正在加载...
      </div>
      <!-- 筛选标题 -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-800">
          <i class="fas fa-filter mr-2 text-blue-600"></i>
          {{ $t('filter') }}
        </h2>
        <button
          v-if="hasActiveFilters"
          @click="clearAllFilters"
          class="text-sm text-red-600 hover:text-red-700 transition-colors"
          title="{{ $t('clear') }}"
        >
          <i class="fas fa-times mr-1"></i>
          {{ $t('clear') }}
        </button>
      </div>

      <!-- 当前筛选状态 -->
      <div v-if="hasActiveFilters" class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 class="text-sm font-medium text-blue-800 mb-2">{{ $t('currentFilter') }}</h3>
        <div class="space-y-1">
          <div v-if="activeFilters.keyword" class="flex items-center justify-between">
            <span class="text-sm text-blue-700">关键词：{{ activeFilters.keyword }}</span>
          </div>
          <div v-if="activeFilters.country" class="flex items-center justify-between">
            <span class="text-sm text-blue-700">国家：{{ $t(getCountryLabel(activeFilters.country)) }}</span>
          </div>
          <div v-if="activeFilters.type" class="flex items-center justify-between">
            <span class="text-sm text-blue-700">类型：{{ $t(getTypeLabel(activeFilters.type)) }}</span>
          </div>
          <div v-if="activeFilters.year" class="flex items-center justify-between">
            <span class="text-sm text-blue-700">年份：{{ activeFilters.year }}</span>
          </div>
        </div>
      </div>

      <!-- 国家/地区筛选 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">
          <i class="fas fa-globe mr-2 text-gray-600"></i>
          {{ $t('country') }}
        </h3>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <div
            v-for="country in filterOptions.countries || []"
            :key="country.value"
            class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            @click="toggleFilter('country', country.value)"
          >
            <span
              class="mr-3 w-5 h-5 flex items-center justify-center border-2 rounded-full"
              :class="selectedFilters.country === country.value ? 'border-blue-600' : 'border-gray-400'"
            >
              <span v-if="selectedFilters.country === country.value" class="w-3 h-3 bg-blue-600 rounded-full block"></span>
            </span>
            <span class="flex-1 text-sm text-gray-700">{{ $t(country.label) }}</span>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ country.count }}
            </span>
          </div>
        </div>
      </div>

      <!-- 案例类型筛选 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">
          <i class="fas fa-gavel mr-2 text-gray-600"></i>
          {{ $t('type') }}
        </h3>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <div
            v-for="type in filterOptions.types || []"
            :key="type.value"
            class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            @click="toggleFilter('type', type.value)"
          >
            <span
              class="mr-3 w-5 h-5 flex items-center justify-center border-2 rounded-full"
              :class="selectedFilters.type === type.value ? 'border-blue-600' : 'border-gray-400'"
            >
              <span v-if="selectedFilters.type === type.value" class="w-3 h-3 bg-blue-600 rounded-full block"></span>
            </span>
            <span class="flex-1 text-sm text-gray-700">{{ $t(type.label) }}</span>
          </div>
        </div>
      </div>

      <!-- 年份筛选 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">
          <i class="fas fa-calendar mr-2 text-gray-600"></i>
          {{ $t('year') }}
        </h3>
        <div class="space-y-2 max-h-48 overflow-y-auto">
          <div
            v-for="year in filterOptions.years || []"
            :key="year.value"
            class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            @click="toggleFilter('year', year.value)"
          >
            <span
              class="mr-3 w-5 h-5 flex items-center justify-center border-2 rounded-full"
              :class="selectedFilters.year === year.value ? 'border-blue-600' : 'border-gray-400'"
            >
              <span v-if="selectedFilters.year === year.value" class="w-3 h-3 bg-blue-600 rounded-full block"></span>
            </span>
            <span class="flex-1 text-sm text-gray-700">{{ $t(year.label) }}</span>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ year.count }}
            </span>
          </div>
        </div>
      </div>

      <!-- 排序选项 -->
      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-3">
          <i class="fas fa-sort mr-2 text-gray-600"></i>
          {{ $t('sort') }}
        </h3>
        <div class="space-y-2">
          <div
            v-for="sort in sortOptions"
            :key="sort.value"
            class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            @click="toggleFilter('sort', sort.value)"
          >
            <span
              class="mr-3 w-5 h-5 flex items-center justify-center border-2 rounded-full"
              :class="selectedFilters.sort === sort.value ? 'border-blue-600' : 'border-gray-400'"
            >
              <span v-if="selectedFilters.sort === sort.value" class="w-3 h-3 bg-blue-600 rounded-full block"></span>
            </span>
            <span class="text-sm text-gray-700">{{ $t(sort.label) }}</span>
          </div>
        </div>
      </div>

      <!-- 筛选结果统计 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ caseStore.totalCount }}</div>
          <div class="text-sm text-gray-600">{{ $t('caseCount', { count: caseStore.totalCount }) }}</div>
        </div>
        <div class="mt-3 text-xs text-gray-500 text-center">
          {{ $t('filterCount', { count: activeFilterCount }) }}
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useCaseStore } from '../stores/caseStore.js'
import debounce from 'lodash.debounce'

const caseStore = useCaseStore()

// 本地筛选状态
const selectedFilters = reactive({
  country: '',
  type: '',
  year: '',
  sort: 'date-desc'
})

// 排序选项
const sortOptions = [
  { value: 'date-desc', label: 'sort_date_desc' },
  { value: 'date-asc', label: 'sort_date_asc' },
  { value: 'relevance', label: 'sort_relevance' },
  { value: 'title-asc', label: 'sort_title_asc' },
  { value: 'title-desc', label: 'sort_title_desc' }
]

// 计算属性
const filterOptions = computed(() => caseStore.filterOptions)
const activeFilters = computed(() => caseStore.filters)
const hasActiveFilters = computed(() => {
  return activeFilters.value.keyword || 
         activeFilters.value.country || 
         activeFilters.value.type || 
         activeFilters.value.year
})

const activeFilterCount = computed(() => {
  let count = 0
  if (activeFilters.value.keyword) count++
  if (activeFilters.value.country) count++
  if (activeFilters.value.type) count++
  if (activeFilters.value.year) count++
  return count
})

// 获取标签文本
const getCountryLabel = (value) => {
  const country = filterOptions.value.countries.find(c => c.value === value)
  return country ? country.label : value
}

const getTypeLabel = (value) => {
  const type = filterOptions.value.types.find(t => t.value === value)
  return type ? type.label : value
}

// 应用筛选（原始函数）
const _applyFilters = async () => {
  // 构建筛选参数
  const filters = {}
  filters.country = selectedFilters.country
  filters.type = selectedFilters.type
  filters.year = selectedFilters.year
  filters.sort = selectedFilters.sort
  if (activeFilters.value.keyword) {
    filters.keyword = activeFilters.value.keyword
  }
  caseStore.updateFilters(filters)
  await caseStore.searchCases()
}

// 防抖版本
const applyFilters = debounce(_applyFilters, 300)

// 清除单个筛选条件
const clearFilter = async (filterKey) => {
  // 同步本地状态
  if (filterKey === 'country') selectedFilters.country = ''
  if (filterKey === 'type') selectedFilters.type = ''
  if (filterKey === 'year') selectedFilters.year = ''
  if (filterKey === 'sort') selectedFilters.sort = 'date-desc'
  if (filterKey === 'keyword') searchKeyword && (searchKeyword.value = '')

  // 删除 store 里的字段
  const newFilters = { ...caseStore.filters }
  delete newFilters[filterKey]
  caseStore.updateFilters(newFilters)
  await caseStore.searchCases()
}

// 清除所有筛选条件
const clearAllFilters = async () => {
  // 清除本地状态
  selectedFilters.country = ''
  selectedFilters.type = ''
  selectedFilters.year = ''
  selectedFilters.sort = 'date-desc'
  // 清除store中的筛选条件并刷新
  await caseStore.clearFilters()
}

// 监听store中的筛选条件变化，同步本地状态
watch(() => caseStore.filters, (newFilters) => {
  selectedFilters.country = newFilters.country ?? ''
  selectedFilters.type = newFilters.type ?? ''
  selectedFilters.year = newFilters.year ?? ''
  selectedFilters.sort = newFilters.sort ?? 'date-desc'
}, { deep: true })

// 新增：toggleFilter 方法（恢复为原始 value 比较）
const toggleFilter = async (key, value) => {
  if (selectedFilters[key] === value) {
    selectedFilters[key] = ''
  } else {
    selectedFilters[key] = value
  }
  await applyFilters()
}
</script> 