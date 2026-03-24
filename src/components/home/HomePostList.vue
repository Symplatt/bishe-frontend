<template>
  <div class="post-list-wrapper">
    <div class="list-header">
      <div class="sort-tabs font-sans">
        <button class="tab-btn" :class="{ active: sortBy === 'hot' }" @click="sortBy = 'hot'">
          🔥 最热
        </button>
        <button class="tab-btn" :class="{ active: sortBy === 'latest' }" @click="sortBy = 'latest'">
          ✨ 最新
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state font-tech">数据加载中...</div>

    <div v-else class="list-content">
      <HomePostCard v-for="post in posts" :key="post.id" :post="post" />

      <div class="end-message font-tech text-muted">- 已经到底啦 -</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import HomePostCard from './HomePostCard.vue'

  const sortBy = ref<'hot' | 'latest'>('hot')
  const isLoading = ref(true)

  // 模拟后端返回的贴文数据，包含了各种情绪和状态以供展示
  const posts = ref<any[]>([])

  const fetchPosts = async () => {
    isLoading.value = true
    try {
      // 模拟网络请求
      await new Promise((resolve) => setTimeout(resolve, 600))

      posts.value = [
        {
          id: 1,
          content:
            '大厂裁员大军太可怕了，今天又收到一份毁约通知，感觉前途一片暗淡... #大厂裁员大军#',
          author: { username: '深夜emo选手', avatar: '' },
          created_time: '10分钟前',
          like_count: 342,
          comment_count: 89,
          emotion_category: 'Sadness',
          emotion_intensity: 5,
        },
        {
          id: 2,
          content:
            '今天食堂阿姨不仅没抖勺，还多给了我两块红烧肉！感恩的心，感谢有你！🍖 #食堂阿姨抖勺#',
          author: { username: '干饭王', avatar: '' },
          created_time: '半小时前',
          like_count: 156,
          comment_count: 23,
          emotion_category: 'Happiness',
          emotion_intensity: 4,
        },
        {
          id: 3,
          content: '什么破选课系统，一到时间就崩溃，卡了一个小时什么都没选上，退钱！！！',
          author: { username: '暴躁老哥', avatar: '' },
          created_time: '1小时前',
          like_count: 88,
          comment_count: 45,
          emotion_category: 'Anger',
          emotion_intensity: 5,
        },
        {
          id: 4,
          content: '据说今晚会有极光出现？不知道在我们这个纬度能不能看到，有点期待！#天文奇观#',
          author: { username: '星空观测者', avatar: '' },
          created_time: '2小时前',
          like_count: 45,
          comment_count: 12,
          emotion_category: 'Surprise',
          emotion_intensity: 3,
        },
      ]
    } catch (error) {
      console.error('拉取贴文失败', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchPosts()
  })
</script>

<style scoped>
  .post-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .list-header {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
  }

  .sort-tabs {
    display: flex;
    gap: 24px;
  }

  .tab-btn {
    position: relative;
    padding-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-text-muted);
    cursor: pointer;
    background: transparent;
    border: none;
    transition: color 0.2s;
  }

  .tab-btn:hover {
    color: var(--color-text-main);
  }

  .tab-btn.active {
    color: var(--color-primary);
  }

  .tab-btn.active::after {
    position: absolute;
    bottom: -10px; /* 对齐父元素的 border-bottom */
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background-color: var(--color-primary);
  }

  .list-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .loading-state,
  .end-message {
    padding: 40px 0;
    text-align: center;
  }

  .text-muted {
    color: var(--color-text-muted);
  }
</style>
