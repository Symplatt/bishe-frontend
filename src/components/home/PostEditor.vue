<template>
  <div class="post-editor-container">
    <div class="input-wrapper">
      <textarea
        v-model="content"
        class="editor-textarea"
        placeholder="有什么新鲜事？支持使用 #话题# 标签..."
        :maxlength="MAX_CHARS"
      ></textarea>
    </div>

    <div class="editor-footer">
      <div class="topics-preview">
        <span v-if="extractedTopics.length > 0" class="topic-label"> 识别到话题： </span>
        <span v-for="topic in extractedTopics" :key="topic" class="topic-tag"> #{{ topic }}# </span>
      </div>

      <div class="action-area">
        <span class="char-counter font-tech" :class="{ 'is-limit': content.length >= MAX_CHARS }">
          {{ content.length }} / {{ MAX_CHARS }}
        </span>
        <button class="btn-publish" :disabled="!isValid || isSubmitting" @click="handlePublish">
          {{ isSubmitting ? '发布中...' : '发布贴文' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, computed } from 'vue'

  // 4. 项目内配置 / 常量
  const MAX_CHARS = 300

  // 定义向外暴露的事件
  const emit = defineEmits(['published'])

  // --- ref / reactive（状态） ---
  const content = ref('')
  const isSubmitting = ref(false)

  // --- computed（派生状态） ---
  // 自动提取 #话题#，支持多个，且话题内不能有空格和#
  const extractedTopics = computed(() => {
    const regex = /#([^#\s]+)#/g
    const matches: string[] = []
    let match
    while ((match = regex.exec(content.value)) !== null) {
      if (!matches.includes(match[1]!)) {
        matches.push(match[1]!) // 去重
      }
    }
    return matches
  })

  // 校验内容是否合法
  const isValid = computed(() => {
    return content.value.trim().length > 0 && content.value.length <= MAX_CHARS
  })

  // --- 普通函数（事件 / 工具） ---
  const handlePublish = async () => {
    if (!isValid.value) return

    isSubmitting.value = true
    try {
      // TODO: 替换为真实的 axios 请求，对接你的 FastAPI /posts 接口
      /*
    const payload = {
      content: content.value,
      // 后端可以接收前端提炼好的话题列表，或者后端自己再过一遍正则
      topics: extractedTopics.value 
    }
    await request.post('/posts', payload)
    */

      // 模拟网络请求延迟
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 发布成功后清空内容并通知父组件 (HomeView) 刷新列表
      content.value = ''
      emit('published')
    } catch (error) {
      console.error('发布失败:', error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
  /* 严格遵守规范：组件最外层不写 margin，由父容器的 gap 控制 */
  .post-editor-container {
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    background-color: #15161a; /* 比全局底色 #0b0c10 稍微亮一点的卡片色 */
    border: 1px solid #2a2b32;
    border-radius: 8px;
  }

  .input-wrapper {
    width: 100%;
  }

  .editor-textarea {
    width: 100%;
    min-height: 100px;
    font-family: var(--font-main, inherit);
    font-size: 16px;
    line-height: 1.5;
    color: #e0e0e0;
    resize: vertical;
    outline: none;
    background: transparent;
    border: none;
  }

  .editor-textarea::placeholder {
    color: #666;
  }

  .editor-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #2a2b32;
  }

  .topics-preview {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .topic-label {
    font-size: 12px;
    color: #888;
  }

  .topic-tag {
    padding: 2px 8px;
    font-size: 12px;
    color: #42b983;
    background: rgb(66 185 131 / 10%);
    border-radius: 12px;
  }

  .action-area {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-left: 16px;
  }

  .char-counter {
    font-size: 13px;
    color: #888;
  }

  .char-counter.is-limit {
    color: #e74c3c;
  }

  .btn-publish {
    padding: 8px 20px;
    font-family: var(--font-sans, inherit);
    font-weight: 600;
    color: #000;
    cursor: pointer;
    background-color: #42b983;
    border: none;
    border-radius: 20px;
    transition: all 0.2s;
  }

  .btn-publish:disabled {
    color: #666;
    cursor: not-allowed;
    background-color: #2a2b32;
  }

  .btn-publish:not(:disabled):hover {
    background-color: #3aa876;
  }
</style>
