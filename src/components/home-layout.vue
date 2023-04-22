<template>
  <div class="flex h-screen w-screen">
    <sidebar />
    <div class="flex-auto flex flex-col h-full">
      <layout-header />
      <section class="app-main flex-auto flex flex-col">
        <router-view v-slot="{ Component }" :key="$route.path">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </section>

      <!-- <layout-footer /> -->
    </div>
  </div>
</template>

<script setup>
//https://mp.weixin.qq.com/s/IppvX7BmLkuKGArnnfCQow
import menuFoldOutlined from '~icons/ant-design/menu-fold-outlined';
import location from '~icons/bytesize/location';
import { ref } from 'vue';
import LayoutFooter from './layout-footer.vue';
// import { useI18n } from 'vue-i18n';
// const { t, locale } = useI18n({
//   inheritLocale: true,
// });
// defineProps({
//   msg: String,
// });

const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath);
};
const toggleExpand = () => {
  // isCollapse.value = isCollapse.value <= 1 ? isCollapse.value + 1 : 0;
  isCollapse.value = !isCollapse.value;
  // console.log(isCollapse.value);
};

const showTest = ref(true);

const test = () => {
  showTest.value = !showTest.value;
};
</script>
