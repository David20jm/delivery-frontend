import React, { useEffect, useRef } from "react";
import { NavigationContainer, DefaultTheme as NavTheme } from "@react-navigation/native";
import { DefaultTheme as PaperTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/navigation/AppNavigator";

const CombinedTheme = {
  ...NavTheme,
  colors: {
    ...NavTheme.colors,
    ...PaperTheme.colors,
  },
};

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 🔔 Cuando llega notificación (app abierta)
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log("🔔 Notificación recibida:", notification);
      });

    // 👉 Cuando el usuario toca la notificación
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log("📲 Usuario abrió notificación:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={CombinedTheme}>
        <AuthProvider>
          <CartProvider>
            <PaperProvider theme={CombinedTheme}>
              <AppNavigator />
            </PaperProvider>
          </CartProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
