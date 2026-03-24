<template>
  <div class="home-view">
    <div class="page-container home-layout">
      <main class="feed-section">
        <HomePostEditor @published="onPostPublished" />

        <div class="placeholder-box vertical-large">
          <HomePostList />
        </div>
      </main>

      <aside class="sidebar-section">
        <HomeTopicTrends />

        <HomeFollowingList />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  // 引入组件
  import HomeAnnouncements from '@/components/home/HomeAnnouncements.vue'
  import HomeFollowingBar from '@/components/home/HomeFollowingBar.vue'
  import HomePostList from '@/components/home/HomePostList.vue'
  import HomePostEditor from '@/components/home/HomePostEditor.vue'
  import HomeTopicTrends from '@/components/home/HomeTopicTrends.vue'
  import HomeFollowingList from '@/components/home/HomeFollowingList.vue'

  // 模拟发帖成功后的刷新逻辑
  const onPostPublished = () => {
    console.log('检测到新发帖，准备刷新信息流...')
    // TODO: 调用子组件的刷新方法或重新拉取数据
  }
</script>

<style scoped>
  .home-view {
    min-height: 100vh;
  }

  .home-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    align-items: start;
    padding-top: 24px;
    padding-bottom: 40px;
  }

  .feed-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sidebar-section {
    position: sticky;
    top: calc(var(--header-height) + 24px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* 占位符样式 (下一批替换后删除) */
  .placeholder-box {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-tech);
    color: var(--color-primary);
    background: var(--color-bg-panel);
    border: 1px dashed var(--color-border);
    border-radius: 8px;
  }

  .placeholder-box.vertical-large {
    flex-direction: column;
    gap: 16px;
    height: auto;
    min-height: 400px;
    padding: 20px;
  }

  .sort-label {
    align-self: flex-start;
    padding-bottom: 4px;
    font-weight: bold;
    color: var(--color-text-main);
    border-bottom: 2px solid var(--color-primary);
  }

  .post-item {
    width: 100%;
    padding: 20px;
    text-align: center;
    background: rgb(255 255 255 / 5%);
    border-radius: 6px;
  }

  .note {
    margin-top: 20px;
    font-size: 12px;
    opacity: 0.6;
  }

  @media (width <= 992px) {
    .home-layout {
      grid-template-columns: 1fr;
    }

    .sidebar-section {
      position: static;
    }
  }
</style>
