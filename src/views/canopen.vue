<template>
  <div class="p-2">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>CAN 设备管理</span>
          <el-button class="button" text>管理频道</el-button>
          <el-button class="button" text></el-button>
          <el-button class="button" text>Operation button</el-button>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </div>
</template>
<script setup>
// const Test = () => {
//   return <div>ok</div>;
// };

import { useFetch } from '@vueuse/core';
import { inject, onMounted } from 'vue';

const test1 = useFetch('/api/can-open/node', { immediate: false }).get().json();
const socket = inject('socket');

test1.onFetchFinally(() => {
  console.log('test1.onFetchFinally', test1.data.value);
});

socket.emit('socketTest', { test: '测试数据1' }, (data) => {
  console.log('socketTest1: ', data); // { msg1: '测试1', msg2: '测试2' }
});

socket.emit('subscribe', { test: '测试数据2' }, (data) => {
  console.log('sub: ', data); // { msg1: '测试1', msg2: '测试2' }
});

socket.on('subscribe', (data) => {
  console.log('subscribe on:', data);
});

onMounted(() => {
  socket.connect(); //连接socket服务器
});
</script>
