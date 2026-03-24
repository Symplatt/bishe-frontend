<template>
  <div class="post-card">
    <div class="card-header">
      <div class="author-info">
        <div class="avatar-placeholder font-tech">
          {{ post.author.username.charAt(0).toUpperCase() }}
        </div>
        <div class="meta">
          <span class="username font-sans">{{ post.author.username }}</span>
          <span class="time font-tech">{{ post.created_time }}</span>
        </div>
      </div>

      <div
        v-if="isAdmin && post.emotion_category"
        class="emotion-badge font-sans"
        :class="`emo-${post.emotion_category.toLowerCase()}`"
      >
        <span class="emo-text">{{ translateEmotion(post.emotion_category) }}</span>
        <span class="emo-level font-tech">LV.{{ post.emotion_intensity }}</span>
      </div>
    </div>

    <div class="card-body font-main">
      {{ post.content }}
    </div>

    <div class="card-footer font-sans">
      <button class="action-btn"><span class="icon">🤍</span> {{ post.like_count }}</button>
      <button class="action-btn"><span class="icon">💬</span> {{ post.comment_count }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  defineProps({
    post: {
      type: Object,
      required: true,
    },
  })

  // --- 权限状态 ---
  const isAdmin = ref(false)

  // --- 生命周期钩子 ---
  onMounted(() => {
    // 从登录时存入的 localStorage 中读取用户信息
    try {
      const userInfoStr = localStorage.getItem('user_info')
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr)
        // 如果 is_admin 为 true，则开放情绪标签的可见权
        isAdmin.value = !!userInfo.is_admin
      }
    } catch (error) {
      console.error('解析用户信息失败', error)
    }
  })

  // --- 工具函数 ---
  // 将英文情绪常量翻译为前端展示的中文
  const translateEmotion = (category: string) => {
    const map: Record<string, string> = {
      Happiness: '愉悦',
      Sadness: '悲伤',
      Anger: '愤怒',
      Fear: '恐惧',
      Disgust: '厌恶',
      Surprise: '惊讶',
    }
    return map[category] || '中性'
  }
</script>

<style scoped>
  .post-card {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: var(--color-bg-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    transition:
      background-color 0.2s,
      border-color 0.2s;
  }

  .post-card:hover {
    background-color: var(--color-bg-panel-hover);
    border-color: #3a3b45;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .author-info {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 16px;
    color: var(--color-text-main);
    background: linear-gradient(135deg, #1f2029, #2a2b32);
    border-radius: 50%;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .username {
    font-size: 15px;
    font-weight: bold;
    color: var(--color-text-main);
  }

  .time {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  /* --- 情绪徽章样式 --- */
  .emotion-badge {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  .emo-level {
    font-size: 11px;
    opacity: 0.8;
  }

  /* 愉悦 (绿) */
  .emo-happiness {
    color: #4ade80;
    background: rgb(74 222 128 / 10%);
    border: 1px solid rgb(74 222 128 / 20%);
  }

  /* 悲伤 (蓝) */
  .emo-sadness {
    color: #60a5fa;
    background: rgb(96 165 250 / 10%);
    border: 1px solid rgb(96 165 250 / 20%);
  }

  /* 愤怒 (红) */
  .emo-anger {
    color: #f87171;
    background: rgb(248 113 113 / 10%);
    border: 1px solid rgb(248 113 113 / 20%);
  }

  /* 恐惧 (紫) */
  .emo-fear {
    color: #c084fc;
    background: rgb(192 132 252 / 10%);
    border: 1px solid rgb(192 132 252 / 20%);
  }

  /* 厌恶 (褐/橙) */
  .emo-disgust {
    color: #fb923c;
    background: rgb(251 146 60 / 10%);
    border: 1px solid rgb(251 146 60 / 20%);
  }

  /* 惊讶 (黄) */
  .emo-surprise {
    color: #facc15;
    background: rgb(250 204 21 / 10%);
    border: 1px solid rgb(250 204 21 / 20%);
  }

  /* --- 贴文主体与底部 --- */
  .card-body {
    margin-bottom: 20px;
    font-size: 15px;
    line-height: 1.6;
    color: #dcdcdc;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .card-footer {
    display: flex;
    gap: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }

  .action-btn {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
    color: var(--color-text-muted);
    cursor: pointer;
    background: transparent;
    border: none;
    transition: color 0.2s;
  }

  .action-btn:hover {
    color: var(--color-text-main);
  }
</style>
