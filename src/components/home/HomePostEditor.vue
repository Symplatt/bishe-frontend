<template>
  <div class="post-editor-container">
    <div class="input-wrapper">
      <textarea
        v-model="content"
        class="editor-textarea font-sans"
        placeholder="有什么新鲜事？支持使用 #话题# 标签来参与讨论..."
        :maxlength="MAX_CHARS"
      ></textarea>
    </div>

    <div class="editor-footer">
      <div class="topics-preview">
        <span v-if="extractedTopics.length > 0" class="topic-label font-tech">识别标签:</span>
        <span v-for="topic in extractedTopics" :key="topic" class="topic-tag font-sans">
          #{{ topic }}#
        </span>
      </div>

      <div class="action-area">
        <span class="char-counter font-tech" :class="{ 'is-limit': content.length >= MAX_CHARS }">
          {{ content.length }} / {{ MAX_CHARS }}
        </span>

        <button
          class="btn-publish font-sans"
          :disabled="!isValid || isSubmitting"
          @click="handlePublish"
        >
          {{ isSubmitting ? '系统处理中...' : '发布态势' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const MAX_CHARS = 300
  const emit = defineEmits(['published'])

  const content = ref('')
  const isSubmitting = ref(false)

  // 自动提取 #话题#，支持多个，去重
  const extractedTopics = computed(() => {
    const regex = /#([^#\s]+)#/g
    const matches: string[] = []
    let match
    while ((match = regex.exec(content.value)) !== null) {
      if (!matches.includes(match[1]!)) {
        matches.push(match[1]!)
      }
    }
    return matches
  })

  const isValid = computed(() => {
    return content.value.trim().length > 0 && content.value.length <= MAX_CHARS
  })

  const handlePublish = async () => {
    if (!isValid.value) return
    isSubmitting.value = true

    try {
      // 模拟后端网络请求延迟
      await new Promise((resolve) => setTimeout(resolve, 600))
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
  .post-editor-container {
    width: 100%;
    padding: 16px 20px;
    background-color: var(--color-bg-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .input-wrapper {
    width: 100%;
  }

  .editor-textarea {
    width: 100%;
    min-height: 80px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-main);
    resize: vertical;
    outline: none;
    background: transparent;
    border: none;
  }

  .editor-textarea::placeholder {
    color: var(--color-text-muted);
  }

  .editor-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: 8px;
    border-top: 1px dashed var(--color-border);
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
    color: var(--color-text-muted);
  }

  .topic-tag {
    padding: 4px 10px;
    font-size: 13px;
    color: var(--color-primary);
    background: rgb(6 182 212 / 10%); /* 青色透明底 */
    border: 1px solid rgb(6 182 212 / 20%);
    border-radius: 14px;
  }

  .action-area {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-left: 16px;
  }

  .char-counter {
    font-size: 14px;
    color: var(--color-text-muted);
  }

  .char-counter.is-limit {
    color: #ef4444; /* 红色警告 */
  }

  .btn-publish {
    padding: 8px 24px;
    font-weight: bold;
    color: var(--color-bg-base);
    cursor: pointer;
    background-color: var(--color-primary);
    border: none;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .btn-publish:disabled {
    color: var(--color-text-muted);
    cursor: not-allowed;
    background-color: var(--color-border);
  }

  .btn-publish:not(:disabled):hover {
    background-color: #0891b2; /* 深青色 */
    transform: translateY(-1px);
  }
</style>
