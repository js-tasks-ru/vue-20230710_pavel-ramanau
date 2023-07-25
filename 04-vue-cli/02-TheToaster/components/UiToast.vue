<template>
    <div
      class="toast"
      v-for="(messageItem, index) in messagesAll"
      :key="index"
      :class="messageItem.class"
    >
      <UiIcon class="toast__icon" :icon="messageItem.icon" />
      <span>{{ messageItem.message }}</span>
      <button class="btn_del" @click="closeToast(index)">
        <UiIcon class="toast__icon" icon="trash" />
      </button>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    messagesAll: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  methods:{
    closeToast(index) {
      this.messagesAll.splice(index, 1); // начиная с индекса index, удалить 1 элемент
    },
  },
};
</script>

<style scoped>
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
