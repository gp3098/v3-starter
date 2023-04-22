<template>
  <div class="sidebar flex-none min-w-[12.6rem] h-full" v-show="!sideBarStore.isCollapse"></div>
</template>
<script setup lang="ts">
import { ElMenuItem, ElSubMenu } from 'element-plus';
import { sidebarRoutes } from '../router';
import { routes } from '../router';
import { useSidebarStore } from '../stores/sidebar';
const sideBarStore = useSidebarStore();

// for (const route of routes) {
//   console.log('route: ', route);
//   if (route.children) {
//     for (const subRoute of route.children) {
//       console.log('sub route: ', subRoute);
//     }
//   }
// }
</script>
