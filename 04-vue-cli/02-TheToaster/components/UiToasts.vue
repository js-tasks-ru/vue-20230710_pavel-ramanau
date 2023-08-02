<template>
  <div class="toast" v-for="(messageItem, index) in messages" :key="index" :class="getToastClass(messageItem.type)">
    <UiIcon class="toast__icon" :icon="getToastIcon(messageItem.type)" />
    <span>{{ messageItem.message }}</span>
    <button class="btn_del" @click="closeToast(index)">
      <UiIcon class="toast__icon iconTrash" icon="trash" />
    </button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import { ToastType } from '@/constants/constants.js';

export const ToastClassMap = {
  [ToastType.SUCCESS]: 'toast_success',
  [ToastType.ERROR]: 'toast_error',
};

export const ToastIconMap = {
  [ToastType.SUCCESS]: 'check-circle',
  [ToastType.ERROR]: 'alert-circle',
};

export default {
  name: 'UiToasts',

  components: { UiIcon },

  props: {
    messages: {
      type: Array,
      default: function () {
        return [];
      },
    },
  
  },

  emits: ['close-toast'],

  methods: {
    closeToast(index) {
      this.$emit("close-toast", index); 
    },
    getToastClass(type) {
      return ToastClassMap[type];
    },
    getToastIcon(type) {
      return ToastIconMap[type];
    },
  },
};
</script>

<style scoped>
.iconTrash {
  filter: hue-rotate(90deg); /* 'Красный' цвет */
}
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}
.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
.btn_del {
  border: none;
  background: transparent;
  margin: 0 -10px 0 10px;
}
</style>
