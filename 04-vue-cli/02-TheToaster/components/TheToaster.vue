<template>
  <div class="toasts">
    <UiToast :messagesAll="messagesAll" />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  data() {
    return {
      messagesAll: [], //Сохраняем сообщения в общий массивв сообщений
    };
  },

  methods: {
    success(message, time) {  // Метод для добавления сообщения об успехе
      this.messagesAll.push({
      message,
      class: 'toast_success',
      icon: 'check-circle',
      time
    });
      setTimeout(() => {
        this.messagesAll.shift();
      }, time);
    },
    error(message, time) {    // Метод для добавления сообщения об ошибке  
      this.messagesAll.push({
      message,
      class: 'toast_error',
      icon: 'alert-circle',
      time
    });
      setTimeout(() => {
        this.messagesAll.shift();
      }, time);
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
