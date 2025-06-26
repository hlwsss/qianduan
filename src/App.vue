<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 头部导航 -->
    <Header />
    
    <!-- 搜索区域 -->
    <SearchSection />
    
    <!-- 主要内容区域 -->
    <main class="flex">
      <!-- 左侧筛选面板 -->
      <FilterSidebar />
      
      <!-- 右侧案例列表 -->
      <CaseList />
    </main>
    
    <!-- 案例详情模态框 -->
    <CaseDetailModal />
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCaseStore } from './stores/caseStore.js'
import Header from './components/Header.vue'
import SearchSection from './components/SearchSection.vue'
import FilterSidebar from './components/FilterSidebar.vue'
import CaseList from './components/CaseList.vue'
import CaseDetailModal from './components/CaseDetailModal.vue'
import Footer from './components/Footer.vue'

const caseStore = useCaseStore()

onMounted(async () => {
  // 初始化数据
  await caseStore.searchCases()
})
</script>

<style>
/* 全局样式 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  main {
    flex-direction: column;
  }
  
  .w-80 {
    width: 100%;
  }
}
</style> 