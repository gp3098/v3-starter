<template>
  <div class="container mx-auto w-full p-2 flex flex-col gap-4">
    <el-descriptions title="" border :column="2">
      <template v-for="(script, index) in data.scripts" :key="script.name">
        <el-descriptions-item :label="script.title">
          <el-button @click="selectScript(index)">选择</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="描述"> {{ script.desc }} </el-descriptions-item>
      </template>
    </el-descriptions>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>当前脚本: {{ data.currentScript.title }}</span>
        </div>
      </template>
      <div>
        <dynamic-script v-if="data.currentScript.name" :scriptInfo="data.currentScript"></dynamic-script>
        <component :is="allComponents[comName]" />
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import aboutVue from '../components/about.vue';
const allComponents = {
  aboutVue,
};
const comName = 'aboutVue';

const scripts = [
  {
    title: '一键获取电压扭矩关系信息',
    desc: '一键获取电压扭矩关系信息',
    name: 'get_voltage_torque_relation',
    params: [
      {
        name: 'file_name',
        value: '', //url
        component_type: 'uploader',
      },
    ],
    output: {},
  },
  {
    title: '软件暂停动力电急停触发恢复时间',
    desc: '软件暂停动力电急停触发恢复时间',
    name: 'get_soft_stop_time',
    params: [
      {
        name: 'file_name',
        value: '', //url
        component_type: 'uploader',
      },
      {
        name: 'start_time',
        value: '',
        component_type: 'timepicker',
      },
      {
        name: 'end_time',
        value: '',
        component_type: 'timepicker',
      },
    ],
  },
  {
    title: '导出机器人扭矩图',
    desc: '导出机器人扭矩图',
    name: 'export_robot_torque_chart',
    params: [
      {
        name: 'file_name',
        value: '', //url
        component_type: 'uploader',
      },
      {
        name: 'start_time',
        value: '',
        component_type: 'timepicker',
      },
      {
        name: 'end_time',
        value: '',
        component_type: 'timepicker',
      },
    ],
  },
  {
    title: '系统事件时序图',
    desc: '系统事件时序图',
    name: 'export_system_event_chart',
  },
];

const data = reactive({
  scripts,
  currentScript: { title: '暂未选择脚本' },
});

const selectScript = (index) => {
  data.currentScript = data.scripts[index];
};
</script>
