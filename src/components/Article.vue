<template lang="">
    <div class="container mx-auto mt-10">
        
        <div class="flex -mx-5">
            <div class="w-1/2 px-5">
                <h2 class="mb-2 text-lg font-medium text-heading">Danh sách bài viết:</h2>
                
                <input v-model="keyword" type="text" class="border-[1px] border-gray-300 px-2 py-1 rounded-xs mb-3" placeholder="Tìm kiếm bài viết...">

                <ul class="max-w-md space-y-1 text-body list-inside mt-3">
                    <li v-for="article in articles" class="flex">
                        <svg class="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        {{ article.title }}
                        <button @click="deleteArticle(article.id)" class="text-red-500 border-[1px] border-red-500 px-2 text-xs ml-2">Xoá</button>
                    </li>
                </ul>

                <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="perPage"
                :total="total"
                @current-change="handlePageChange"
                />
            </div>
            <div class="w-1/2 px-5">
                <h2 class="mb-2 text-lg font-medium text-heading">Thêm bài viết:</h2>
                <form @submit.prevent="createArticle">
                    <input v-model="newArticle.title" type="text" class="border-[1px] border-gray-300 px-2 py-1 block w-full rounded-xs text-xs mb-3" placeholder="Tiêu đề bài viết...">
                    <textarea v-model="newArticle.content" class="border-[1px] border-gray-300 px-2 py-1 block w-full rounded-xs text-xs mb-3" placeholder="Nội dung bài viết..."></textarea>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 text-xs rounded">Thêm bài viết</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useArticleStore } from '../store/articleStore';
import { storeToRefs } from 'pinia';

const articleStore = useArticleStore()
const { articles, loading, currentPage, lastPage, perPage, total } = storeToRefs(articleStore)

const keyword = ref('')

const newArticle = ref({
    title: '',
    description: '',
    content: ''
})

onMounted(() => {
    articleStore.fetchArticles()
})

const debouncedSearch = debounce(() => {
    articleStore.fetchArticles(1, keyword.value)
}, 500)

const handlePageChange = (page) => {
    articleStore.fetchArticles(page, keyword.value)
}

watch(keyword, () => {
    debouncedSearch()
})

const deleteArticle = (id) => {
    articleStore.deleteArticle(id)
}

const createArticle = () => {
    articleStore.addArticle(newArticle.value)
    newArticle.value = {
        title: '',
        description: '',
        content: ''
    }
}

function debounce(fn, delay) {
  let timer

  return function (...args) {
    // Nếu đang có timer → hủy
    if (timer) {
      clearTimeout(timer)
    }

    // Tạo timer mới
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
</script>