<template>
  <div class="toasts">
    <UiToasts :messages="messages" @close-toast="handleCloseToast" />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToasts from './UiToasts.vue';
import { ToastType, ToastIconMap } from '@/constants/constants.js';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToasts },

  data() {
    return {
      messages: [], //Сохраняем сообщения в общий массивв сообщений
    };
  },

  methods: {
    addToast(type, message) {
      // проверяем, есть ли тост с такими же type и message в массиве messages перед добавлением нового тоста. 
      // Если такой тост уже есть, то новый не добавляется, а существующему обновляется таймер удаления.
      const existingToast = this.messages.find((toast) => toast.type === type && toast.message === message);

      if (!existingToast) {
        const toast = {
          type,
          message,
          icon: ToastIconMap[type],
        };

        this.messages.push(toast);

        setTimeout(() => {
          const index = this.messages.indexOf(toast);
          if (index !== -1) {
            this.messages.splice(index, 1);
          }
        }, 5000);
      }
    },

    success(message) {
      this.addToast(ToastType.SUCCESS, message);
    },
    error(message) {
      this.addToast(ToastType.ERROR, message);
    },
    handleCloseToast(index) {
      // обновляем массив сообщений, чтобы удалить закрытый тост
      this.messages.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
