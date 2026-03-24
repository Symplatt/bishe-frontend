<template>
  <div class="following-list-wrapper">
    <h3 class="list-title font-main"><span class="icon">👥</span> 特别关注</h3>

    <div class="list-container">
      <div class="user-item is-all">
        <div class="avatar-ring is-all">
          <div class="avatar-inner">
            <span class="icon">≡</span>
          </div>
        </div>
        <div class="user-info">
          <span class="username font-sans">全部关注</span>
          <span class="user-status font-tech">查看完整列表</span>
        </div>
      </div>

      <div v-for="user in sortedUsers" :key="user.id" class="user-item">
        <div class="avatar-ring" :class="{ 'has-update': user.has_new_update }">
          <img v-if="user.avatar" :src="user.avatar" alt="avatar" class="avatar-img" />
          <div v-else class="avatar-placeholder font-tech">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
        </div>

        <div class="user-info">
          <span class="username font-sans" :class="{ 'text-muted': !user.has_new_update }">
            {{ user.name }}
          </span>
          <span v-if="user.has_new_update" class="user-status highlight font-tech">新动态</span>
          <span v-else class="user-status font-tech">离线</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const followingUsers = ref([
    { id: 1, name: '极客先锋', avatar: '', has_new_update: true },
    { id: 2, name: '数据挖掘机', avatar: '', has_new_update: true },
    { id: 4, name: '咸鱼王', avatar: '', has_new_update: false },
    { id: 3, name: 'NLP研究员', avatar: '', has_new_update: true },
    { id: 5, name: '摸鱼达人', avatar: '', has_new_update: false },
  ])

  // 自动对数据进行排序：有新动态的排在前面
  const sortedUsers = computed(() => {
    return [...followingUsers.value].sort((a, b) => {
      return a.has_new_update === b.has_new_update ? 0 : a.has_new_update ? -1 : 1
    })
  })
</script>

<style scoped>
  .following-list-wrapper {
    box-sizing: border-box;

    /* 如果列表太长，可以在这里开启局部滚动 */
    max-height: 400px;
    padding: 16px 20px;
    overflow-y: auto;
    background-color: var(--color-bg-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  /* 隐藏滚动条让视觉更干净 */
  .following-list-wrapper::-webkit-scrollbar {
    display: none;
  }

  .list-title {
    display: flex;
    gap: 8px;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 16px;
    font-size: 16px;
    color: var(--color-text-main);
    border-bottom: 1px dashed var(--color-border);
  }

  .list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .user-item {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 6px;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .user-item:hover {
    background-color: rgb(255 255 255 / 5%);
  }

  .user-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
  }

  .username {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: var(--color-text-main);
    white-space: nowrap;
  }

  .username.text-muted {
    color: var(--color-text-muted);
  }

  .user-status {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .user-status.highlight {
    color: var(--color-primary);
  }

  /* -------------------
   头像与蓝框光圈设计 
   ------------------- */
  .avatar-ring {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px; /* 侧边栏的头像可以稍微小一点 */
    height: 44px;
    padding: 2px;
    border: 2px solid var(--color-border);
    border-radius: 50%;
  }

  /* 有新动态的专属高亮边框（蓝框/青框） */
  .avatar-ring.has-update {
    border-color: var(--color-primary);
    box-shadow: 0 0 8px rgb(6 182 212 / 40%);
  }

  .avatar-ring.is-all {
    border: 2px dashed var(--color-text-muted);
  }

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
    font-size: 16px;
    background: linear-gradient(135deg, #1f2029, #2a2b32);
  }
</style>
