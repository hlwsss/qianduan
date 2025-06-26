<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold text-blue-600">
              <i class="fas fa-balance-scale mr-2"></i>
              法律案例库
            </h1>
          </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="hidden md:flex space-x-8">
          <a href="#" @click.prevent class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            首页
          </a>
          <a href="#" @click.prevent class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            案例库
          </a>
          <a href="#" @click.prevent class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            法律条文
          </a>
          <a href="#" @click.prevent class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            统计分析
          </a>
          <a href="#" @click.prevent class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            关于我们
          </a>
        </nav>

        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 -->
          <button
            @click="toggleSearch"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="搜索"
          >
            <i class="fas fa-search text-lg"></i>
          </button>

          <!-- 中英文切换按钮 -->
          <div class="bg-white rounded-full px-2 py-1 flex items-center shadow border">
            <button
              :class="['px-2 py-1 rounded transition', lang === 'en' ? 'text-blue-700 font-bold ring-2 ring-blue-500' : 'text-gray-500']"
              @click="setLang('en')"
            >EN</button>
            <span class="mx-1 text-gray-400">|</span>
            <button
              :class="['px-2 py-1 rounded transition', lang === 'zh' ? 'text-blue-700 font-bold ring-2 ring-blue-500' : 'text-gray-500']"
              @click="setLang('zh')"
            >中文</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div
      v-if="showSearch"
      class="bg-gray-50 border-t border-gray-200 py-4"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索案例、法律条文..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="handleSearch"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-search text-gray-400"></i>
          </div>
          <button
            @click="handleSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
          >
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useCaseStore } from '../stores/caseStore.js'
import { useI18n } from 'vue-i18n'

const caseStore = useCaseStore()
const { locale } = useI18n()

const showSearch = ref(false)
const searchKeyword = ref('')
const lang = ref(locale.value)

// 切换搜索栏
const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchKeyword.value = ''
  }
}

// 处理搜索
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    caseStore.updateFilters({ keyword: searchKeyword.value.trim() })
    caseStore.searchCases()
    showSearch.value = false
  }
}

const setLang = (l) => {
  lang.value = l
  locale.value = l
  localStorage.setItem('lang', l)
}

// 保证切换时UI同步
watch(locale, (val) => {
  lang.value = val
})
</script> 