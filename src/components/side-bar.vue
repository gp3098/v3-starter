<template>
  <div class="sidebar flex-none min-w-[12.6rem] h-full" v-show="!sideBarStore.isCollapse">
    <el-menu v-for="route in routes" default-active="/" class="el-menu-vertical-demo transition" router>
      <!-- <side-bar-item :route="route" :path="route.path" /> -->
      <template v-if="route.children">
        <side-bar-item v-for="item in route.children" :route="item" />
      </template>
      <template v-else>
        <el-menu-item :title="route.path" :route="route" :index="route.path" />
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ElMenuItem } from 'element-plus';
import { routes } from '../router';
import { useSidebarStore } from '../stores/sidebar';
const sideBarStore = useSidebarStore();
</script>
