<template lang="">

    <h1 class="text-xl font-bold mb-5 uppercase">Đơn hàng</h1>
    <NavOrder />
    <div>
        <el-table :data="orders" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column label="Mã đơn" width="120">
                <template #default="scope">#DH{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column label="Ảnh" width="200">
                <template #default="scope">
                    <img class="h-20" :src="'https://phuonghoangphat.com/'+parseJson(scope.row.products)?.image || ''" />
                </template>
            </el-table-column>
            <el-table-column label="Sản phẩm" width="600">
            <template #default="scope">
                {{ scope.row.product_title }}
            </template>
            </el-table-column>
            <el-table-column label="Số lượng" width="120">
                <template #default="scope">
                    {{ scope.row.total_item }}
                </template>
            </el-table-column>
            <el-table-column label="Tổng tiền" width="120">
                <template #default="scope">
                    <span class="text-red-500 font-medium">{{ formatPrice(scope.row.total_price) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" width="150">
                <template #default="scope">
                    <span class="px-2 py-1 rounded-xl" :class="getStatus(scope.row.status, 'className')">{{ getStatus(scope.row.status) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo" width="200">
                <template #default="scope">{{ formatDate(scope.row.created_at) }}</template>
            </el-table-column>
        </el-table>

        <div class="mt-4">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="paginate.currentPage"
                :page-size="paginate.perPage"
                :total="paginate.total"
                @current-change="handlePageChange"
                />
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useOrderStore } from '../store/orderStore';
import NavOrder from './order/NavOrder.vue';

const orderStore = useOrderStore()
const { orders, total_price, total_item, loading, currentPage, lastPage, perPage, total, paginate } = storeToRefs(orderStore)

onMounted(() => {
    orderStore.fetchOrder()
    console.log(orders.value)
})

const handlePageChange = (page) => {
    orderStore.fetchOrder(page)
}


// Thư viện dành cho dữ liệu
const parseJson = (data) => {
    return JSON.parse(data)
}

const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value)
}

const formatDate = (d) =>
    new Date(d).toLocaleString('sv-SE').replace('T', ' ')

const getStatus = (status, type = 'text') => {
    var text = ''
    var className = ''
    if( status == 3 ){
        text = 'Hàng về đủ'
        className = 'bg-green-500 text-white'
    } else if( status == 2 ){
        text = 'Hàng về thiếu'
        className = 'bg-black text-white'
    } else if( status == 1 ){
        text = 'Hàng đang về'
        className = 'bg-amber-500 text-white'
    } else {
        text = 'Hàng bị hủy'
        className = 'bg-pink-500 text-white'
    }
    if( type == "text" ){
        return text
    }
    return className
}
</script>