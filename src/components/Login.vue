<template lang="">
    <div class="flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                Sign In
            </h2>

            <el-form
                :model="form"
                :rules="rules"
                ref="formRef"
                label-position="top"
                class="space-y-4"
            >
                <el-form-item label="Email" prop="email">
                <el-input
                    v-model="form.email"
                    placeholder="your@email.com"
                />
                </el-form-item>

                <el-form-item label="Password" prop="password">
                <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="••••••••"
                    show-password
                />
                </el-form-item>

                <div class="flex items-center justify-between">
                <el-checkbox v-model="form.remember">
                    Remember me
                </el-checkbox>

                <el-link type="primary" underline="never">
                    Forgot password?
                </el-link>
                </div>

                <el-button
                type="primary"
                class="w-full"
                @click="handleLogin"
                >
                Đăng nhập
                </el-button>
            </el-form>

            <div class="mt-6 text-center text-sm text-gray-600">
                Don't have an account?
                <el-link type="primary" underline="never">
                Sign up
                </el-link>
            </div>
        </div>
    </div>
    {{ errors }}
</template>
<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '../store/loginStore'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'


const formRef = ref()
const loginStore = useLoginStore()
const { email, bearerToken, errors } = storeToRefs(loginStore)

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const router = useRouter()

const handleLogin = async () => {
    const res = await loginStore.login(form.value)
    if(res.success){
        ElMessage({
            message: 'Đăng nhập thành công',
            type: 'success',
        })
        router.push('/orders')
    }
}

watch(errors, (newVal) => {
    if (Object.keys(newVal).length > 0) {
        ElMessage({
            message: Object.values(newVal).flat().join(', '),
            type: 'error',
        })
    }
})

</script>