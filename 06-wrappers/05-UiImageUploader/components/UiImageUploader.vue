<template>
  <div class="image-uploader">
    <label
      :class="[
        'image-uploader__preview',
        { 'image-uploader__preview-loading': isLoading },
      ]"
      :style="{ '--bg-url': previewUrl }"
      @click="handleImageClick"
    >
      <span class="image-uploader__text">{{ buttonText }}</span>
      <input
        type="file"
        accept="image/*"
        v-bind="$attrs"
        @change="handleFileChange"
        class="image-uploader__input"
        ref="fileInput"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "UiImageUploader",

  inheritAttrs: false,

  props: {
    uploader: {
      type: Function,
    },
    preview: {
      type: String,
      default: null,
    },
  },

  emits: ["select", "upload", "error", "remove"],

  data() {
    return {
      selectedImage: this.preview,
      isLoading: false,
    };
  },

  computed: {
    previewUrl() {
      return this.selectedImage ? `url('${this.selectedImage}')` : "none";
    },
    buttonText() {
      if (this.isLoading) {
        return "Загрузка...";
      } else if (this.selectedImage) {
        return "Удалить изображение";
      } else {
        return "Загрузить изображение";
      }
    },
  },

  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = URL.createObjectURL(file);
        this.$refs.fileInput.value = ""; 
        this.$emit("select", file);
        if (this.uploader) {
          this.uploadImage(file);
        }
      }
    },

    async uploadImage(file) {
      this.isLoading = true;
      try {
        const result = await this.uploader(file);
        this.isLoading = false;
        this.$emit("upload", result);
      } catch (error) {
        this.isLoading = false;
        this.selectedImage = null; 
        this.$emit("error", error);
      }
    },

    handleImageClick() {
      if (!this.isLoading) {
        if (this.selectedImage) {
          this.selectedImage = null;
          this.$emit("remove");
        } else {
          this.$refs.fileInput.click();
        }
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
