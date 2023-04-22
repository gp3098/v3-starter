<template>
  <div>
    <div class="flex flex-col">
      <div class="">
        <el-button @click="handleAddChannel"> 添加频道 </el-button>
        <el-button @click="handleSearchChannel"> 搜索设备 </el-button>
      </div>
      <el-table v-loading="fetchChannels.isFetching.value" :data="state.tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column fixed="right" label="Operations" width="200">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="(e) => handleManager(e, scope)">Manager</el-button>
            <el-button link type="primary" size="small" @click="(e) => handleDelete(e, scope)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useFetch } from '@vueuse/core';
import { apis } from '../../utils/apis';

const state = reactive({
  tableData: [],
});

const url = apis.channel;

const fetchChannels = useFetch(url, {
  timeout: 3000,
})
  .get()
  .json();

fetchChannels.onFetchFinally(() => {
  if (!fetchChannels.data.value) {
    console.log('fetchChannels.onFetchFinally', 'fetchChannels.data.value is null');
    return;
  }
  const { data } = fetchChannels.data.value;
  state.tableData = data;
});

const router = useRouter();

const handleManager = (e, scope) => {
  router.push({
    path: '/can/channels/' + scope.row.name,
  });
  console.log('handleManager', e, scope);
};

const handleAddChannel = () => {
  router.push({
    path: '/can/channels/add',
  });
};

// deleteChannel.onFetchFinally(() => {
//   if (!/2\d+/.test(deleteChannel.statusCode.value)) {
//     ElMessage.error(deleteChannel.data.value?.message);
//     return;
//   }
//   console.log('deleteChannel onFetchFinally', deleteChannel.statusCode.value, deleteChannel);
// });

const handleDelete = async (e, scope) => {
  console.log('handleDelete', e, scope);
  const name = scope.row.name;
  const url = apis.channel + '/' + name;
  const deleteChannel = await useFetch(url, { timeout: 3000 }).delete().json();
  if (!/2\d+/.test(deleteChannel.statusCode.value)) {
    ElMessage.error(deleteChannel.data.value?.message);
    return;
  }
  fetchChannels.execute();

  console.log('deleteChannel', deleteChannel);
};

const handleSearchChannel = () => {
  console.log('handleSearchChannel');
};
</script>

<route lang="yaml">
meta:
  layout: home
  title: 频道
</route>
