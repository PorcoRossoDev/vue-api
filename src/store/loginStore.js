import { defineStore } from 'pinia'
import api from '../services/api'

export const useLoginStore = defineStore ('login', {
    state: () => ({
        email: '',
        bearerToken: null,
        errors: {}
    }),
    getters: {

    },
    actions: {
        async login(payload = { email: '', password: '' }) {
            try {
                this.errors = {} // reset
                const res = await api.post('/login', payload)
                this.bearerToken = res.data.access_token
                localStorage.setItem('token', res.data.access_token || '')
                return {
                    success: true,
                    token: res.data.access_token
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors
                } else if (error.response?.status === 401) {
                    this.errors = {
                        general: [error.response.data.message]
                    }
                }
            }
        }
    }
});