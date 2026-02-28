import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function PerfilScreen() {
  const { usuario, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header con avatar y datos */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }} // 🔹 Puedes reemplazar con avatar real
          style={styles.avatar}
        />
        <Text style={styles.name}>{usuario?.nombre || "Usuario"}</Text>
        <Text style={styles.email}>{usuario?.correo || "correo@ejemplo.com"}</Text>
      </View>

      {/* Menú de opciones */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Pedidos")}
        >
          <Text style={styles.menuText}>📦 Mis pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Configuracion")}
        >
          <Text style={styles.menuText}>⚙️ Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Ayuda")}
        >
          <Text style={styles.menuText}>❓ Ayuda</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>🚪 Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#333" },
  email: { fontSize: 16, color: "#666" },

  menu: { marginTop: 20 },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { fontSize: 18, color: "#333" },

  logoutButton: {
    marginTop: "auto",
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
