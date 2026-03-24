<template>
  <header class="the-navbar">
    <div class="page-container navbar-inner">
      <div class="nav-content">
        <img
          v-show="!isLogoError"
          :src="resolvePath('images/logo.png')"
          alt="LOGO"
          class="logo-img"
          @error="onLogoError"
        />
        <div v-show="isLogoError" class="logo-text font-deco">SYMPLATT</div>

        <nav class="main-nav font-sans">
          <RouterLink to="/" class="nav-item" active-class="is-active">首页</RouterLink>
          <RouterLink to="/community" class="nav-item" active-class="is-active">社区</RouterLink>
          <RouterLink to="/messages" class="nav-item" active-class="is-active">信息</RouterLink>
          <RouterLink to="/profile" class="nav-item" active-class="is-active">我的</RouterLink>
          <RouterLink to="/settings" class="nav-item" active-class="is-active">设置</RouterLink>
          <RouterLink to="/about" class="nav-item" active-class="is-active">关于</RouterLink>
        </nav>
      </div>

      <div class="nav-audio">
        <button
          class="audio-btn"
          @click="toggleBgm"
          :title="isPlaying ? '关闭背景音乐' : '播放背景音乐'"
        >
          <Volume2 v-if="isPlaying" class="audio-icon" />
          <VolumeX v-else class="audio-icon is-muted" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref } from 'vue'

  // 3. 第三方库
  import { Volume2, VolumeX } from 'lucide-vue-next'

  // 5. 项目内工具函数
  import { resolvePath } from '@/utils/assets'

  // --- 状态 ---
  const isPlaying = ref(true)
  const isLogoError = ref(false) // 新增：记录 Logo 是否加载失败

  // --- 方法 ---
  const toggleBgm = () => {
    isPlaying.value = !isPlaying.value
    // TODO: 实际的 Audio 播放/暂停逻辑写在这里
  }

  const onLogoError = () => {
    // 图片加载失败时，切换为纯文字 LOGO 显示
    isLogoError.value = true
  }
</script>

<style scoped>
  .the-navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--header-height);
    background-color: rgb(11 12 16 / 85%);
    border-bottom: 1px solid var(--color-border);
    backdrop-filter: blur(8px);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .nav-content {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  .logo-img {
    width: auto;
    max-height: 40px;
    object-fit: contain;
  }

  /* 新增：文字 LOGO 样式 */
  .logo-text {
    font-size: 22px;
    font-weight: bold;
    color: var(--color-primary);
    letter-spacing: 2px;
    cursor: pointer;
  }

  .main-nav {
    display: flex;
    gap: 24px;
  }

  .nav-item {
    position: relative;
    font-size: 16px;
    color: var(--color-text-main);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-item:hover {
    color: var(--color-primary);
  }

  .nav-item.is-active {
    font-weight: bold;
    color: var(--color-primary);
  }

  .nav-item.is-active::after {
    position: absolute;
    bottom: -21px;
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background-color: var(--color-primary);
  }

  .audio-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-main);
    cursor: pointer;
    background: transparent;
    border: none;
    transition:
      color 0.2s,
      transform 0.2s;
  }

  .audio-btn:hover {
    color: var(--color-primary);
    transform: scale(1.05);
  }

  .audio-icon {
    width: 24px;
    height: 24px;
  }

  .audio-icon.is-muted {
    color: var(--color-text-muted);
  }
</style>
