<template>
  <div class="login-view">
    <div class="login-container">
      <div class="login-header">
        <h1 class="brand-title font-deco">Symplatt</h1>
        <p class="brand-subtitle font-tech">舆情监测系统验证终端</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="font-main">用户名</label>
          <input
            v-model="username"
            type="text"
            class="form-input"
            placeholder="请输入系统账号"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label class="font-main">密 码</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="请输入密码"
            autocomplete="current-password"
          />
        </div>

        <div class="error-message font-main" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn-submit font-sans" :disabled="isSubmitting || !isValid">
          <span v-if="isSubmitting">认证中...</span>
          <span v-else>登 录</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  // 1. Vue 核心 API
  import { ref, computed } from 'vue'

  // 2. Vue 官方生态
  import { useRouter } from 'vue-router'

  import { login, getUserProfile } from '@/api/auth'

  // --- ref / reactive（状态） ---
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const isSubmitting = ref(false)
  const errorMessage = ref('')

  // --- computed（派生状态） ---
  const isValid = computed(() => {
    return username.value.trim().length > 0 && password.value.length > 0
  })

  // --- 普通函数（事件 / 工具） ---
  const handleLogin = async () => {
    if (!isValid.value) return

    isSubmitting.value = true
    errorMessage.value = ''

    try {
      // 1. 请求登录接口获取 Token
      // auth.js 中已经处理了 FormData 格式的组装
      const tokenRes = await login(username.value, password.value)

      // 2. 保存 Token 到本地
      localStorage.setItem('access_token', tokenRes.access_token)

      // 3. 获取当前登录用户信息 (包含 is_admin 字段)
      const userRes = await getUserProfile()
      localStorage.setItem('user_info', JSON.stringify(userRes))

      // 4. 跳转到首页
      router.push('/')
    } catch (error: any) {
      console.error('登录失败:', error)
      // 根据后端 FastAPI OAuth2PasswordRequestForm 默认的错误返回格式提取信息
      errorMessage.value = error.response?.data?.detail || '账号或密码错误，请重试'
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
  /* --- 业务容器：独立全屏布局 --- */
  .login-view {
    display: flex;
    align-items: center;
    justify-content: center;

    /* 覆盖全局样式，让登录页占满整屏且居中 */
    width: 100vw;
    height: 100vh;
    background-color: #0b0c10;

    /* 如果你想在这个页面加星空背景，可以在 template 里引入组件，并在这里设 position: relative */
  }

  /* --- 结构容器：登录卡片 --- */
  .login-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 400px;
    padding: 40px 32px;
    background-color: #15161a;
    border: 1px solid #2a2b32;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  }

  .login-header {
    margin-bottom: 32px;
    text-align: center;
  }

  .brand-title {
    margin-bottom: 8px;
    font-size: 2.5rem;
    color: #fff;
    letter-spacing: 2px;
  }

  .brand-subtitle {
    font-size: 0.9rem;
    color: #42b983; /* Vue Green 点缀 */
    letter-spacing: 1px;
  }

  /* --- 表单样式 --- */
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 14px;
    color: #888;
  }

  .form-input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    color: #fff;
    outline: none;
    background-color: #0b0c10;
    border: 1px solid #2a2b32;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    border-color: #42b983;
    box-shadow: 0 0 0 2px rgb(66 185 131 / 20%);
  }

  .error-message {
    padding: 8px;
    font-size: 13px;
    color: #e74c3c;
    text-align: center;
    background: rgb(231 76 60 / 10%);
    border-radius: 4px;
  }

  .btn-submit {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    background-color: #42b983;
    border: none;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .btn-submit:disabled {
    color: #666;
    cursor: not-allowed;
    background-color: #2a2b32;
  }

  .btn-submit:hover:not(:disabled) {
    background-color: #3aa876;
  }
</style>
