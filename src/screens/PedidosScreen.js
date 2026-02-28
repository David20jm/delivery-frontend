import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

const PedidosScreen = () => {
  const { token } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerPedidos = async () => {
    try {
      const res = await fetch("http://192.168.0.107:5000/api/pedidos/mis-pedidos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const socketRef = useRef(null);

  useEffect(() => {
    obtenerPedidos();

    socketRef.current = io("http://192.168.0.107:5000");

    socketRef.current.on("connect", () => {
      console.log("🟢 Socket conectado");
    });

    socketRef.current.on("pedido:estado_usuario", (data) => {
      console.log("📦 Estado actualizado:", data);

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === data.pedidoId ? { ...p, estado: data.estado } : p
        )
      );
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (pedidos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No tienes pedidos todavía</Text>
      </View>
    );
  }

  const estadoColor = {
    pendiente: "#f0ad4e",
    aceptado: "#5bc0de",
    asignado: "#0275d8",
    en_camino: "#5cb85c",
    entregado: "#2ecc71",
    cancelado: "#e74c3c",
  };

  return (
    <FlatList
      data={pedidos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.id}>Pedido #{item.id}</Text>
            <Text style={[styles.estado, { color: estadoColor[item.estado] || "#333", fontWeight: "bold" },]} >
              {item.estado.replace("_", " ").toUpperCase()}
            </Text>
          </View>
          <ProgressBarPedido estado={item.estado} />

          {item.items.map((i, index) => (
            <View key={index} style={styles.producto}>
              <Image
                source={{ uri: `http://192.168.0.107:5000/${i.producto.imagen_url}` }}
                style={styles.img}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{i.producto.nombre}</Text>
                <Text style={styles.detalle}>
                  {i.cantidad} x ${i.producto.precio}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${item.total}</Text>
          </View>
        </View>
      )}
    />
  );
};

const pasos = ["pendiente", "aceptado", "asignado", "en_camino", "entregado"];

const ProgressBarPedido = ({ estado }) => {
  const pasoActual = pasos.indexOf(estado);

  return (
    <View style={styles.progressContainer}>
      {pasos.map((paso, index) => {
        const activo = index <= pasoActual;
        return (
          <React.Fragment key={paso}>
            <View
              style={[
                styles.circulo,
                { backgroundColor: activo ? "#2ecc71" : "#ccc" },
              ]}
            />
            {index < pasos.length - 1 && (
              <View
                style={[
                  styles.linea,
                  { backgroundColor: index < pasoActual ? "#2ecc71" : "#ccc" },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: { fontSize: 18, color: "#777" },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  circulo: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  linea: {
    flex: 1,
    height: 4,
  },

  card: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  id: { fontWeight: "bold", fontSize: 16 },
  estado: { fontSize: 12, color: "#007bff" },

  producto: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  img: { width: 40, height: 40, borderRadius: 6, marginRight: 8 },

  nombre: { fontSize: 14, fontWeight: "bold" },
  detalle: { fontSize: 12, color: "#666" },

  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 6,
  },
  total: { fontWeight: "bold", fontSize: 15 },
});

export default PedidosScreen;
