<template>
  <el-form class="p-4" label-width="100px" :model="form" ref="formRef">
    <el-form-item label="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';
import { apis } from '../../../utils/apis';
const form = reactive({ name: '' });
const formRef = ref();
const router = useRouter();

const url = apis.channel;

const payload = computed(() => {
  return { name: form.name };
});

const fetchChannel = useFetch(url, { timeout: 3000, immediate: false }).post(payload).json();

fetchChannel.onFetchFinally(() => {
  if (!/2\d+/.test(fetchChannel.statusCode.value)) {
    ElMessage.error(fetchChannel.data.value?.message);
    return;
  }
  console.log('onFetchFinally', fetchChannel.statusCode.value, fetchChannel);

  formRef.value.resetFields();
  form.name = '';
  router.go(0);
});

const onSubmit = () => {
  console.log('onSubmit', form);
  if (!form.name) {
    console.log('create channel fail, channel name empty');
    ElMessage.error('create channel fail, channel name empty');
    return;
  }
  fetchChannel.execute();
};
</script>
<route lang="yaml">
meta:
  layout: home
  title: 添加频道
</route>
