import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();
  const { cart, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [pedidoCreado, setPedidoCreado] = useState(false);

  useEffect(() => {
    crearPedido();
  }, []);

  const crearPedido = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://192.168.0.107:5000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          direccion: "Mi ubicación registrada", // luego lo haces dinámico
          items: cart.map((item) => ({
            productoId: item.id,
            cantidad: item.cantidad,
          })),
        }),
      });

      const data = await res.json();
      console.log("RESPUESTA PEDIDO:", data);

      if (!res.ok) {
        throw new Error(data.error || "Error al crear pedido");
      }

      clearCart();
      setPedidoCreado(true);
    } catch (error) {
      console.log("ERROR PEDIDO:", error);
      Alert.alert("Error", "No se pudo crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={{ marginTop: 10 }}>Enviando pedido...</Text>
        </>
      ) : pedidoCreado ? (
        <>
          <Text style={styles.title}>✅ Pedido confirmado</Text>
          <Text style={styles.subtitle}>
            Gracias por tu compra, tu pedido llegará pronto 🚚
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("AppStack", {
                screen: "Main",
                params: {
                  screen: "HomeStack",
                  params: { screen: "Home" },
                },
              })
            }
          >
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ color: "red" }}>No se pudo confirmar el pedido</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#007bff", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default OrderConfirmationScreen;
