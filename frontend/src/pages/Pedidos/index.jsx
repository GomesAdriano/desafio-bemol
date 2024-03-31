/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardCompra from "../../components/CardCompra";
import Header from "../../components/Header";
import { getCompras } from "../../services/compra.service";
import './styles.css'
import { getCreditoCliente } from "../../services/credito.service";
import { pagarParcela } from '../../services/parcela.service'
import { toast } from 'react-toastify';

export default function Pedidos() {

  const [pedidos, setPedidos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const resgatarSaldoCliente = async () => {
    const credito = await getCreditoCliente();
    setSaldo(credito);
  }

  const listarPedidos = async () => {
    const res = await getCompras();
    setPedidos(res.data.pedido);
  }

  useEffect(() => {
    resgatarSaldoCliente();
    listarPedidos();
  }, []);

  const atualizarSaldo = (novoSaldo) => {
    setSaldo(novoSaldo);
  };

  const efetuarPagamentoParcela = async (parcela) => {
    const res = await pagarParcela(parcela);
    if (res.includes('sucesso')) {
      const novoSaldo = parseFloat(saldo) + parseFloat(parcela.valor_parcela);
      if (!isNaN(novoSaldo)) {
        atualizarSaldo(novoSaldo.toFixed(2));
      } else {
        console.error("Erro ao atualizar saldo. O novo saldo é inválido.");
      }
      return toast.success(res);
    }
  }

  useEffect(()=>{
    listarPedidos()
  },[efetuarPagamentoParcela])
  
  return (
    <>
    <Header />
    <div className="area-pedidos">
      <div className="saldo-pedidos">
        <strong>Saldo:</strong>
        <span>R$ {(Number(saldo)).toFixed(2).replace('.', ',')}</span>
      </div>
      {
        pedidos && pedidos.map((pedido, index) => (
          <CardCompra key={index} data={pedido} efetuarPagamentoParcela={efetuarPagamentoParcela}/>
        ))
      }
    </div>
    </>
  )
}
