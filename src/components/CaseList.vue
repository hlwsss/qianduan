<template>
  <div id="case-list" class="flex-1 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 全局加载状态 -->
      <div v-if="caseStore.loading" class="flex flex-col items-center justify-center py-24">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
        <p class="text-blue-600 text-lg">正在搜索案例...</p>
      </div>
      <div v-else-if="caseStore.cases.length === 0" class="text-center py-16">
        <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">未找到相关案例</h3>
        <p class="text-gray-500 mb-6">请尝试调整搜索关键词或筛选条件</p>
        <button
          @click="clearAllFilters"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          清除所有筛选条件
        </button>
      </div>
      <div v-else>
        <!-- 筛选状态和结果统计 -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <h2 class="text-2xl font-bold text-gray-800">案例列表</h2>
            </div>
            <!-- 结果统计 -->
            <div class="text-right">
              <div class="text-sm text-gray-600">
                共找到 <span class="font-semibold text-blue-600">{{ caseStore.totalCount }}</span> 个案例
              </div>
              <div v-if="caseStore.filters.keyword" class="text-xs text-gray-500">
                关键词："{{ caseStore.filters.keyword }}"
              </div>
            </div>
          </div>
          <!-- 当前筛选条件标签 -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4">
            <div
              v-for="(filter, key) in activeFilterTags"
              :key="key"
              class="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{{ filter.label }}</span>
              <button
                @click="removeFilter(key)"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                <i class="fas fa-times text-xs"></i>
              </button>
            </div>
            <button
              @click="clearAllFilters"
              class="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              <i class="fas fa-times mr-1"></i>
              清除所有
            </button>
          </div>
        </div>
        <!-- 案例列表 -->
        <div class="space-y-4">
          <div
            v-for="caseItem in caseStore.cases"
            :key="caseItem.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            @click="openCaseDetail(caseItem)"
          >
            <div class="p-6">
              <!-- 案例标题和基本信息 -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {{ caseItem.title }}
                  </h3>
                  <div class="flex items-center space-x-4 text-sm text-gray-600">
                    <span class="flex items-center">
                      <i class="fas fa-gavel mr-1"></i>
                      {{ caseItem.court }}
                    </span>
                    <span class="flex items-center">
                      <i class="fas fa-calendar mr-1"></i>
                      {{ formatDate(caseItem.date) }}
                    </span>
                    <span class="flex items-center">
                      <i class="fas fa-flag mr-1"></i>
                      {{ caseItem.country }}
                    </span>
                  </div>
                </div>
                
                <!-- 案例类型标签 -->
                <div class="flex flex-col items-end space-y-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ caseItem.type }}
                  </span>
                  <div class="flex items-center space-x-3 text-sm text-gray-500">
                    <span class="flex items-center">
                      <i class="fas fa-eye mr-1"></i>
                      {{ caseItem.views }}
                    </span>
                    <span class="flex items-center">
                      <i class="fas fa-quote-right mr-1"></i>
                      {{ caseItem.citations }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 案例摘要 -->
              <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {{ caseItem.summary }}
              </p>

              <!-- 关键词标签 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="keyword in caseItem.keywords.slice(0, 5)"
                  :key="keyword"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  {{ keyword }}
                </span>
                <span v-if="caseItem.keywords.length > 5" class="text-xs text-gray-500">
                  +{{ caseItem.keywords.length - 5 }} 更多
                </span>
              </div>

              <!-- 操作按钮 -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-4">
                  <button
                    @click.stop="toggleFavorite(caseItem)"
                    :class="[
                      'flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors',
                      caseItem.isFavorite
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-gray-500 hover:text-red-600'
                    ]"
                  >
                    <i :class="caseItem.isFavorite ? 'fas' : 'far'" class="fa-heart"></i>
                    <span>{{ caseItem.isFavorite ? '已收藏' : '收藏' }}</span>
                  </button>
                  <button
                    @click.stop="shareCase(caseItem)"
                    class="flex items-center space-x-1 px-3 py-1 rounded text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <i class="fas fa-share"></i>
                    <span>分享</span>
                  </button>
                  <button
                    @click.stop="downloadCase(caseItem)"
                    class="flex items-center space-x-1 px-3 py-1 rounded text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <i class="fas fa-download"></i>
                    <span>下载</span>
                  </button>
                </div>
                
                <button
                  @click.stop="openCaseDetail(caseItem)"
                  class="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  查看详情
                  <i class="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div v-if="caseStore.totalCount > caseStore.cases.length" class="mt-8 flex justify-center">
          <div class="flex items-center space-x-2">
            <button
              @click="loadMore"
              :disabled="caseStore.loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="caseStore.loading" class="flex items-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                加载中...
              </span>
              <span v-else class="flex items-center">
                <i class="fas fa-plus mr-2"></i>
                加载更多
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCaseStore } from '../stores/caseStore.js'

const caseStore = useCaseStore()

// 计算属性
const hasActiveFilters = computed(() => {
  return caseStore.filters.keyword || 
         caseStore.filters.country || 
         caseStore.filters.type || 
         caseStore.filters.year
})

const activeFilterTags = computed(() => {
  const tags = {}
  if (caseStore.filters.keyword) {
    tags.keyword = { label: `${$t('keyword')}：${caseStore.filters.keyword}` }
  }
  if (caseStore.filters.country) {
    const country = caseStore.filterOptions.countries.find(c => c.value === caseStore.filters.country)
    tags.country = { label: `${$t('country')}：${country ? $t(country.label) : caseStore.filters.country}` }
  }
  if (caseStore.filters.type) {
    const type = caseStore.filterOptions.types.find(t => t.value === caseStore.filters.type)
    tags.type = { label: `${$t('type')}：${type ? $t(type.label) : caseStore.filters.type}` }
  }
  if (caseStore.filters.year) {
    const year = caseStore.filterOptions.years.find(y => y.value === caseStore.filters.year)
    tags.year = { label: `${$t('year')}：${year ? $t(year.label) : caseStore.filters.year}` }
  }
  return tags
})

// 方法
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const openCaseDetail = (caseItem) => {
  caseStore.setSelectedCase(caseItem)
  caseStore.showDetailModal = true
}

const toggleFavorite = async (caseItem) => {
  try {
    await caseStore.toggleFavorite(caseItem.id)
  } catch (error) {
    console.error('收藏操作失败:', error)
  }
}

const shareCase = (caseItem) => {
  // 实现分享功能
  if (navigator.share) {
    navigator.share({
      title: caseItem.title,
      text: caseItem.summary,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

const downloadCase = (caseItem) => {
  // 实现下载功能
  const link = document.createElement('a')
  link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(caseItem, null, 2))}`
  link.download = `${caseItem.title}.json`
  link.click()
}

const removeFilter = async (filterKey) => {
  const newFilters = { ...caseStore.filters }
  delete newFilters[filterKey]
  caseStore.updateFilters(newFilters)
  await caseStore.searchCases()
}

const clearAllFilters = async () => {
  caseStore.updateFilters({})
  await caseStore.searchCases()
}

const loadMore = async () => {
  await caseStore.loadMoreCases()
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 