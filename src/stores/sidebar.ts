import { defineStore } from 'pinia';
import { isCollapse, setCollapse } from '../utils/tools';
export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isCollapse: isCollapse(),
  }),
  getters: {},
  actions: {
    collapseSideBar() {
      this.isCollapse = !this.isCollapse;
      setCollapse(this.isCollapse);
    },
  },
});
