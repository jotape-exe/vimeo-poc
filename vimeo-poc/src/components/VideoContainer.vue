<!-- VideoContainer.vue -->
<template>
  <div class="video-container">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>
.video-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.video-item {
  flex: 1 1 300px;
  margin-top: 20px;
  max-width: 640px;
}

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-item {
  background-color: #e0e0e0;
  height: 180px;
  border-radius: 5px;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

iframe {
  width: 4rem;
  height: 360px;
  border: none;
  border-radius: 8px;
}
</style>
