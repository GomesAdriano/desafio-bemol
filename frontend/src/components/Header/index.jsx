import { infoCliente, logoutCliente } from '../../services/cliente.service'
import './styles.css'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className='box-header'>
      <div className='flex'>
        <Link href='/produto' className='link'>Produtos</Link> 
        <Link href="/pedido" className='link'>Pedidos</Link>
      </div>

      <div className='flex'>
        <span className='text'>
        Bem vindo, {localStorage.getItem('cliente') !== null && infoCliente().nome.split(' ')[0]}        
        </span>
        <button
          onClick={logoutCliente}
          className='button-login-logout'>
          Sair
        </button>
      </div>
    </div>
  )
}
