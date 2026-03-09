import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.0.107:5000/api", // Android Emulator
  // Si usas Expo Go en tu celular real, cambia a tu IP local, ej: http://192.168.1.5:5000/api
});

// Interceptor para incluir el token en cada request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
