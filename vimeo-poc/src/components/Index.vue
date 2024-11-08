<template>
  <div>
    <h1 class="title">Lista de Vídeos</h1>

    <button @click="handleGetVideos" class="update-button">
      Atualizar Vídeos
    </button>

    <VideoContainer :isLoading="isLoading">
      <div class="video-row">
        <div v-for="(video, index) in videos" :key="index" class="video-item">
          <h3>{{ video.name }}</h3>

          <div
            ref="videoEmbed"
            v-html="video.embed.html"
            id="video-embed"
          ></div>
        </div>
      </div>
    </VideoContainer>
  </div>
</template>

<script setup>
import VideoContainer from "@/components/VideoContainer.vue";
import VimeoService from "@/http/api/vimeo-service";
import axiosInstance from "@/http/http-client";
import { nextTick, ref } from "vue";

const vimeoService = new VimeoService(axiosInstance)
const isLoading = ref(false)
const videos = ref([])
const videoEmbed = ref(null)

const handleGetVideos = async () => {
  isLoading.value = true
  try {
    const response = await vimeoService.listarVideos()
    videos.value = response.data
  } catch (error) {
    console.error("Erro ao buscar vídeos", error)
  } finally {
    isLoading.value = false
  }
}

nextTick(() => {
  if (videoEmbed.value) {
    const iframe = videoEmbed.value.querySelector("iframe")
    if (iframe) {
      iframe.style.width = "30vh"
      iframe.style.height = "auto"
      iframe.style.maxHeight = "30vw" 
    }
  }
})
</script>

<style scoped>
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.update-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.update-button:hover {
  background-color: #45a049;
}

.update-button:active {
  transform: scale(0.98);
}

/* Contêiner flexível para os vídeos */
.video-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Estilo de cada item de vídeo */
.video-item {
  flex: 1 1 300px; /* Flexível, mas com tamanho mínimo de 300px */
  margin-top: 20px;
  max-width: 640px; /* Limita a largura máxima do vídeo */
}

/* Loader de esqueleto (shimmer effect) */
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
  width: 100%;
  height: 360px;
  border: none;
  border-radius: 8px;
}

/* Estilo para os iframes inseridos via v-html */
#videoContainer iframe {
  width: 70%; /* 30% menor que o original */
  height: auto;
  max-height: 70vw; /* Para garantir que o tamanho seja proporcional */
  border: none;
  border-radius: 8px;
}

#videoContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
</style>
