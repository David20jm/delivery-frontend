import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import PedidosScreen from "../screens/PedidosScreen";
import CartScreen from "../screens/CartScreen";
import NotificacionesScreen from "../screens/NotificacionesScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { totalItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Inicio") iconName = "home-outline";
          else if (route.name === "Pedidos") iconName = "list-outline";
          else if (route.name === "Carrito") iconName = "cart-outline";
          else if (route.name === "Notificaciones") iconName = "notifications-outline";
          else if (route.name === "Perfil") iconName = "person-outline";

          // 👇 Si no es carrito, ícono normal
          if (route.name !== "Carrito") {
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          // 🛒 Carrito con badge
          return (
            <View style={{ width: size, height: size }}>
              <Ionicons name={iconName} size={size} color={color} />

              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Notificaciones" component={NotificacionesScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "#e63946",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
