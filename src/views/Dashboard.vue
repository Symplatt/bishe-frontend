<template>
  <div class="dashboard-view">
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1 class="title font-deco">舆情态势感知大屏</h1>

        <div class="controls font-tech">
          <button
            class="time-btn"
            :class="{ active: timeRange === '24h' }"
            @click="timeRange = '24h'"
          >
            近 24 小时
          </button>
          <button
            class="time-btn"
            :class="{ active: timeRange === '7d' }"
            @click="timeRange = '7d'"
          >
            近 7 天
          </button>
        </div>
      </header>

      <div class="dashboard-grid">
        <section class="panel topic-panel">
          <h2 class="panel-title font-main">🔥 热门话题聚合</h2>
          <div class="panel-content">
            <ul class="topic-list">
              <li v-for="(topic, index) in topTopics" :key="topic.name" class="topic-item">
                <span class="rank" :class="`rank-${index + 1}`">{{ index + 1 }}</span>
                <span class="topic-name">#{{ topic.name }}#</span>
                <span class="post-count font-tech">{{ topic.count }} 贴</span>
              </li>
            </ul>
          </div>
        </section>

        <section class="panel emotion-panel">
          <h2 class="panel-title font-main">📊 全网情绪分布</h2>
          <div class="panel-content emotion-distribution">
            <div v-for="emo in emotionStats" :key="emo.type" class="emotion-bar-wrapper">
              <div class="emotion-label">
                <span>{{ emo.type }}</span>
                <span class="font-tech">{{ emo.percent }}%</span>
              </div>
              <div class="progress-bg">
                <div
                  class="progress-fill"
                  :class="`fill-${emo.type.toLowerCase()}`"
                  :style="{ width: `${emo.percent}%` }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <section class="panel alert-panel">
          <h2 class="panel-title font-main">⚠️ Z-score 异常预警</h2>
          <div class="panel-content">
            <div class="alert-status" :class="{ 'is-danger': activeAlerts.length > 0 }">
              系统状态: {{ activeAlerts.length > 0 ? '检测到高危负面情绪' : '平稳运行中' }}
            </div>

            <ul class="alert-list">
              <li v-for="alert in activeAlerts" :key="alert.id" class="alert-item">
                <div class="alert-header">
                  <span class="alert-type">[{{ alert.emotion_type }}] 突增</span>
                  <span class="alert-time font-tech">{{ alert.time }}</span>
                </div>
                <div class="alert-detail">
                  话题 <span class="highlight">#{{ alert.topic }}#</span> 当前频次触发 Z-score ({{
                    alert.z_score
                  }}
                  > 1.96阈值)
                </div>
              </li>
              <li v-if="activeAlerts.length === 0" class="no-alert">
                过去 {{ timeRange }} 内未触发预警
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, watch, onMounted } from 'vue'

  // 4. 项目内配置 / 常量
  const Z_SCORE_THRESHOLD = 1.96

  // --- ref / reactive（状态） ---
  const timeRange = ref<'24h' | '7d'>('24h')

  // 模拟的后端聚合数据
  const topTopics = ref([
    { name: '毕业设计', count: 1240 },
    { name: 'NLP模型', count: 856 },
    { name: 'GPU显存', count: 642 },
    { name: '考研复试', count: 512 },
  ])

  const emotionStats = ref([
    { type: 'Happiness', percent: 35 },
    { type: 'Sadness', percent: 20 },
    { type: 'Anger', percent: 15 },
    { type: 'Fear', percent: 12 },
    { type: 'Surprise', percent: 10 },
    { type: 'Disgust', percent: 8 },
  ])

  const activeAlerts = ref([
    { id: 1, emotion_type: 'Anger', topic: 'GPU显存', z_score: 2.34, time: '10:42:15' },
    { id: 2, emotion_type: 'Fear', topic: '考研复试', z_score: 2.01, time: '09:15:00' },
  ])

  // --- 普通函数（事件 / 工具） ---
  const fetchDashboardData = async () => {
    // TODO: 对接后端 /api/dashboard 接口
    // const res = await request.get('/dashboard/stats', { params: { range: timeRange.value } })
    console.log(`正在获取 ${timeRange.value} 的大屏数据...`)
    // 将后端返回的数据赋给 topTopics.value, emotionStats.value 等
  }

  // --- watch（副作用） ---
  // 监听时间范围切换，重新获取数据
  watch(timeRange, () => {
    fetchDashboardData()
  })

  // --- 生命周期钩子 ---
  onMounted(() => {
    fetchDashboardData()
  })
</script>

<style scoped>
  /* --- 业务容器 --- */
  .dashboard-view {
    min-height: calc(100vh - var(--header-height));
    padding: 20px 0;
    color: #fff;
    background-color: #050608; /* 大屏底色更深，突出科技感 */
  }

  /* --- 结构容器 --- */
  .dashboard-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1600px; /* 大屏一般用更宽的容器 */
    padding: 0 40px;
    margin: 0 auto;
  }

  /* --- 头部 --- */
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .title {
    font-size: 2rem;
    color: #e0e0e0;
    text-shadow: 0 0 10px rgb(66 185 131 / 30%);
  }

  .controls {
    display: flex;
    gap: 12px;
  }

  .time-btn {
    padding: 6px 16px;
    color: #888;
    cursor: pointer;
    background: transparent;
    border: 1px solid #2a2b32;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .time-btn.active,
  .time-btn:hover {
    color: #42b983;
    background: rgb(66 185 131 / 10%);
    border-color: #42b983;
  }

  /* --- 网格布局 --- */
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr; /* 中间情感图表稍微宽一点 */
    gap: 24px;
  }

  /* --- 统一面板样式 --- */
  .panel {
    padding: 20px;
    background: #0f1015;
    border: 1px solid #1f2029;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgb(0 0 0 / 30%);
  }

  .panel-title {
    padding-bottom: 12px;
    margin-bottom: 16px;
    font-size: 1.1rem;
    color: #ccc;
    border-bottom: 1px solid #1f2029;
  }

  /* --- 话题排行 --- */
  .topic-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    list-style: none;
  }

  .topic-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    background: #15161a;
    border-radius: 6px;
  }

  .rank {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    font-size: 12px;
    font-weight: bold;
    line-height: 24px;
    color: #888;
    text-align: center;
    background: #2a2b32;
    border-radius: 4px;
  }

  .rank-1 {
    color: #000;
    background: #ffd700;
  }

  .rank-2 {
    color: #000;
    background: #c0c0c0;
  }

  .rank-3 {
    color: #000;
    background: #cd7f32;
  }

  .topic-name {
    flex: 1;
    color: #e0e0e0;
  }

  .post-count {
    font-size: 14px;
    color: #42b983;
  }

  /* --- 情绪分布模拟 --- */
  .emotion-distribution {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .emotion-bar-wrapper {
    width: 100%;
  }

  .emotion-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
    color: #aaa;
  }

  .progress-bg {
    width: 100%;
    height: 8px;
    overflow: hidden;
    background: #1f2029;
    border-radius: 4px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease-out;
  }

  /* 对应卡片的情绪颜色 */
  .fill-happiness {
    background: #4caf50;
  }

  .fill-sadness {
    background: #2196f3;
  }

  .fill-anger {
    background: #f44336;
  }

  .fill-fear {
    background: #607d8b;
  }

  .fill-surprise {
    background: #ff9800;
  }

  .fill-disgust {
    background: #9c27b0;
  }

  /* --- 预警雷达 --- */
  .alert-status {
    padding: 10px;
    margin-bottom: 16px;
    font-weight: bold;
    color: #4caf50;
    text-align: center;
    background: rgb(76 175 80 / 10%);
    border-radius: 4px;
  }

  .alert-status.is-danger {
    color: #f44336;
    background: rgb(244 67 54 / 10%);
    border: 1px solid rgb(244 67 54 / 30%);
  }

  .alert-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    list-style: none;
  }

  .alert-item {
    padding: 12px;
    background: #15161a;
    border-left: 3px solid #f44336;
    border-radius: 0 4px 4px 0;
  }

  .alert-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .alert-type {
    font-size: 13px;
    font-weight: bold;
    color: #f44336;
  }

  .alert-time {
    font-size: 12px;
    color: #888;
  }

  .alert-detail {
    font-size: 13px;
    line-height: 1.5;
    color: #ccc;
  }

  .highlight {
    font-weight: bold;
    color: #fff;
  }

  .no-alert {
    padding: 20px 0;
    color: #666;
    text-align: center;
  }

  /* 响应式断点 */
  @media (width <= 1024px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
