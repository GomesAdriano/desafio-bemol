import Header from '../../components/Header'
import CardProduto from '../../components/CardProduto'
import './styles.css'


export default function Produtos() {
  return (
    <>
    <Header />
    <div className='area-produtos'>
      <CardProduto/>
      <CardProduto/>
      <CardProduto/>
      <CardProduto/>
      <CardProduto/>
      <CardProduto/>
    </div>
    </>
  )
}
