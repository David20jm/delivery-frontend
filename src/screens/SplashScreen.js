import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo animado */}
      <LottieView
        source={require("../../assets/animations/Moon-Loader.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      {/* Texto elegante */}
      <Text style={styles.title}>DeliveryApp</Text>
      <ActivityIndicator size="large" color="#FF6B00" style={{ marginTop: 20 }} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 20,
  },
});
