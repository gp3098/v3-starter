<template>
  <div class="flex h-screen w-screen">
    <side-bar />
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
