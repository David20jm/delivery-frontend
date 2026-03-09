import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CatalogScreen from "../screens/CatalogScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: "Catálogo" }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Detalle del Producto" }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{title:"Carrito"}} />
    </Stack.Navigator>
  );
};

export default HomeStack;
