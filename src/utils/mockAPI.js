// 模拟数据生成器
const generateMockCases = (count = 10) => {
  const countries = ['美国', '欧盟', '日本', '韩国', '英国', '德国', '法国', '加拿大', '澳大利亚', '新加坡']
  const types = ['知识产权', '反垄断', '合同纠纷', '劳动争议', '国际贸易', '投资并购', '海事海商', '金融证券', '环境保护', '数据保护']
  const courts = ['联邦巡回上诉法院', '欧洲联盟法院', '东京高等法院', '首尔中央地方法院', '英国最高法院', '德国联邦法院', '法国最高行政法院', '加拿大最高法院', '澳大利亚高等法院', '新加坡最高法院']
  const tags = ['专利侵权', '商标争议', '版权保护', '商业秘密', '反垄断', '合同违约', '劳动纠纷', '贸易争端', '投资争议', '海事纠纷', '金融监管', '数据隐私', '环境保护', '消费者权益', '竞争法']

  const cases = []
  for (let i = 1; i <= count; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const court = courts[Math.floor(Math.random() * courts.length)]
    const caseTags = tags.slice(0, Math.floor(Math.random() * 5) + 2)
    
    cases.push({
      id: i,
      country,
      type,
      date: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      title: `${country}${type}案例 ${i} (${2020 + Math.floor(Math.random() * 5)})`,
      summary: `这是一个关于${type}的重要案例，涉及${country}的法律体系。该案件在${court}审理，对相关法律领域产生了重要影响。`,
      tags: caseTags,
      court,
      citations: Math.floor(Math.random() * 100) + 10,
      views: Math.floor(Math.random() * 1000) + 100,
      detail: {
        judges: `法官 ${Math.floor(Math.random() * 10) + 1}`,
        caseNumber: `CASE-${2020 + Math.floor(Math.random() * 5)}-${String(i).padStart(4, '0')}`,
        summary: `该案件涉及${type}领域的核心问题，在${country}法律体系中具有重要地位。`,
        result: `法院最终判决支持原告/被告，并作出了相应的法律解释。`,
        controversy: [
          '案件的核心争议焦点是什么？',
          '相关法律条文的适用性如何？',
          '判决结果对行业的影响如何？',
          '国际法律协调的必要性如何？'
        ],
        laws: [
          `${country}相关法律条文第1条`,
          `${country}相关法律条文第2条`,
          '国际公约相关规定',
          '判例法原则'
        ]
      },
      judgementText: `这是一个关于${type}的重要案例，涉及${country}的法律体系。该案件在${court}审理，对相关法律领域产生了重要影响。`
    })
  }
  return cases
}

// 模拟API响应
const mockAPI = {
  // 模拟延迟
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // 模拟案例搜索
  searchCases: async (params) => {
    await mockAPI.delay(800)
    
    const { keyword = '', country = '', type = '', page = 1, limit = 10 } = params
    const allCases = generateMockCases(100)
    
    let filteredCases = allCases
    
    // 关键词过滤
    if (keyword) {
      filteredCases = filteredCases.filter(c => 
        c.title.includes(keyword) || 
        c.summary.includes(keyword) || 
        c.tags.some(tag => tag.includes(keyword))
      )
    }
    
    // 国家过滤
    if (country) {
      filteredCases = filteredCases.filter(c => c.country === country)
    }
    
    // 类型过滤
    if (type) {
      filteredCases = filteredCases.filter(c => c.type === type)
    }
    
    // 分页
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedCases = filteredCases.slice(start, end)
    
    return {
      success: true,
      data: {
        cases: paginatedCases,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: filteredCases.length,
          totalPages: Math.ceil(filteredCases.length / limit)
        }
      }
    }
  },

  // 模拟获取案例详情
  getCaseDetail: async (caseId) => {
    await mockAPI.delay(600)
    
    const cases = generateMockCases(1)
    const caseDetail = cases[0]
    caseDetail.id = parseInt(caseId)
    
    return {
      success: true,
      data: caseDetail
    }
  },

  // 模拟获取筛选选项
  getFilters: async () => {
    await mockAPI.delay(300)
    
    return {
      success: true,
      data: {
        countries: [
          { value: '美国', label: '美国', count: 1245 },
          { value: '日本', label: '日本', count: 532 },
          { value: '中国', label: '中国', count: 0 },
          { value: '韩国', label: '韩国', count: 418 },
          { value: '英国', label: '英国', count: 356 },
          { value: '德国', label: '德国', count: 298 },
          { value: '法国', label: '法国', count: 245 },
          { value: '加拿大', label: '加拿大', count: 187 },
          { value: '澳大利亚', label: '澳大利亚', count: 156 },
          { value: '新加坡', label: '新加坡', count: 98 }
        ],
        types: [
          { value: '知识产权', label: '知识产权', count: 567 },
          { value: '反垄断', label: '反垄断', count: 234 },
          { value: '合同纠纷', label: '合同纠纷', count: 456 },
          { value: '劳动争议', label: '劳动争议', count: 123 },
          { value: '国际贸易', label: '国际贸易', count: 345 },
          { value: '投资并购', label: '投资并购', count: 234 },
          { value: '海事海商', label: '海事海商', count: 89 },
          { value: '金融证券', label: '金融证券', count: 167 },
          { value: '环境保护', label: '环境保护', count: 78 },
          { value: '数据保护', label: '数据保护', count: 145 }
        ],
        years: [
          { value: '2025', label: '2025', count: 45 },
          { value: '2024', label: '2024', count: 234 },
          { value: '2023', label: '2023', count: 456 },
          { value: '2022', label: '2022', count: 567 },
          { value: '2021', label: '2021', count: 345 },
          { value: '2020', label: '2020', count: 234 },
          { value: 'earlier', label: '更早', count: 1234 }
        ],
        courtTypes: [
          { value: 'supreme', label: '最高法院', count: 234 },
          { value: 'appeal', label: '上诉法院', count: 567 },
          { value: 'high', label: '高等法院', count: 456 },
          { value: 'district', label: '地方法院', count: 789 }
        ]
      }
    }
  },

  // 模拟用户登录
  login: async (credentials) => {
    await mockAPI.delay(1000)
    
    if (credentials.username === 'admin' && credentials.password === '123456') {
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://via.placeholder.com/40'
          }
        }
      }
    } else {
      throw new Error('用户名或密码错误')
    }
  },

  // 模拟获取用户信息
  getUserProfile: async () => {
    await mockAPI.delay(500)
    
    return {
      success: true,
      data: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://via.placeholder.com/40',
        lastLogin: new Date().toISOString()
      }
    }
  },

  // 模拟获取统计数据
  getAnalytics: async () => {
    await mockAPI.delay(800)
    
    return {
      success: true,
      data: {
        totalCases: 2351,
        totalCountries: 10,
        totalTypes: 10,
        recentCases: 45,
        popularCases: generateMockCases(5),
        trends: {
          monthly: [120, 135, 145, 156, 167, 178, 189, 201, 213, 225, 238, 251],
          categories: [
            { name: '知识产权', value: 567 },
            { name: '反垄断', value: 234 },
            { name: '合同纠纷', value: 456 },
            { name: '国际贸易', value: 345 },
            { name: '投资并购', value: 234 }
          ]
        }
      }
    }
  }
}

export default mockAPI 