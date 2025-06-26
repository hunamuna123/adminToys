<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Создать товар</h2>
        <form @submit.prevent="createProduct">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="name">Название</label>
            <input 
              v-model="form.name" 
              id="name" 
              type="text" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите название"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="description">Описание</label>
            <textarea 
              v-model="form.description" 
              id="description" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите описание"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="product_code">Код продукта</label>
            <input 
              v-model="form.product_code" 
              id="product_code" 
              type="number" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите код продукта"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="article">Артикул</label>
            <input 
              v-model="form.article" 
              id="article" 
              type="text" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите артикул"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="rating">Рейтинг</label>
            <input 
              v-model="form.rating" 
              id="rating" 
              type="number" 
              min="1" 
              max="5" 
              step="0.1"
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Рейтинг (1-5)"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="price">Цена</label>
            <input 
              v-model="form.price" 
              id="price" 
              type="number" 
              step="0.01"
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите цену"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="oldPrice">Старая цена</label>
            <input 
              v-model="form.oldPrice" 
              id="oldPrice" 
              type="number" 
              step="0.01"
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите старую цену"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="count_stok">Количество на складе</label>
            <input 
              v-model="form.count_stok" 
              id="count_stok" 
              type="number" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите количество"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="color_id">ID цвета</label>
            <input 
              v-model="form.color_id" 
              id="color_id" 
              type="number" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите ID цвета"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="category_id">ID категории</label>
            <input 
              v-model="form.category_id" 
              id="category_id" 
              type="number" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите ID категории"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="brand_id">ID бренда</label>
            <input 
              v-model="form.brand_id" 
              id="brand_id" 
              type="number" 
              class="w-full p-2 border border-gray-300 rounded-md" 
              placeholder="Введите ID бренда"
            />
          </div>
          <div class="mb-4">
            <label class="flex items-center">
              <input v-model="form.in_stock" type="checkbox" class="mr-2" />
              <span class="text-sm font-medium text-gray-700">В наличии</span>
            </label>
          </div>

          <!-- Цвета -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Цвета товара</label>
            <div class="space-y-2">
              <div 
                v-for="(color, index) in form.colors" 
                :key="index" 
                class="flex items-center space-x-2"
              >
                <input 
                  v-model="color.color_id" 
                  type="number" 
                  class="flex-1 p-2 border border-gray-300 rounded-md" 
                  placeholder="ID цвета"
                />
                <label class="flex items-center">
                  <input v-model="color.isAvailable" type="checkbox" class="mr-1" />
                  <span class="text-sm">Доступен</span>
                </label>
                <button 
                  type="button" 
                  @click="removeColor(index)" 
                  class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
              <button 
                type="button" 
                @click="addColor" 
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                + Добавить цвет
              </button>
            </div>
          </div>

          <!-- Размеры -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Размеры товара</label>
            <div class="space-y-2">
              <div 
                v-for="(size, index) in form.sizes" 
                :key="index" 
                class="flex items-center space-x-2"
              >
                <input 
                  v-model="size.size_id" 
                  type="number" 
                  class="flex-1 p-2 border border-gray-300 rounded-md" 
                  placeholder="ID размера"
                />
                <label class="flex items-center">
                  <input v-model="size.isAvailable" type="checkbox" class="mr-1" />
                  <span class="text-sm">Доступен</span>
                </label>
                <button 
                  type="button" 
                  @click="removeSize(index)" 
                  class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
              <button 
                type="button" 
                @click="addSize" 
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                + Добавить размер
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
          >
            Создать товар
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    name: '',
    description: '',
    product_code: 0,
    article: '',
    rating: 5,
    in_stock: true,
    count_stok: 0,
    price: 0,
    oldPrice: 0,
    color_id: 0,
    category_id: 0,
    brand_id: 0,
    colors: [],
    sizes: []
  });
  
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
  
  const addColor = () => {
    form.value.colors.push({
      color_id: 0,
      isAvailable: true
    });
  };
  
  const removeColor = (index) => {
    form.value.colors.splice(index, 1);
  };
  
  const addSize = () => {
    form.value.sizes.push({
      size_id: 0,
      isAvailable: true
    });
  };
  
  const removeSize = (index) => {
    form.value.sizes.splice(index, 1);
  };
  
  const createProduct = async () => {
    const token = getCookie('authtoken');
    if (!token) {
      console.error('Токен отсутствует.');
      return;
    }
  
    try {
      const productData = {
        name: form.value.name,
        description: form.value.description,
        product_code: parseInt(form.value.product_code) || 0,
        article: form.value.article,
        rating: parseFloat(form.value.rating) || 5,
        in_stock: form.value.in_stock,
        count_stok: parseInt(form.value.count_stok) || 0,
        price: parseFloat(form.value.price) || 0,
        oldPrice: parseFloat(form.value.oldPrice) || 0,
        color_id: parseInt(form.value.color_id) || 0,
        category_id: parseInt(form.value.category_id) || 0,
        brand_id: parseInt(form.value.brand_id) || 0,
      };
  
      // Добавляем цвета только если они есть
      if (form.value.colors.length > 0) {
        productData.colors = form.value.colors;
      }
  
      // Добавляем размеры только если они есть
      if (form.value.sizes.length > 0) {
        productData.sizes = form.value.sizes;
      }
  
      const response = await fetch('https://plushmarket.ru/api/v1/ct/product/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при создании товара');
      }
  
      const data = await response.json();
      console.log('Товар успешно создан:', data);
      alert('Товар успешно создан!');
      
      // Очищаем форму
      form.value = {
        name: '',
        description: '',
        product_code: 0,
        article: '',
        rating: 5,
        in_stock: true,
        count_stok: 0,
        price: 0,
        oldPrice: 0,
        color_id: 0,
        category_id: 0,
        brand_id: 0,
        colors: [],
        sizes: []
      };
    } catch (error) {
      console.error(error);
      alert('Ошибка при создании товара');
    }
  };
  </script>
  