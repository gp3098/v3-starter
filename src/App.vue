<script setup>
// This starter template is using Vue 3 <script setup> SFCs

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { ref } from 'vue';
import { io } from 'socket.io-client';
let locale = ref(zhCn);

const socket = io('/', {
  transports: ['websocket'],
});

// const can1 = io('can1');

// can1.on('pdo', (data) => {
//   console.log('can1', data);
// });

// client - side;
socket.on('connect', () => {
  console.log('connect', socket.id); //
  socket.emit('hello', 'Hello there from Vue!');
  socket.emit('subscribe', 'okk');
  socket.emit('subscribePdoEvent');
  socket.emit('socketTest', 'can1');
});

socket.on('pdo', (data) => {
  console.log('pdo', data);
});

socket.on('hello', (data) => {
  console.log('hello self on:', data);
});

socket.on('subscribe', (data) => {
  console.log('subscribe on:', data);
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
