<template>
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-[400px] bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800">Войти в Админ Панель</h1>
        </div>
  
        <div class="mt-5" v-if="!isAuthenticated">
          <form @submit.prevent="handleLogin">
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm mb-2">Email</label>
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="email"
                    class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                </div>
              </div>
              <div>
                <label for="password" class="block text-sm mb-2">Пароль</label>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                    class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Войти
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <p>Вы уже авторизованы!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const isAuthenticated = ref(false);
  const router = useRouter();
  
  onMounted(() => {
    // Проверяем наличие токена в cookie
    if (getCookie('authtoken')) {
      isAuthenticated.value = true;
      router.push('/admin');
    }
  });
  
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://85.175.100.129:72/api/v1/sign-in/email-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.data || !data.data.access_token) {
        throw new Error(data.message || 'Ошибка при получении токена');
      }
      setCookie('authtoken', data.data.access_token, 7); // Сохраняем токен в cookie на 7 дней
      isAuthenticated.value = true;
      router.push('/admin');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      alert('Неверный email, пароль или ошибка запроса');
    }
  };
  </script>
  