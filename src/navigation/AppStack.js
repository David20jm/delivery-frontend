import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ConfiguracionScreen from "../screens/ConfiguracionScreen";
import AyudaScreen from "../screens/AyudaScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs principales */}
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* Ejemplo: detalle de producto */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Configuracion" component={ConfiguracionScreen} options={{title:"Configuacion"}}  />
      <Stack.Screen name="Ayuda" component={AyudaScreen} options={{title:"Ayuda"}}  />
    </Stack.Navigator>
  );
}
