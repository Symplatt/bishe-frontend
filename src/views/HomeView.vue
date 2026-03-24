<template>
  <div class="home-view">
    <div class="page-container">
      <div class="home-layout">
        <main class="feed-section">
          <PostEditor @published="fetchPosts" />

          <div class="post-list" v-if="!isLoading">
            <PostCard v-for="post in posts" :key="post.id" :post="post" @refresh="fetchPosts" />
          </div>

          <div v-else class="loading-state font-tech">Loading Feed...</div>
        </main>

        <aside class="sidebar-section">
          <TopicTrends />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, onMounted } from 'vue'

  // 2. Vue 官方生态
  // import { useRouter } from 'vue-router'

  // 3. 第三方库 (如果有，比如 dayjs 处理相对时间)
  // import dayjs from 'dayjs'

  // 4. 项目内配置 / 常量
  const PAGE_SIZE = 20

  // 5. 项目内工具函数
  // import { resolvePath } from '@/utils/assets'

  // 6. 类型定义（type-only，TS）
  // 假设未来在 src/types/post.model.ts 中定义
  // import type { Post } from '@/types/post.model'

  // 7. 静态数据 / JSON
  // import defaultMock from '@/assets/data/mock.json'

  // 8. 子组件 (严格遵循组件化原则)
  import PostEditor from '@/components/home/PostEditor.vue'
  import PostCard from '@/components/home/PostCard.vue'
  import TopicTrends from '@/components/home/TopicTrends.vue'

  // --- ref / reactive（状态） ---
  const posts = ref<any[]>([]) // 暂定 any[]，后续对接后端 Pydantic Schema
  const isLoading = ref(true)

  // --- 普通函数（事件 / 工具） ---
  const fetchPosts = async () => {
    isLoading.value = true
    try {
      // TODO: 替换为真实的 axios 请求，对接 FastAPI 后端
      // const res = await request.get('/posts', { params: { limit: PAGE_SIZE } })
      // posts.value = res.data

      // 模拟数据延迟加载
      setTimeout(() => {
        posts.value = [
          {
            id: 1,
            content: '深度学习模型终于训练完了！#NLP# #毕业设计#',
            likes_count: 42,
            emotion_type: 'Happiness',
            emotion_intensity: 5,
          },
          {
            id: 2,
            content: '服务器又显存溢出了 (OOM)，心态崩了...',
            likes_count: 12,
            emotion_type: 'Sadness',
            emotion_intensity: 4,
          },
        ]
        isLoading.value = false
      }, 600)
    } catch (error) {
      console.error('获取帖子失败:', error)
      isLoading.value = false
    }
  }

  // --- 生命周期钩子 ---
  onMounted(() => {
    fetchPosts()
  })
</script>

<style scoped>
  /* --- 业务容器特有样式 --- */
  .home-view {
    min-height: calc(100vh - var(--header-height));
    padding-top: 24px;
    padding-bottom: 40px;
    color: #fff;
    background-color: #0b0c10; /* 适配你规范中的深色底色 */
  }

  /* --- 页面内网格布局 --- */
  .home-layout {
    display: grid;

    /* 左侧自适应填满，右侧固定 320px */
    grid-template-columns: 1fr 320px;
    gap: 24px;
    align-items: start; /* 防止右侧侧边栏被拉伸到和左侧一样高 */
  }

  /* 核心信息流区域 */
  .feed-section {
    display: flex;
    flex-direction: column;
    gap: 20px; /* 组件之间不写 margin，由父容器的 gap 统一控制 */
  }

  /* 加载动画占位 */
  .loading-state {
    padding: 60px 0;
    color: rgb(255 255 255 / 50%);
    text-align: center;
    letter-spacing: 1px;
  }

  /* --- 响应式适配 (移动端优先变为单栏) --- */
  @media (width <= 860px) {
    .home-layout {
      grid-template-columns: 1fr;
    }

    .sidebar-section {
      display: none; /* 屏幕较小时隐藏右侧话题栏，或者用抽屉组件代替 */
    }
  }
</style>
