<template>
  <div class="following-bar-container">
    <div class="user-item">
      <div class="avatar-ring is-all">
        <div class="avatar-inner">
          <span class="icon">👥</span>
        </div>
      </div>
      <span class="username font-sans">全部AAAAAAAAAAA关注</span>
    </div>

    <div v-for="user in followingUsers" :key="user.id" class="user-item">
      <div class="avatar-ring" :class="{ 'has-update': user.has_new_update }">
        <img v-if="user.avatar" :src="user.avatar" alt="avatar" class="avatar-img" />
        <div v-else class="avatar-placeholder font-tech">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
      </div>
      <span class="username font-sans" :class="{ 'text-muted': !user.has_new_update }">
        {{ user.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // 模拟数据：包含了有新动态和无新动态的用户
  const followingUsers = ref([
    { id: 1, name: '极客先锋', avatar: '', has_new_update: true },
    { id: 2, name: '数据挖掘机', avatar: '', has_new_update: true },
    { id: 3, name: 'NLP研究员', avatar: '', has_new_update: true },
    { id: 4, name: '咸鱼王', avatar: '', has_new_update: false },
    { id: 5, name: '摸鱼达人', avatar: '', has_new_update: false },
    { id: 6, name: '测试账号A', avatar: '', has_new_update: false },
    { id: 7, name: '测试账号B', avatar: '', has_new_update: false },
  ])
</script>

<style scoped>
  /* 容器：横向滚动，隐藏原生滚动条 */
  .following-bar-container {
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100%;
    padding: 16px;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    background-color: var(--color-bg-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .following-bar-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .user-item {
    display: flex;
    flex-shrink: 0; /* 防止被挤压 */
    flex-direction: column;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .user-item:hover {
    transform: translateY(-2px);
  }

  /* 头像光圈设计 */
  .avatar-ring {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    padding: 2px;
    border: 2px solid var(--color-border); /* 默认灰色边框 */
    border-radius: 50%;
  }

  /* 有新动态的专属高亮边框 */
  .avatar-ring.has-update {
    border-color: var(--color-primary);
  }

  .avatar-ring.is-all {
    border: 2px dashed var(--color-text-muted);
  }

  /* 内部头像占位 */
  .avatar-inner,
  .avatar-placeholder,
  .avatar-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-main);
    object-fit: cover;
    background-color: var(--color-bg-base);
    border-radius: 50%;
  }

  .avatar-placeholder {
    font-size: 20px;
    background: linear-gradient(135deg, #1f2029, #2a2b32);
  }

  .username {
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    color: var(--color-text-main);
    text-align: center;
    white-space: nowrap;
  }

  .username.text-muted {
    color: var(--color-text-muted);
  }
</style>
