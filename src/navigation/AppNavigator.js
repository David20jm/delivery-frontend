import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { usuario, token, cargando } = useContext(AuthContext);

  if (cargando) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario && token ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}

      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
