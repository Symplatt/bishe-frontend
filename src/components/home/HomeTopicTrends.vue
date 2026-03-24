<template>
  <div class="topic-trends-wrapper">
    <div class="trend-card">
      <h3 class="card-title font-main"><span class="icon">🔥</span> 热门话题</h3>

      <div v-if="isLoading" class="loading-text font-tech">拉取数据中...</div>

      <ul v-else class="trend-list font-sans">
        <li v-for="(topic, index) in topics" :key="topic.id" class="trend-item">
          <span class="rank font-tech" :class="`rank-${index + 1}`">{{ index + 1 }}</span>
          <div class="topic-info">
            <span class="topic-name">#{{ topic.name }}#</span>
            <span class="post-count font-tech">{{ topic.post_count }} 讨论</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const isLoading = ref(true)
  const topics = ref<any[]>([])

  const fetchSidebarData = async () => {
    isLoading.value = true
    try {
      // 模拟后端请求延迟
      await new Promise((resolve) => setTimeout(resolve, 500))

      topics.value = [
        { id: 1, name: '毕业设计', post_count: 342 },
        { id: 2, name: 'NLP模型', post_count: 215 },
        { id: 3, name: 'GPU显存', post_count: 189 },
        { id: 4, name: '考研复试', post_count: 120 },
        { id: 5, name: '前端Vue3', post_count: 98 },
      ]
    } catch (error) {
      console.error('获取热门话题失败', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchSidebarData()
  })
</script>

<style scoped>
  .topic-trends-wrapper {
    display: flex;
    flex-direction: column;

    /* 因为只剩下一个卡片了，去掉了内部的 gap，保持结构整洁 */
  }

  .trend-card {
    box-sizing: border-box;
    padding: 16px 20px;
    background-color: var(--color-bg-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .card-title {
    display: flex;
    gap: 8px;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 16px;
    font-size: 16px;
    color: var(--color-text-main);
    border-bottom: 1px dashed var(--color-border);
  }

  .loading-text {
    padding: 20px 0;
    font-size: 14px;
    color: var(--color-text-muted);
    text-align: center;
  }

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

  .rank {
    width: 20px;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-text-muted);
    text-align: center;
  }

  .rank-1 {
    color: #ffd700;
    text-shadow: 0 0 8px rgb(255 215 0 / 40%);
  }

  .rank-2 {
    color: #c0c0c0;
    text-shadow: 0 0 8px rgb(192 192 192 / 40%);
  }

  .rank-3 {
    color: #cd7f32;
    text-shadow: 0 0 8px rgb(205 127 50 / 40%);
  }

  .topic-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .topic-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-main);
    cursor: pointer;
    transition: color 0.2s;
  }

  .topic-name:hover {
    color: var(--color-primary);
  }

  .post-count {
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>
