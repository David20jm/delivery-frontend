import axios from "axios";

const API_URL = "http://192.168.0.107:5000/api/pedidos";

export const crearPedido = async (userId, carrito, total) => {
  const pedido = {
    userId,
    items: carrito,
    total,
    metodo_pago: "efectivo"
  };

  const res = await axios.post(API_URL, pedido);
  return res.data;
};

export const obtenerPedidosPorUsuario = async (userId) => {
  const res = await axios.get(`${API_URL}/usuario/${userId}`);
  return res.data;
};
