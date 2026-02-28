import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigation = useNavigation();

  // Calcular subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const envio = 0;
  const impuestos = subtotal * 0.1; // ejemplo 10%
  const total = subtotal + envio + impuestos;

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>🛒 Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `http://192.168.0.107:5000/${item.imagen_url}` }}
              style={styles.itemImage}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.nombre}</Text>
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.cantidad - 1)}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.cantidad}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.cantidad + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemPrice}>
              ${(item.precio * item.cantidad).toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.remove}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        // Encabezado arriba de la lista
        ListHeaderComponent={
          <View>
            <TouchableOpacity style={styles.section}>
              <Text style={styles.sectionLabel}>ENVÍO</Text>
              <Text style={styles.sectionValue}>Añadir dirección de envío</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section}>
              <Text style={styles.sectionLabel}>ENTREGA</Text>
              <Text style={styles.sectionValue}>
                Gratis · Estándar | 3-4 días
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section}>
              <Text style={styles.sectionLabel}>PAGO</Text>
              <Text style={styles.sectionValue}>Visa ••••1234</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section}>
              <Text style={styles.sectionLabel}>PROMOCIONES</Text>
              <Text style={styles.sectionValue}>
                Aplicar código promocional
              </Text>
            </TouchableOpacity>

            <View style={styles.itemsContainer}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                ARTÍCULOS
              </Text>
            </View>
          </View>
        }
        // Footer con resumen + botón
        ListFooterComponent={
          <>
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text>Subtotal ({cart.length})</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Total de envío</Text>
                <Text>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text>Impuestos</Text>
                <Text>${impuestos.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, { marginTop: 10 }]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => navigation.navigate("OrderConfirmation")}
            >
              <Text style={styles.orderButtonText}>Haz un pedido</Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#555" },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionLabel: { fontSize: 12, color: "#999" },
  sectionValue: { fontSize: 16, color: "#333" },
  itemsContainer: { marginTop: 10, paddingHorizontal: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemDesc: { fontSize: 14, color: "#777" },
  itemPrice: { fontSize: 16, fontWeight: "bold", marginRight: 8 },
  remove: { fontSize: 20, color: "#e63946" },
  summary: { padding: 16, borderTopWidth: 1, borderTopColor: "#eee" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: { fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontSize: 16, fontWeight: "bold" },
  orderButton: {
    backgroundColor: "black",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    borderRadius: 8,
  },
  orderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  qtyContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 5,
},
qtyBtn: {
  backgroundColor: "#eee",
  width: 30,
  height: 30,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 6,
},
qtyText: {
  fontSize: 18,
  fontWeight: "bold",
},
qtyNumber: {
  marginHorizontal: 10,
  fontSize: 16,
  fontWeight: "bold",
},
});

export default CartScreen;
