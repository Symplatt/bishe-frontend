<template>
  <div class="topic-trends-wrapper">
    <div class="trend-card">
      <h3 class="card-title font-main"><span class="icon">🔥</span> 热门话题</h3>

      <div v-if="isLoading" class="loading-text font-tech">加载中...</div>

      <ul v-else class="trend-list">
        <li v-for="(topic, index) in topics" :key="topic.id" class="trend-item">
          <span class="rank font-tech" :class="`rank-${index + 1}`">
            {{ index + 1 }}
          </span>
          <div class="topic-info">
            <span class="topic-name">#{{ topic.name }}#</span>
            <span class="post-count font-tech">{{ topic.post_count }} 讨论</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="trend-card alert-card">
      <h3 class="card-title font-main"><span class="icon">📡</span> 实时情绪雷达</h3>

      <div v-if="latestAlert" class="alert-content is-danger">
        <div class="alert-header">
          <span class="alert-type font-tech">[{{ latestAlert.emotion_type }}] 波动异常</span>
        </div>
        <div class="alert-desc font-main">
          话题 <span class="highlight">#{{ latestAlert.topic }}#</span> 出现高频负面情绪，Z-score
          逼近阈值。
        </div>
      </div>

      <div v-else class="alert-content is-safe">
        <span class="safe-icon">✓</span> 全网情绪平稳，未触发预警
      </div>
    </div>

    <div class="sidebar-footer font-tech">
      Symplatt 舆情监测系统 v1.0 <br />
      基于多任务深度学习驱动
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, onMounted } from 'vue'

  // 4. 项目内配置 / 常量
  const MAX_TOPICS = 5

  // --- ref / reactive（状态） ---
  const topics = ref<any[]>([])
  const isLoading = ref(true)
  const latestAlert = ref<any>(null)

  // --- 普通函数（事件 / 工具） ---
  const fetchSidebarData = async () => {
    isLoading.value = true
    try {
      // TODO: 替换为真实的 axios 请求
      // const res = await request.get('/topics/trending', { params: { limit: MAX_TOPICS } })
      // topics.value = res.data

      // 模拟网络请求延迟与数据
      await new Promise((resolve) => setTimeout(resolve, 600))

      topics.value = [
        { id: 1, name: '毕业设计', post_count: 342 },
        { id: 2, name: 'NLP模型', post_count: 215 },
        { id: 3, name: 'GPU显存', post_count: 189 },
        { id: 4, name: '考研复试', post_count: 120 },
        { id: 5, name: '前端Vue3', post_count: 98 },
      ]

      // 模拟拉取最新一条预警信息
      latestAlert.value = {
        emotion_type: 'Fear',
        topic: '考研复试',
      }
    } catch (error) {
      console.error('获取侧边栏数据失败', error)
    } finally {
      isLoading.value = false
    }
  }

  // --- 生命周期钩子 ---
  onMounted(() => {
    fetchSidebarData()
  })
</script>

<style scoped>
  /* 侧边栏整体容器，组件内部不写外边距 */
  .topic-trends-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    /* position: sticky;  如果想让右侧边栏在页面滚动时悬浮，可以取消注释这两行 */

    /* top: calc(var(--header-height) + 24px); */
  }

  /* 统一的卡片样式 */
  .trend-card {
    box-sizing: border-box;
    padding: 16px 20px;
    background-color: #15161a;
    border: 1px solid #2a2b32;
    border-radius: 8px;
  }

  .card-title {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    font-size: 16px;
    color: #e0e0e0;
  }

  .loading-text {
    padding: 20px 0;
    font-size: 14px;
    color: #666;
    text-align: center;
  }

  /* 话题列表 */
  .trend-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .trend-item {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  /* 排名序号样式 */
  .rank {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    text-align: center;
  }

  .rank-1 {
    color: #ffd700;
    text-shadow: 0 0 8px rgb(255 215 0 / 40%);
  } /* 金 */
  .rank-2 {
    color: #c0c0c0;
    text-shadow: 0 0 8px rgb(192 192 192 / 40%);
  } /* 银 */
  .rank-3 {
    color: #cd7f32;
    text-shadow: 0 0 8px rgb(205 127 50 / 40%);
  } /* 铜 */

  .topic-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .topic-name {
    font-size: 15px;
    font-weight: 500;
    color: #dcdcdc;
    cursor: pointer;
    transition: color 0.2s;
  }

  .topic-name:hover {
    color: #42b983;
  }

  .post-count {
    font-size: 12px;
    color: #888;
  }

  /* 情绪雷达卡片专属样式 */
  .alert-card {
    background: linear-gradient(180deg, #15161a 0%, #1a1515 100%);
  }

  .alert-content {
    padding: 12px;
    font-size: 13px;
    line-height: 1.5;
    border-radius: 6px;
  }

  .alert-content.is-danger {
    background: rgb(244 67 54 / 8%);
    border-left: 3px solid #f44336;
  }

  .alert-header {
    margin-bottom: 6px;
  }

  .alert-type {
    font-weight: bold;
    color: #f44336;
  }

  .alert-desc {
    color: #ccc;
  }

  .highlight {
    font-weight: bold;
    color: #fff;
  }

  .alert-content.is-safe {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #4caf50;
    background: rgb(76 175 80 / 8%);
    border-left: 3px solid #4caf50;
  }

  /* 底部版权与版本信息 */
  .sidebar-footer {
    font-size: 12px;
    line-height: 1.6;
    color: #555;
    text-align: center;
  }
</style>
