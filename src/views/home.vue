<template>
  <div class="container mx-auto p-2 h-full">
    <el-card class="box-card h-full w-full" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>维护命令</span>
        </div>
      </template>
      <div class="flex gap-2 flex-col">
        <div class="flex flex-wrap gap-2">
          <el-button @click="test"> test </el-button>
          <el-date-picker
            v-model="state.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="截止时间"
            :default-value="state.defaultDateRange"
            :disabled-date="disabledDate"
          />
        </div>
        <div class="flex-auto flex overflow-auto border p-2">
          <el-timeline class="h-96">
            <el-timeline-item
              v-for="(activity, index) in state.activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              <template #default>
                <div class="">
                  {{ activity.content }}
                </div>
              </template>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-card>
    <el-dialog v-model="state.dialogFormVisible" title="选择下载日志类型">
      <el-form :model="form" ref="formRef">
        <el-form-item label="日志等级">
          <el-select v-model="form.logLevelType" placeholder="请选择日志等级">
            <el-option v-for="(logLevel, id) in state.logLevelInfo" :label="logLevel.describe" :value="id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeSelectLogLevelDialog">Cancel</el-button>
          <el-button type="primary" @click="confirmSelectLogLevel">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <a class="hidden" ref="downloadRef" href="/api/log-manager/download" download="日志.tar.gz"> 下载日志 </a>
  </div>
</template>
<script setup>
import { useFetch } from '@vueuse/core';
import { reactive, ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
const loadingDownloadLog = ref(false);
const loadingCompress = ref(false);
const loadingUploadLog = ref(false);
const downloadRef = ref();

const formRef = ref();
const form = reactive({
  logLevelType: '0',
});
const compactionUrl = computed(() => {
  return `/api/log-manager/compaction/${form.logLevelType}`;
});

const state = reactive({
  activities: [],
  dialogFormVisible: false,
  dateRange: [],
  defaultDateRange: [dayjs().subtract(1, 'd').startOf('d').toDate(), dayjs().startOf('d').toDate()],
  logLevelInfo: {
    0: { level: 'all', describe: '所有日志' },
    // 1: { level: 'rcs_dispatch', describe: '中控和调度日志' },
    // 2: { level: 'rcs_mqtt_udp', describe: '中控all mqtt udp 日志和调度日志' },
    // 3: { level: 'only_rcs', describe: '只下载中控all日志' },
  },
});

const getLogLevelUrl = computed(() => {
  // return `/api/log-manager/log-level-info`;
  return `/api/can-open/channel`;
});

const testFetch = useFetch('http://localhost:7200/api/can-open/channel', {}).get().json();
// const testFetch = useFetch('/api/can-open/channel', {}).get().json();

const test = () => {
  testFetch.execute();
};

const getLogLevel = useFetch(getLogLevelUrl, {}).get().json();
getLogLevel.onFetchFinally(() => {
  console.log('getLogLevel', getLogLevel.value);
  if (getLogLevel.data.value?.success && getLogLevel.data.value?.data) {
    state.logLevelInfo = getLogLevel.data.value.data;
  }
});

state.dateRange = state.defaultDateRange;

const disabledDate = (current) => {
  return current && current.getTime() > Date.now();
};
const payload = computed(() => {
  const [startDate, endDate] = state.dateRange;

  const startTime = dayjs().diff(dayjs(endDate), 'minute'); // 日志搜索的开始时间，与当前日期的时间差，单位分钟
  const endTime = dayjs().diff(dayjs(startDate), 'minute'); // 日志搜索的结束时间，与当前日期的时间差，单位分钟
  return { startTime, endTime };
});

const logCompaction = useFetch(compactionUrl, {}, { immediate: false }).post(payload).json();
logCompaction.onFetchFinally(() => {
  // console.log('logCompaction.onFetchFinally', logCompaction.data);
});

const showSelectLogLevelDialog = () => {
  state.dialogFormVisible = true;
};

const confirmSelectLogLevel = () => {
  state.dialogFormVisible = false;
  startCompress();
};

const closeSelectLogLevelDialog = () => {
  state.dialogFormVisible = false;
  formRef.value.resetFields();
  form.logLevelType = '0';
};

const startCompress = () => {
  loadingCompress.value = true;
  state.activities = [];
  logCompaction.execute();
  state.dialogFormVisible = false;
};
logCompaction.onFetchFinally(() => {
  loadingCompress.value = false;
  console.log('logCompaction', logCompaction.statusCode.value, logCompaction);
  // if (logCompaction.statusCode.value !== 200) {
  if (!/2\d./.test(logCompaction.statusCode.value)) {
    ElMessage.error('处理日志失败');
  }
  if (logCompaction.data.value.success) {
    autoUploadLog();
  }
});

const autoUploadLog = () => {
  ElMessageBox.confirm('日志压缩完成，是否上传日志到日志服务器？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      startUploadLog();
    })
    .catch(() => {
      ElMessageBox.confirm('是否下载日志？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          startDownloadLog();
        })
        .catch(() => {
          ElMessageBox.alert('请下载日志！', '提示', {
            confirmButtonText: '确定',
          });
        });
    });
};

const downloadLog = useFetch('/api/log-manager/download', {}, { immediate: false }).get().blob();

const startDownloadLog = () => {
  loadingDownloadLog.value = true;
  state.activities = [];
  downloadLog.execute();
};

downloadLog.onFetchFinally(() => {
  console.log('download finally:', downloadLog.statusCode.value, downloadLog.data.value);
  if (/2\d./.test(downloadLog.statusCode.value)) {
    downloadRef.value.href = window.URL.createObjectURL(downloadLog.data.value);
    downloadRef.value.download = `${createCurrentDateTime()}.tar.gz`;
    downloadRef.value.click();
    URL.revokeObjectURL(downloadRef.value.href);
  } else {
    ElMessage.error(`下载文件失败: ${downloadLog.statusCode.value}`);
  }
  loadingDownloadLog.value = false;
});

const uploadLog = useFetch('/api/log-manager/upload', {}, { immediate: false }).get().json();
const startUploadLog = () => {
  loadingUploadLog.value = true;
  state.activities = [];
  uploadLog.execute();
};
uploadLog.onFetchFinally(() => {
  console.log('upload finally:', uploadLog.data.value);
  ElMessage.success('上传日志操作完成');
  loadingUploadLog.value = false;
});

// const eventSource = new EventSource('/api/log-manager/sse');
// eventSource.onmessage = ({ data }) => {
//   console.log('New message', JSON.parse(data));
//   const { type, message } = JSON.parse(data).data;
//   state.activities.unshift({
//     timestamp: createCurrentDateTime(),
//     content: `${type}: ${message}`,
//   });
// };
const createCurrentDateTime = () => {
  return new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString();
};

// onMounted(() => {
//   console.log('mounted');
//   state.activities = Array(200).fill({
//     timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
//     content: '',
//   });
// });
</script>
