import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CartContext } from "../context/CartContext";

const ProductDetailScreen = ({ route }) => {
  const { producto } = route.params;
  const { addToCart } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = () => {
    addToCart({ ...producto, cantidad });
    Alert.alert(
      "✅ Producto agregado",
      `${producto.nombre} x${cantidad} está en tu carrito`
    );
  };

  return (
    <View style={styles.container}>
      {/* Imagen */}
      <Image
  source={{ uri: "https://via.placeholder.com/300" }}
  style={styles.image}
/>

      {/* Nombre */}
      <Text style={styles.title}>{producto.nombre}</Text>

      {/* Precio */}
      <Text style={styles.price}>${producto.precio}</Text>

      {/* Descripción */}
      <Text style={styles.description}>{producto.descripcion}</Text>

      {/* Contador */}
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton} onPress={disminuir}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{cantidad}</Text>

        <TouchableOpacity style={styles.counterButton} onPress={aumentar}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Agregar */}
      <TouchableOpacity style={styles.button} onPress={agregarAlCarrito}>
        <Text style={styles.buttonText}>Agregar al Carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  counterButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: "auto", // 🔹 empuja el botón al fondo
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
