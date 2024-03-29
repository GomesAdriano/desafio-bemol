import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='box-header'>
      <div>
        <a href='#' className='link'>Produtos</a>
      </div>

      <div className='flex'>
        <span className='text'>
        Bem vindo Usuário
        </span>
        <a 
        href="#"
        className='button-login-logout'>
          Sair
        </a>
        {/* <a 
        href="#"
        className='button-login-logout'>
          Entrar
        </a> */}
      </div>
    </div>
  )
}
