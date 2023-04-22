<template>
  <pre>
    <!-- {{ JSON.stringify(routes, null, 4) }} -->
    index
    {{ t('ok') }}
  </pre>
</template>

<script setup>
import { routes } from '../router';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n({
  // inheritLocale: true,
});
</script>

<route lang="yaml">
meta:
  layout: home
  title: 首页
</route>
