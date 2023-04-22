<template>
  <header class="head flex-none flex gap-2 h-14 w-full items-center border-b">
    <menuFoldOutlined
      v-show="!sideBarStore.isCollapse"
      class="mx-4 select-none cursor-pointer"
      @click="sideBarStore.collapseSideBar"
    />
    <menuUnfoldOutlined
      v-show="sideBarStore.isCollapse"
      class="mx-4 select-none cursor-pointer"
      @click="sideBarStore.collapseSideBar"
    />
    <p class="select-none cursor-pointer">{{ $route.meta.title }}</p>
  </header>
</template>
<script setup lang="ts">
import menuFoldOutlined from '~icons/ant-design/menu-fold-outlined';
import menuUnfoldOutlined from '~icons/ant-design/menu-unfold-outlined';
import { useSidebarStore } from '../stores/sidebar';
const sideBarStore = useSidebarStore();
</script>
