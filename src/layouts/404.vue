<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:gray-200">
    <div class="text-4xl">
      <div class="inline-block" />
    </div>
    <RouterView />
    <div>
      <el-button class="btn text-sm m-3 mt-8" @click="router.back()">
        {{ t('button.back') }}
      </el-button>
    </div>
  </main>
</template>
