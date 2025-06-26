<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
      <!-- 关闭按钮 -->
      <button @click="close" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl focus:outline-none">
        <i class="fas fa-times"></i>
      </button>
      <div class="p-8 pb-4">
        <!-- 顶部标签 -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in caseDetail.tags" :key="tag" class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {{ tag }}
          </span>
        </div>
        <!-- 标题 -->
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ caseDetail.title }}</h2>
        <div class="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
          <div>判决时间：<span class="font-medium text-gray-800">{{ formatDate(caseDetail.date) }}</span></div>
          <div>判决法院：<span class="font-medium text-gray-800">{{ caseDetail.court }}</span></div>
          <div>案号：<span class="font-medium text-gray-800">{{ caseDetail.caseNumber }}</span></div>
        </div>
        <div class="text-sm text-gray-600 mb-6">
          主审法官：<span class="font-medium text-gray-800">{{ caseDetail.judges }}</span>
        </div>
        <!-- 案件摘要 -->
        <div class="mb-6">
          <div class="flex items-center mb-2 text-blue-700 font-semibold">
            <i class="fas fa-info-circle mr-2"></i>案件摘要
          </div>
          <div class="bg-blue-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed">
            {{ caseDetail.summary }}
          </div>
        </div>
        <!-- 判决结果和争议焦点 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div class="flex items-center mb-2 text-blue-700 font-semibold">
              <i class="fas fa-balance-scale mr-2"></i>判决结果
            </div>
            <div class="bg-blue-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed">
              {{ caseDetail.result }}
            </div>
          </div>
          <div>
            <div class="flex items-center mb-2 text-blue-700 font-semibold">
              <i class="fas fa-question-circle mr-2"></i>争议焦点
            </div>
            <div class="bg-blue-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed">
              <ol class="list-decimal pl-5">
                <li v-for="(point, idx) in caseDetail.focusPoints" :key="idx">{{ point }}</li>
              </ol>
            </div>
          </div>
        </div>
        <!-- 原始判决文书 -->
        <div v-if="caseDetail.judgementText" class="mb-8">
          <div class="flex items-center mb-2 text-blue-700 font-semibold">
            <i class="fas fa-file-alt mr-2"></i>原始判决文书
            <button @click="copyJudgementText" class="ml-3 text-xs text-blue-500 hover:text-blue-700 flex items-center">
              <i class="fas fa-copy mr-1"></i>复制全文
            </button>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 text-gray-800 text-sm leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
            {{ caseDetail.judgementText }}
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="flex justify-end gap-3 pb-4">
          <button @click="downloadPDF" class="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <i class="fas fa-download mr-2"></i>下载PDF
          </button>
          <button @click="close" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCaseStore } from '../stores/caseStore.js'

const caseStore = useCaseStore()
const show = computed(() => caseStore.showDetailModal)
const caseDetail = computed(() => caseStore.selectedCase || {})

const close = () => {
  caseStore.showDetailModal = false
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const downloadPDF = () => {
  // 这里可以集成PDF导出逻辑
  alert('PDF导出功能待实现')
}

const copyJudgementText = () => {
  if (caseDetail.value.judgementText) {
    navigator.clipboard.writeText(caseDetail.value.judgementText)
    alert('判决文书已复制到剪贴板')
  }
}
</script> 