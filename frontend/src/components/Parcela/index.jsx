/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import './styles.css'
import { Slide, ToastContainer } from 'react-toastify';

export default function Parcela({ dataParcela, dataCompra, isProximaParcela, efetuarPagamentoParcela }) {

  return (
    <div className='box-parcela'>
      <div className='column'>
        <strong>Parcela {dataParcela.numero_parcela}: </strong>
        <span>R$ {dataParcela && dataParcela.valor_parcela.replace('.', ',')}</span>
      </div>
      <span>{new Date(dataParcela.vencimento).toLocaleDateString('pt-BR')}</span>
      {dataParcela.paga ? (
        <Button variant='success' disabled>
          Pago
        </Button>
      ) : (
        <Button 
        variant='primary'
        disabled={!isProximaParcela} 
        onClick={() => {efetuarPagamentoParcela({
          parcela_id: dataParcela.parcela_id,
          numero_parcela: Number(dataParcela.numero_parcela),
          valor_parcela: (Number(dataParcela.valor_parcela)).toFixed(2),
          compra_id: dataCompra.compra_id,
          qtd_parcela: Number(dataCompra.qtd_parcela)
        })}}>
          Pagar parcela
        </Button>
      )}
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Slide}/>
    </div>
  );
}
