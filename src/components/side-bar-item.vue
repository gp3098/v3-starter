<template>
  <template v-if="route.children">
    <el-sub-menu :index="route.path" :key="route.path">
      <template #title>
        <span>{{ route.meta.title }}</span>
      </template>
      <side-bar-item v-for="item in route.children" :route="item" />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item v-if="!route.hide" :index="route.path" :key="route.path" :route="route">
      {{ route?.meta?.title }}
    </el-menu-item>
  </template>
</template>

<script setup>
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: '',
  },
});
const { route, basePath } = props;
console.log('props: route: ', props);

// function showSub({ route, basePath }) {
//   console.log('route: ', route, 'basePath: ', basePath, 'selfPath:', route.path);
//   if (route?.children) {
//     // console.log('original basePath: ', basePath);
//     // console.log('route.path: ', route.path);
//     // console.log('index: ', basePath + route.path);
//     // console.log('title: ', route.meta.title);

//     for (const item of route.children) {
//       // showSub({ route: item, basePath: basePath + route.path + item.path });
//       showSub({ route: item, basePath: basePath });
//     }
//   } else {
//     const index = basePath + route?.path;
//     const title = route?.meta.title;
//     // console.log('index: ', index);
//     // console.log('title: ', title);
//   }
//   console.log('\n');
// }
// showSub(props);
</script>
