import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    // login: 'Login',
    filter: 'Filter',
    country: 'Country/Region',
    type: 'Case Type',
    year: 'Year',
    sort: 'Sort',
    all: 'All',
    search: 'Search',
    clear: 'Clear',
    caseList: 'Case List',
    caseDetail: 'Case Detail',
    summary: 'Summary',
    result: 'Result',
    focus: 'Focus',
    download: 'Download',
    close: 'Close',
    currentFilter: 'Current Filters:',
    caseCount: 'Cases: {count}',
    filterCount: 'Filters: {count}',
    // 国家
    country_cn: 'China',
    country_jp: 'Japan',
    country_us: 'United States',
    country_kr: 'South Korea',
    // 类型
    type_ip: 'Intellectual Property',
    type_antitrust: 'Antitrust',
    type_contract: 'Contract Dispute',
    type_labor: 'Labor Dispute',
    type_trade: 'International Trade',
    type_invest: 'Investment & M&A',
    type_maritime: 'Maritime',
    type_finance: 'Finance & Securities',
    // 年份
    year_1: 'Past 1 Year',
    year_5: 'Past 5 Years',
    year_10: 'Past 10 Years',
    // 排序
    sort_date_desc: 'Latest First',
    sort_date_asc: 'Earliest First',
    sort_relevance: 'Relevance',
    sort_title_asc: 'Title A-Z',
    sort_title_desc: 'Title Z-A',
    // ...可继续扩展
  },
  zh: {
    // login: '登录',
    filter: '筛选条件',
    country: '国家/地区',
    type: '案例类型',
    year: '年份',
    sort: '排序方式',
    all: '全部',
    search: '搜索',
    clear: '清除',
    caseList: '案例列表',
    caseDetail: '案例详情',
    summary: '案件摘要',
    result: '判决结果',
    focus: '争议焦点',
    download: '下载',
    close: '关闭',
    currentFilter: '当前筛选条件：',
    caseCount: '符合条件的案例: {count}',
    filterCount: '筛选条件：{count} 项',
    // 国家
    country_cn: '中国',
    country_jp: '日本',
    country_us: '美国',
    country_kr: '韩国',
    // 类型
    type_ip: '知识产权',
    type_antitrust: '反垄断',
    type_contract: '合同纠纷',
    type_labor: '劳动争议',
    type_trade: '国际贸易',
    type_invest: '投资并购',
    type_maritime: '海事海商',
    type_finance: '金融证券',
    // 年份
    year_1: '近一年',
    year_5: '近五年',
    year_10: '近十年',
    // 排序
    sort_date_desc: '最新发布',
    sort_date_asc: '最早发布',
    sort_relevance: '相关度',
    sort_title_asc: '标题 A-Z',
    sort_title_desc: '标题 Z-A',
    // ...可继续扩展
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'zh',
  messages,
})

export default i18n 