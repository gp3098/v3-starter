<template>
  <div class="container mx-auto p-2 h-full">
    <el-card class="box-card h-full w-full">
      <el-form :model="form">
        <el-form-item label="机器人编号">
          <div class="flex">
            <el-input v-model="form.robotId" placeholder="请输入机器人编号" />
          </div>
        </el-form-item>
        <el-form-item label="选择日期">
          <div class="flex flex-col gap-3">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择一个日期"
              :value-format="dateFormat"
            />
          </div>
        </el-form-item>
        <el-form-item label="选择分析时长">
          <div class="flex items-center w-96 ml-4">
            <el-slider v-model="form.duration" show-input :min="10" :max="60" :step="10" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">分析</el-button>
        </el-form-item>
      </el-form>
      <el-image v-if="downloadUrl" :preview-src-list="[downloadUrl]" :src="downloadUrl" />
    </el-card>
    <a class="hidden" ref="downloadRef" href="" download=""> </a>
  </div>
</template>
<script setup>
import { useFetch } from '@vueuse/core';
import dayjs from 'dayjs';
import { computed, reactive, ref } from 'vue';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

// do not use same name with ref
const form = reactive({
  robotId: '',
  startTime: dayjs().format(dateFormat),
  duration: 30,
});

const onSubmit = () => {
  logAnalysis.execute();
};
const logAnalysisUrl = '/api/log-manager/log-analysis';

const logAnalysis = useFetch(logAnalysisUrl, { immediate: false }).post(form).json();
const downloadUrl = ref('');
const downloadRef = ref();
logAnalysis.onFetchFinally(() => {
  console.log('logAnalysis.fetchFinally', logAnalysis.data.value);
  if (/2\d./.test(logAnalysis.statusCode.value)) {
    ElMessage.success('处理日志成功');
    downloadUrl.value = logAnalysis.data.value?.data?.downloadUrl;
    console.log('downloadUrl', downloadUrl.value);

    downloadRef.value.href = downloadUrl.value;
    downloadRef.value.download = `${downloadUrl.value}`;
    downloadRef.value.click();
    URL.revokeObjectURL(downloadRef.value.href);
    return;
  }
  const { error, message, statusCode } = logAnalysis.data.value;
  ElMessage.error('处理日志失败：' + message + '(' + statusCode + ')');
});
</script>
