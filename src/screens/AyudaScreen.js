import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AyudaScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* 🔹 Header con icono cerrar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ayuda</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Contenido */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Aquí encontrarás preguntas frecuentes y soporte.
      </Text>
    </View>
  );
};

export default AyudaScreen;
