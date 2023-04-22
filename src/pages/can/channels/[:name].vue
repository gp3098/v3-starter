<template>
  <div class="p-2" v-if="$route.params.name">
    <el-table :data="state.tableData" style="width: 100%" :border="true">
      <el-table-column prop="id" label="id" width="180" />
    </el-table>
  </div>
</template>
<script setup>
import { useFetch } from '@vueuse/core';
import { reactive, watchEffect } from 'vue';

const state = reactive({
  tableData: [{}],
});

const route = useRoute();

const url = computed(() => {
  return `/api/can-open/node/${route?.params?.name}`;
});

const fetchNodes = useFetch(url).get().json();

fetchNodes.onFetchFinally(() => {
  const { data } = fetchNodes.data.value || {};
  data.sort((a, b) => a.id - b.id);
  state.tableData = data;
});
</script>

<route lang="yaml">
hide: true
meta:
  layout: home
  title: CAN 设备管理
</route>
