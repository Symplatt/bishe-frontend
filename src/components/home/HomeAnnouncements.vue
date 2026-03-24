<template>
  <div class="announcements-container">
    <div class="icon-wrapper">
      <span class="icon">🔔</span>
    </div>
    <div class="content">
      <div class="title font-sans">更新内容</div>
      <div class="desc font-tech">V1.0.1: NLP 情感分析模型已部署完毕。</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 这里属于纯展示组件
</script>

<style scoped>
  .announcements-container {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px;
    background: linear-gradient(135deg, var(--color-bg-panel), #1e1b2e); /* 微微带点紫色渐变 */
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--color-secondary); /* 左侧高亮边框 */
    border-radius: 8px;
  }

  .icon-wrapper {
    font-size: 20px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    color: var(--color-text-main);
  }

  .desc {
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>
