import { defineStore } from 'pinia'
import api from '../services/api'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [],
        total_price: 0,
        total_item: 0,
        loading: false,
        paginate: {
            currentPage: 1,
            lastPage: 1,
            perPage: 5,
            total: 0,
        },
        paginate_ouput: {
            currentPage: 1,
            lastPage: 1,
            perPage: 5,
            total: 0,
            total_all_price: 0,
            total_all_qty: 0,
        },
    }),
    getters: {

    },
    actions: {
        async fetchOrder(page = 1){
            this.loading = true
            const res = await api.get(`orders?page=${page}`)
            this.orders = res.data.data
            this.loading = false
            this.paginate.currentPage = res.data.current_page
            this.paginate.lastPage = res.data.last_page
            this.paginate.total = res.data.total
        },
        async fetchOrderOutput(page = 1){
            this.loading = true
            const res = await api.get(`orders/output?page=${page}`)
            this.orders = res.data.order.data
            this.loading = false
            this.paginate_ouput.currentPage = res.data.order.current_page
            this.paginate_ouput.lastPage = res.data.order.last_page
            this.paginate_ouput.total = res.data.order.total
            this.paginate_ouput.total_all_qty = res.data.total.total_qty_received
            this.paginate_ouput.total_all_price = res.data.total.total_price
        },
    }
})