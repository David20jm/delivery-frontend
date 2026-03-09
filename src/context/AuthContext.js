import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { registerForPushNotificationsAsync } from "../utils/notifications";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  const API_URL = "http://192.168.0.107:5000/api/auth";
  const API_BASE = "http://192.168.0.107:5000/api";

  /* ================= CARGAR SESIÓN ================= */
  useEffect(() => {
    const cargarSesion = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem("token");
        const usuarioGuardado = await AsyncStorage.getItem("usuario");

        if (tokenGuardado && usuarioGuardado) {
          setToken(tokenGuardado);
          setUsuario(JSON.parse(usuarioGuardado));
          axios.defaults.headers.common["Authorization"] = `Bearer ${tokenGuardado}`;
        }
      } catch (error) {
        console.error("Error al cargar sesión:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarSesion();
  }, []);

  /* ================= PUSH TOKEN ================= */
  useEffect(() => {
    const enviarPushToken = async () => {
      if (!token) return;

      const expoPushToken = await registerForPushNotificationsAsync();

      if (expoPushToken) {
        await fetch(`${API_BASE}/usuarios/push-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pushToken: expoPushToken }),
        });
      }
    };

    enviarPushToken();
  }, [token]);

  /* ================= LOGIN ================= */
  const login = async (correo, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { correo, password });
      const { token, usuario } = res.data;

      setToken(token);
      setUsuario(usuario);

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error;
    }
  };

  /* ================= REGISTER ================= */
  const register = async (nombre, correo, password) => {
    try {
      await axios.post(`${API_URL}/register`, { nombre, correo, password });
      await login(correo, password); // auto-login
    } catch (error) {
      console.error("Error en registro:", error.response?.data || error.message);
      throw error;
    }
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      setUsuario(null);
      setToken(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuario");
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargando,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
