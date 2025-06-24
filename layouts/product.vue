<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="flex flex-col bg-white border border-orange-300 shadow-sm rounded-xl overflow-hidden"
      >
        <img
          v-if="product.thumbnail"
          class="w-full h-auto object-cover rounded-t-xl"
          :src="product.thumbnail"
          :alt="`Image of ${product.name}`"
        />
        <img
          v-else-if="product.images && product.images.length > 0 && product.images.find(img => img.image && img.image.startsWith('https'))"
          class="w-full h-auto object-cover rounded-t-xl"
          :src="product.images.find(img => img.image && img.image.startsWith('https')).image"
          :alt="`Image of ${product.name}`"
        />
        <img 
          v-else
          class="w-full h-auto object-cover rounded-t-xl"
          src="https://via.placeholder.com/300x200?text=No+Image" 
          alt="Image not available"
        />
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800">
            {{ product.name }}
          </h3>
          <div v-if="!product.isEditing">
            <p class="mt-1 text-gray-500 text-sm">{{ product.description }}</p>
            <p class="mt-2 text-sm text-gray-700"><span class="font-semibold">Артикул:</span> {{ product.article || 'Не указан' }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Код продукта:</span> {{ product.product_code }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Рейтинг:</span> {{ product.rating }}/5</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Цена:</span> {{ product.price ? product.price + ' ₽' : 'Не указана' }}</p>
            <p v-if="product.oldPrice" class="mt-1 text-sm text-gray-500 line-through"><span class="font-semibold">Старая цена:</span> {{ product.oldPrice }} ₽</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">В наличии:</span> {{ product.in_stock ? 'Да' : 'Нет' }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Количество на складе:</span> {{ product.count_stok }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">ID:</span> {{ product.id }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Категория:</span> {{ product.category ? product.category.name : '—' }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">ID категории:</span> {{ product.category ? product.category.id : '—' }}</p>
            <p class="mt-1 text-sm text-gray-700"><span class="font-semibold">Цвет:</span> {{ product.color ? product.color.name : '—' }}</p>
            <p class="mt-2 text-sm text-gray-700">
              <span class="font-semibold">Артикул:</span> {{ product.article || 'Не указан' }}
            </p>
            <p class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Цена:</span> {{ product.price ? product.price + ' ₽' : 'Не указана' }}
            </p>
            <p v-if="product.oldPrice" class="mt-1 text-sm text-gray-500 line-through">
              <span class="font-semibold">Старая цена:</span> {{ product.oldPrice }} ₽
            </p>
            <p class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">В наличии:</span> {{ product.in_stock ? 'Да' : 'Нет' }}
            </p>
            <p v-if="product.count_stok !== null" class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Количество:</span> {{ product.count_stok }}
            </p>
            <p v-if="product.category" class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Категория:</span> {{ product.category.name }}
            </p>
            <p v-if="product.brand" class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Бренд:</span> {{ product.brand.name }}
            </p>
            <p v-if="product.color" class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Цвет:</span> {{ product.color.name }}
            </p>
            <p class="mt-1 text-sm text-gray-700">
              <span class="font-semibold">Рейтинг:</span> {{ product.rating }}/5
            </p>
            <div class="mt-4 flex space-x-2">
              <button 
                @click="toggleEditMode(product)" 
                class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                Редактировать
              </button>
              <button 
                @click="deleteProduct(product.id)" 
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Удалить
              </button>
            </div>
            <div class="mt-2">
              <input 
                type="file" 
                :id="'image-upload-' + product.id" 
                @change="uploadImage(product.id, $event)" 
                accept="image/*" 
                class="hidden"
              />
              <label 
                :for="'image-upload-' + product.id" 
                class="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center cursor-pointer"
              >
                Загрузить картинку
              </label>
            </div>
            <div v-if="product.images && product.images.length > 0" class="mt-2">
              <p class="text-sm font-semibold mb-2">Картинки товара:</p>
              <div class="grid grid-cols-2 gap-2">
                <div 
                  v-for="img in product.images" 
                  :key="img.id" 
                  class="relative"
                >
                  <img 
                    :src="img.image" 
                    :alt="`Image ${img.id}`" 
                    class="w-full h-20 object-cover rounded"
                  />
                  <button 
                    @click="deleteImage(product.id, img.id)" 
                    class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="product.isEditing">
            <div class="mb-2 font-bold text-orange-700 text-center text-lg">
              Редактируется: {{ product.name }}
            </div>
            <p class="text-sm font-semibold mb-1">Название</p>
            <textarea v-model="product.editName" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Введите название"></textarea>
            <p class="text-sm font-semibold mb-1 mt-2">Описание</p>
            <textarea v-model="product.editDescription" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Введите описание"></textarea>
            <p class="text-sm font-semibold mb-1 mt-2">Код продукта</p>
            <input v-model="product.editProductCode" type="number" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Код продукта" />
            <p class="text-sm font-semibold mb-1 mt-2">Артикул</p>
            <input v-model="product.editArticle" type="text" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Артикул" />
            <p class="text-sm font-semibold mb-1 mt-2">Рейтинг (1-5)</p>
            <input v-model="product.editRating" type="number" min="1" max="5" step="0.1" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Рейтинг (1-5)" />
            <p class="text-sm font-semibold mb-1 mt-2">Цена</p>
            <input v-model="product.editPrice" type="number" step="0.01" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Цена" />
            <p class="text-sm font-semibold mb-1 mt-2">Старая цена</p>
            <input v-model="product.editOldPrice" type="number" step="0.01" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Старая цена" />
            <p class="text-sm font-semibold mb-1 mt-2">Количество на складе</p>
            <input v-model="product.editCountStock" type="number" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="Количество на складе" />
            <p class="text-sm font-semibold mb-1 mt-2">ID цвета</p>
            <input v-model="product.editColorId" type="number" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="ID цвета" />
            <p class="text-sm font-semibold mb-1 mt-2">ID категории</p>
            <input v-model="product.editCategoryId" type="number" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="ID категории" />
            <p class="text-sm font-semibold mb-1 mt-2">ID бренда</p>
            <input v-model="product.editBrandId" type="number" class="w-full p-2 border border-gray-300 rounded-md mt-2" placeholder="ID бренда" />
            <div class="mt-2">
              <label class="flex items-center">
                <input v-model="product.editInStock" type="checkbox" class="mr-2" />
                <span class="text-sm">В наличии</span>
              </label>
            </div>
            <div class="mt-4">
              <h4 class="font-semibold text-sm mb-2">Цвета (JSON формат):</h4>
              <textarea v-model="product.editColorsJson" class="w-full p-2 border border-gray-300 rounded-md" placeholder='[{"color_id": 1, "isAvailable": true}]' rows="3"></textarea>
            </div>
            <div class="mt-4">
              <h4 class="font-semibold text-sm mb-2">Размеры (JSON формат):</h4>
              <textarea v-model="product.editSizesJson" class="w-full p-2 border border-gray-300 rounded-md" placeholder='[{"size_id": 1, "isAvailable": true}]' rows="3"></textarea>
            </div>
            <button 
              @click="updateProduct(product)" 
              class="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="paginator.has_next || paginator.has_prev" class="text-center mt-6 flex justify-center gap-4">
      <button 
        v-if="paginator.has_prev"
        @click="loadProducts(paginator.page - 1)" 
        class="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
      >
        Предыдущая страница
      </button>
      <button 
        v-if="paginator.has_next"
        @click="loadProducts(paginator.page + 1)" 
        class="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
      >
        Следующая страница
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const products = ref([]);
  const paginator = ref({});
  const loading = ref(true);
  const currentPage = ref(1);
  let token = null;
  
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
  
  onMounted(() => {
    token = getCookie('authtoken'); 
    if (!token) {
      console.error('Токен не найден!');
    } else {
      loadProducts(currentPage.value); 
    }
  });
  
  const loadProducts = async (page) => {
    if (!token) {
      console.error('Токен отсутствует, запрос не выполнен.');
      return;
    }
  
    loading.value = true;
  
    try {
      const response = await fetch(`http://85.175.100.129:72/api/v1/ct/product/?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при загрузке продуктов');
      }
  
      const data = await response.json();
      products.value = data.data || [];
      paginator.value = data.paginator || {};
      console.log('Загружены продукты:', data);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  
    loading.value = false;
  };
  
  const toggleEditMode = (product) => {
    product.isEditing = !product.isEditing;
  
    if (product.isEditing) {
      product.editName = product.name;
      product.editDescription = product.description;
      product.editProductCode = product.product_code || 0;
      product.editArticle = product.article || '';
      product.editRating = product.rating || 5;
      product.editPrice = product.price || '';
      product.editOldPrice = product.oldPrice || '';
      product.editCountStock = product.count_stok || 0;
      product.editColorId = product.color?.id || '';
      product.editCategoryId = product.category?.id || '';
      product.editBrandId = product.brand?.id || '';
      product.editInStock = product.in_stock || false;
      product.editColorsJson = product.colors ? JSON.stringify(product.colors, null, 2) : '[]';
      product.editSizesJson = product.sizes ? JSON.stringify(product.sizes, null, 2) : '[]';
    }
  };
  
  const updateProduct = async (product) => {
    const updatedData = {
      name: product.editName,
      description: product.editDescription,
      product_code: parseInt(product.editProductCode) || 0,
      article: product.editArticle,
      rating: parseFloat(product.editRating) || 5,
      in_stock: product.editInStock,
      count_stok: parseInt(product.editCountStock) || 0,
      price: product.editPrice ? parseFloat(product.editPrice) : null,
      oldPrice: product.editOldPrice ? parseFloat(product.editOldPrice) : null,
      color_id: product.editColorId ? parseInt(product.editColorId) : null,
      category_id: product.editCategoryId ? parseInt(product.editCategoryId) : null,
      brand_id: product.editBrandId ? parseInt(product.editBrandId) : null,
      colors: product.editColorsJson ? JSON.parse(product.editColorsJson) : [],
      sizes: product.editSizesJson ? JSON.parse(product.editSizesJson) : []
    };
  
    try {
      const response = await fetch(`http://85.175.100.129:72/api/v1/ct/product/${product.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении продукта');
      }
  
      const data = await response.json();
      console.log('Продукт обновлен:', data);
      product.isEditing = false;
      loadProducts(currentPage.value);
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
    }
  };
  
  const deleteProduct = async (productId) => {
    if (!token) {
      console.error('Токен отсутствует, запрос не выполнен.');
      return;
    }
  
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }
  
    try {
      const response = await fetch(`http://85.175.100.129:72/api/v1/ct/product/${productId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при удалении продукта');
      }
  
      console.log('Продукт успешно удален');
      loadProducts(currentPage.value);
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };
  
  const uploadImage = async (productId, event) => {
    if (!token) {
      console.error('Токен отсутствует, запрос не выполнен.');
      return;
    }
  
    const file = event.target.files[0];
    if (!file) {
      console.error('Файл не выбран');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`http://85.175.100.129:72/api/v1/ct/product/${productId}/image/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при загрузке изображения');
      }
  
      const data = await response.json();
      console.log('Изображение загружено:', data);
      loadProducts(currentPage.value);
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
    }
  };
  
  const deleteImage = async (productId, imageId) => {
    if (!token) {
      console.error('Токен отсутствует, запрос не выполнен.');
      return;
    }
  
    if (!confirm('Вы уверены, что хотите удалить это изображение?')) {
      return;
    }
  
    try {
      const response = await fetch(`http://85.175.100.129:72/api/v1/ct/product/${productId}/image/?product_image_ids=${imageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при удалении изображения');
      }
  
      console.log('Изображение успешно удалено');
      loadProducts(currentPage.value);
    } catch (error) {
      console.error('Ошибка при удалении изображения:', error);
    }
  };
  
  watch(currentPage, (newPage) => {
    loadProducts(newPage);
  });
  </script>
  