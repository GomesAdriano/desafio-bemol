/* eslint-disable react/prop-types */
import Parcela from '../Parcela';
import './styles.css';

export default function CardCompra({ data }) {
  const dataFormatada = new Date(data.compra.data_compra).toLocaleDateString('pt-BR');

  return (
    <div className='card-pedido'>
      <div className='imagem-pedido'>
        <img src={data.produto.imagem} alt={data.produto.nome} />
      </div>
      <div className='infos-pedido'>
        <p>{data.produto.nome}</p>
        <span>{data.produto.descricao}</span>
      </div>
      <div className='infos-compra'>
        <div className='flex'>
          <div>
            <strong>Valor pago:</strong>
            <span> R$ {(data.compra.valor_total).replace('.', ',')}</span>
          </div>
          <div>
            <strong>Data da compra:</strong>
            <span>{dataFormatada}</span>
          </div>
        </div>
        <hr />
        <div className='titulo-parcelas'>
          <span>Parcelas</span>
          <span>Data de Vencimento</span>
          <span></span>
        </div>
        <div className='area-parcelas'>
          {data.parcelas.map((parcela, index) => {
            const parcelaAnterior = data.parcelas[index - 1];
            const isProximaParcela = !parcela.paga && (!parcelaAnterior || parcelaAnterior.paga);
            return <Parcela dataParcela={parcela} dataCompra={data.compra} isProximaParcela={isProximaParcela} key={parcela.parcela_id} />;
          })}
        </div>
      </div>
    </div>
  );
}
