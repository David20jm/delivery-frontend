import { useEffect, useState } from "react";
import { obtenerPedidosPorUsuario } from "../services/PedidoService";

export default function HistorialPedidos({ userId }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const data = await obtenerPedidosPorUsuario(userId);
      setPedidos(data);
    };
    fetchPedidos();
  }, [userId]);

  return (
    <div>
      <h2>📋 Mis pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            #{pedido.id} - {pedido.estado} - ${pedido.total}  
            ({pedido.metodo_pago})
          </li>
        ))}
      </ul>
    </div>
  );
}
