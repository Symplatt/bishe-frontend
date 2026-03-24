<template>
  <div class="post-card-container">
    <div class="card-header">
      <div class="user-info">
        <div class="avatar-placeholder"></div>
        <span class="username">User_{{ post.id }}</span>
        <span class="post-time font-tech">刚刚</span>
      </div>

      <div v-if="post.emotion_type" class="emotion-badge" :class="emotionClass">
        {{ post.emotion_type }} · 强度 {{ post.emotion_intensity }}
      </div>
    </div>

    <div class="card-body">
      {{ post.content }}
    </div>

    <div class="card-actions">
      <button
        class="action-btn"
        :class="{ 'is-liked': isLiked }"
        @click="handleLikeToggle"
        :disabled="isLiking"
      >
        <span class="icon">♥</span>
        {{ post.likes_count || 0 }}
      </button>

      <button class="action-btn" @click="toggleCommentArea">
        <span class="icon">💬</span> 评论
      </button>
    </div>

    <div v-if="showComments" class="comments-section">
      <div class="comment-input-area">
        <input
          v-model="commentText"
          class="comment-input"
          placeholder="写下你的评论 (限200字，后端将融合贴文上下文分析语境)..."
          :maxlength="200"
          @keyup.enter="submitComment"
        />
        <button
          class="btn-send"
          :disabled="!commentText.trim() || isCommenting"
          @click="submitComment"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, computed } from 'vue'

  // 定义 props
  const props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  })

  // 定义 emits
  const emit = defineEmits(['refresh'])

  // --- ref / reactive（状态） ---
  const isLiked = ref(false) // 实际业务中应从后端数据 props.post.has_liked 读取
  const isLiking = ref(false)
  const showComments = ref(false)
  const commentText = ref('')
  const isCommenting = ref(false)

  // --- computed（派生状态） ---
  // 根据 NLP 情绪类型动态绑定 CSS 类，实现颜色区分
  const emotionClass = computed(() => {
    const type = props.post.emotion_type
    const typeMap: Record<string, string> = {
      Happiness: 'emotion-happy',
      Sadness: 'emotion-sad',
      Anger: 'emotion-anger',
      Disgust: 'emotion-disgust',
      Surprise: 'emotion-surprise',
      Fear: 'emotion-fear',
    }
    return typeMap[type] || 'emotion-neutral'
  })

  // --- 普通函数（事件 / 工具） ---
  // 点赞 Toggle 机制
  const handleLikeToggle = async () => {
    isLiking.value = true
    try {
      // TODO: 对接 FastAPI 后端统一的 Toggle 接口
      // await request.post(`/posts/${props.post.id}/like`)

      // 模拟前端乐观更新（不等待请求结果，直接改变 UI，提升体验）
      isLiked.value = !isLiked.value
      if (isLiked.value) {
        props.post.likes_count++
      } else {
        props.post.likes_count--
      }
    } catch (error) {
      console.error('操作失败', error)
    } finally {
      isLiking.value = false
    }
  }

  // 展开/收起评论区
  const toggleCommentArea = () => {
    showComments.value = !showComments.value
    if (showComments.value) {
      // TODO: 展开时请求该帖子的扁平化评论列表
      // await request.get(`/posts/${props.post.id}/comments`)
    }
  }

  // 提交评论
  const submitComment = async () => {
    if (!commentText.value.trim()) return

    isCommenting.value = true
    try {
      // TODO: 对接后端评论接口
      // 你提到的核心亮点：后端会将此内容与原贴文拼接：[CLS] 贴文上下文 [SEP] 评论内容 [SEP]
      /*
    await request.post('/comments', {
      post_id: props.post.id,
      content: commentText.value
    })
    */

      // 模拟成功
      await new Promise((resolve) => setTimeout(resolve, 300))
      commentText.value = ''
      // emit('refresh') // 可选：通知父组件刷新以获取最新评论
    } catch (error) {
      console.error('评论失败', error)
    } finally {
      isCommenting.value = false
    }
  }
</script>

<style scoped>
  /* 最外层无上下 margin，结构紧凑 */
  .post-card-container {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    background-color: #15161a;
    border: 1px solid #2a2b32;
    border-radius: 8px;
    transition: background-color 0.2s;
  }

  .post-card-container:hover {
    background-color: #1a1b20;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .user-info {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .avatar-placeholder {
    width: 40px;
    height: 40px;
    background-color: #2a2b32;
    border-radius: 50%;
  }

  .username {
    font-size: 15px;
    font-weight: bold;
    color: #e0e0e0;
  }

  .post-time {
    font-size: 13px;
    color: #666;
  }

  /* 情绪感知标签基础样式 */
  .emotion-badge {
    padding: 4px 10px;
    font-family: var(--font-sans, inherit);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 4px;
  }

  /* 六类情绪的专属颜色配置，UI 层面的数据可视化 */
  .emotion-happy {
    color: #4caf50;
    background: rgb(76 175 80 / 15%);
    border: 1px solid rgb(76 175 80 / 30%);
  }

  .emotion-sad {
    color: #2196f3;
    background: rgb(33 150 243 / 15%);
    border: 1px solid rgb(33 150 243 / 30%);
  }

  .emotion-anger {
    color: #f44336;
    background: rgb(244 67 54 / 15%);
    border: 1px solid rgb(244 67 54 / 30%);
  }

  .emotion-disgust {
    color: #9c27b0;
    background: rgb(156 39 176 / 15%);
    border: 1px solid rgb(156 39 176 / 30%);
  }

  .emotion-surprise {
    color: #ff9800;
    background: rgb(255 152 0 / 15%);
    border: 1px solid rgb(255 152 0 / 30%);
  }

  .emotion-fear {
    color: #607d8b;
    background: rgb(96 125 139 / 15%);
    border: 1px solid rgb(96 125 139 / 30%);
  }

  .emotion-neutral {
    color: #9e9e9e;
    background: rgb(158 158 158 / 15%);
    border: 1px solid rgb(158 158 158 / 30%);
  }

  .card-body {
    margin-bottom: 20px;
    font-family: var(--font-main, inherit);
    font-size: 16px;
    line-height: 1.6;
    color: #dcdcdc;
    word-break: break-all;
    white-space: pre-wrap;
  }

  .card-actions {
    display: flex;
    gap: 24px;
    padding-top: 16px;
    border-top: 1px solid #2a2b32;
  }

  .action-btn {
    display: flex;
    gap: 6px;
    align-items: center;
    font-family: var(--font-sans, inherit);
    font-size: 14px;
    color: #888;
    cursor: pointer;
    background: transparent;
    border: none;
    transition: color 0.2s;
  }

  .action-btn:hover {
    color: #e0e0e0;
  }

  .action-btn.is-liked {
    color: #f44336; /* 点赞后变红 */
  }

  .action-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 评论区样式 */
  .comments-section {
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px dashed #2a2b32;
  }

  .comment-input-area {
    display: flex;
    gap: 12px;
  }

  .comment-input {
    flex: 1;
    padding: 8px 12px;
    font-family: var(--font-main, inherit);
    font-size: 14px;
    color: #fff;
    outline: none;
    background: #0b0c10;
    border: 1px solid #2a2b32;
    border-radius: 4px;
    transition: border-color 0.2s;
  }

  .comment-input:focus {
    border-color: #42b983;
  }

  .btn-send {
    padding: 0 16px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    background: #42b983;
    border: none;
    border-radius: 4px;
  }

  .btn-send:disabled {
    color: #666;
    cursor: not-allowed;
    background: #2a2b32;
  }
</style>
