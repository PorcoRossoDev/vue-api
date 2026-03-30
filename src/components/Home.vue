<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container mx-auto">
    <nav class="mt-3">
      <router-link to="/articles">Bài viết</router-link> |
      <router-link to="/orders">Đơn hàng</router-link> |
      <router-link to="/login">Đăng nhập</router-link>
    </nav>

    <div class="mt-10">
      <router-view />
    </div>
  </div>

</template>
