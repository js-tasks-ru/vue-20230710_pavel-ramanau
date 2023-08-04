<template>
  <TheToaster ref="toaster" />
  <p>
    <button type="button" @click="handleSuccessClick">Add Success Message</button>
    <button type="button" @click="handleErrorClick">Add Error Message</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster.vue';
import { ToastType } from './constants/constants.js';

export default {
  name: 'App',

  components: { TheToaster },
  data() {
    return {
      toasterRef: 'toaster', 
    };
  },
  methods: {
    handleSuccessClick() {
      this.$refs.toaster.success(ToastType.SUCCESS + ' ' + new Date().toLocaleTimeString());
    },

    handleErrorClick() {
      this.$refs.toaster.error(ToastType.ERROR + ' ' + new Date().toLocaleTimeString());
    },
  },
};
</script>
