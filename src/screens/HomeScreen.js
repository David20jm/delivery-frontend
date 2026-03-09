// frontend/src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://192.168.0.107:5000/api/productos");
        const data = await response.json();

        if (Array.isArray(data)) setProductos(data);
        else if (Array.isArray(data.productos)) setProductos(data.productos);
        else setProductos([]);
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Filtro por búsqueda
  let productosFiltrados = productos.filter((p) =>
    p.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtro por tipo
  if (filtroTipo !== "Todos") {
    productosFiltrados = productosFiltrados.filter(
      (p) => p.tipo?.toLowerCase() === filtroTipo.toLowerCase()
    );
  }

  const categorias = [
  ...new Set(
    productosFiltrados
      .map((p) => p.categoria)
      .filter((c) => typeof c === "string" && c.trim() !== "")
  ),
];


  const renderProducto = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ProductDetail", { producto: item })}
    >
      <Image source={{ uri: item.imagen_url }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={1}>
        {item.nombre}
      </Text>
      <Text style={styles.productPrice}>${item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 🔍 Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar productos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* 🔘 Botones de filtro */}
      <View style={styles.filtrosContainer}>
        {["Todos", "Retornables", "No-retornables"].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.chip,
              filtroTipo === tipo && styles.chipActivo,
            ]}
            onPress={() => setFiltroTipo(tipo)}
          >
            <Text
              style={[
                styles.chipTexto,
                filtroTipo === tipo && styles.chipTextoActivo,
              ]}
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🖼️ Carousel de promociones */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {[1, 2, 3].map((item) => (
          <Image
            key={item}
            source={{
              uri: `https://via.placeholder.com/300x150?text=Promo+${item}`,
            }}
            style={styles.carouselImage}
          />
        ))}
      </ScrollView>

      {/* 📦 Secciones por categoría */}
      {categorias.map((categoria) => {
        const productosCategoria = productosFiltrados.filter(
          (p) => p.categoria === categoria
        );

        if (productosCategoria.length === 0) return null;

        return (
          <View key={categoria} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{String(categoria)}</Text>
            </View>
            <FlatList
              data={productosCategoria}
              renderItem={renderProducto}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      })}

      {loading && <Text style={styles.loadingText}>Cargando productos...</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  chipActivo: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  chipTexto: {
    fontSize: 14,
    color: "#333",
  },
  chipTextoActivo: {
    color: "#fff",
    fontWeight: "bold",
  },
  carousel: { marginBottom: 20 },
  carouselImage: {
    width: width - 20,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    alignItems: "center",
    width: 120,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: { fontSize: 14, fontWeight: "500", textAlign: "center" },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "red" },
  loadingText: { textAlign: "center", marginVertical: 20 },
});

export default HomeScreen;
