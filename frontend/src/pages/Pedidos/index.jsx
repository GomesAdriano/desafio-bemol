import { useEffect, useState } from "react";
import CardCompra from "../../components/CardCompra";
import Header from "../../components/Header";
import { getCompras } from "../../services/compra.service";
import './styles.css'

export default function Pedidos() {

  const [pedidos, setPedidos] = useState([]);

  const listarPedidos = async () => {
    const res = await getCompras();
    setPedidos(res.data.pedido);
  }

  useEffect(() => {
    listarPedidos();
  }, []);
  
  return (
    <>
    <Header />
    <div className="area-pedidos">
      <div className="saldo-pedidos">
        <strong>Saldo:</strong>
        <span>R$ 1000,00</span>
      </div>
      {
        pedidos && pedidos.map((pedido, index) => (
          <CardCompra key={index} data={pedido} />
        ))
      }
    </div>
    </>
  )
}
