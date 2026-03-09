import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito al iniciar
  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const carritoGuardado = await AsyncStorage.getItem("cart");
      if (carritoGuardado) {
        setCart(JSON.parse(carritoGuardado));
      }
    } catch (error) {
      console.log("Error cargando carrito:", error);
    }
  };
  //Guardar carrito cuando cambie
  useEffect(() => {
    guardarCarrito();
  }, [cart]);

  const guardarCarrito = async () => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.log("Error guardando carrito:", error);
    }
  };

  const addToCart = (producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        //ahora suma la cantidad seleccionada
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      //si es nuevo, lo agrega con la cantidad seleccionada
      return [...prev, { ...producto, cantidad: producto.cantidad }];
    });
  };
  //Actualizar cantidad desde el carrito
  const updateQuantity = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(productoId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };
  //eliminar producto del carrito
  const removeFromCart = (productoId) => {
    setCart((prev) => prev.filter((item) => item.id !== productoId));
  };

  const clearCart = () => { setCart([]); };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
