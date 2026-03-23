import { defineStore } from 'pinia'
import api from '../services/api'

export const useArticleStore = defineStore('article', {
    state: () => ({
        articles: [],
        loading: false,
        currentPage: 1,
        lastPage: 1
    }),
    getters: {
        
    },
    actions: {
        async fetchArticles(page = 1, keyword = '') {
            this.loading = true
            const rest = await api.get(`articles?page=${page}&search=${keyword}`)
            this.articles = rest.data.data
            this.loading = false
            this.currentPage = rest.data.current_page
            this.lastPage = rest.data.last_page
        },
        async deleteArticle (id) {
            await api.delete(`articles/${id}`)
            this.articles = this.articles.filter(article => article.id !== id)
        },
        async addArticle (article) {
            // console.log(article)
            await api.post('articles', article)
            this.fetchArticles()
        }
    }
})