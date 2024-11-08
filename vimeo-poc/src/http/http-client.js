import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.vimeo.com",
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_VIMEO_TOKEN}`,
    "Content-Type": "application/json",
  },
})

export default axiosInstance
