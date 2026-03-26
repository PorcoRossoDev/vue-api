import { createRouter, createWebHistory } from 'vue-router'

import Article from '../components/Article.vue'
import Order from '../components/Order.vue'
import Home from '../components/Home.vue'
import OrderOutput from '../components/order/OrderOutput.vue'

const routes  = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/articles',
        name: 'articles',
        component: Article
    },
    {
        path: '/orders',
        name: 'orders',
        component: Order
    },
    {
        path: '/orders/output',
        name: 'orders.output',
        component: OrderOutput
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router