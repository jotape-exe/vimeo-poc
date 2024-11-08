class VimeoService {
  constructor(axiosInstance) {
    this.axios = axiosInstance
  }

  async listarVideos() {
    try {
      const response = await this.axios.get(
        `/users/${import.meta.env.VITE_VIMEO_USER_ID}/projects/${
          import.meta.env.VITE_VIMEO_PROJECT_ID
        }/videos`
      )
      return response.data
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error)
      throw error
    }
  }
}

export default VimeoService
