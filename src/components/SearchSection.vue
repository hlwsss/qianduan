<template>
  <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          全球法律案例智能检索
        </h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          覆盖全球主要司法管辖区的法律案例数据库，提供智能搜索、精准筛选和深度分析功能
        </p>
      </div>

      <!-- 搜索框 -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <form @submit.prevent="handleSearch" class="space-y-4">
            <!-- 主要搜索框 -->
            <div class="relative">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="输入关键词、案例名称、法律条文..."
                class="w-full pl-12 pr-4 py-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400 text-xl"></i>
              </div>
            </div>

            <!-- 搜索按钮 -->
            <div class="flex justify-center">
              <button
                type="submit"
                :disabled="caseStore.loading"
                class="bg-blue-600 text-white py-4 px-12 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="caseStore.loading" class="flex items-center justify-center">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  搜索中...
                </span>
                <span v-else class="flex items-center justify-center">
                  <i class="fas fa-search mr-2"></i>
                  开始搜索
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 搜索提示 -->
      <div class="mt-6 text-center">
        <p class="text-blue-200 text-sm">
          💡 提示：使用左侧筛选面板可以进一步缩小搜索范围
        </p>
      </div>

      <!-- 搜索统计 -->
      <div class="mt-8 text-center">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-200">{{ analytics.totalCases?.toLocaleString() || '2,351' }}</div>
            <div class="text-blue-100">总案例数</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-200">{{ analytics.totalCountries || '10' }}</div>
            <div class="text-blue-100">覆盖国家</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-200">{{ analytics.totalTypes || '10' }}</div>
            <div class="text-blue-100">案例类型</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-200">{{ analytics.recentCases || '45' }}</div>
            <div class="text-blue-100">本月新增</div>
          </div>
        </div>
      </div>

      <!-- 热门搜索标签 -->
      <div class="mt-12">
        <h3 class="text-lg font-semibold text-center mb-4">热门搜索</h3>
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="tag in hotTags"
            :key="tag"
            @click="searchByTag(tag)"
            class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors text-sm"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCaseStore } from '../stores/caseStore.js'
import api from '../api/index.js' // [已切换为真实后端接口]

const caseStore = useCaseStore()

const searchKeyword = ref('')
const analytics = ref({})
const hotTags = ref([
  '知识产权', '反垄断', '合同纠纷', '劳动争议', 
  '国际贸易', '投资并购', '海事海商', '金融证券'
])

// 处理搜索
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) {
    // 如果没有关键词，只使用左侧筛选条件
    await caseStore.searchCases()
    return
  }
  // 更新关键词筛选条件
  caseStore.updateFilters({ keyword: searchKeyword.value.trim() })
  // 执行搜索
  await caseStore.searchCases()
  // 滚动到案例列表区域
  scrollToCaseList()
}

// 清除所有条件（如有需要时调用）
const clearAll = async () => {
  searchKeyword.value = ''
  await caseStore.clearFilters()
}

// 通过标签搜索
const searchByTag = async (tag) => {
  searchKeyword.value = tag
  await handleSearch()
}

// 滚动到案例列表
const scrollToCaseList = () => {
  const caseListElement = document.querySelector('#case-list')
  if (caseListElement) {
    caseListElement.scrollIntoView({ behavior: 'smooth' })
  }
}

// 获取统计数据
const loadAnalytics = async () => {
  try {
    // [后端接口] GET /api/analytics/cases
    const response = await api.analytics.getCaseStats()
    if (response.success) {
      analytics.value = response.data
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

onMounted(async () => {
  await loadAnalytics()
})
</script> 