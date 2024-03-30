import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import { schemaLogin } from '../../schemas';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Form from 'react-bootstrap/Form'; 
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { loginCliente } from '../../services/cliente.service';
import { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
   
   const [cpfInvalid, setCpfInvalid] = useState(false);

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(schemaLogin)
   });   

   const navigate = useNavigate();

   const onSubmit = async (data) => {

      const cpf = data.cpf.replace(/[^0-9]/g, '');

      if (cpf.length !== 11) {
         setCpfInvalid(true);
         return;
      }

      setCpfInvalid(false);
      const { error, data: res } = await loginCliente(cpf, data.senha); 

      if (error) {
         return toast.error(error);
      }
      const nome = res.nome_completo;

      const endereco = {
         logradouro: res.logradouro,
         numero: res.numero,
         complemento: res.complemento,
         bairro: res.bairro,
         cidade: res.cidade,
         estado: res.estado,
         cep: res.cep
      }

      const cliente = { nome, endereco }
      localStorage.setItem('cliente', JSON.stringify(cliente));
      navigate('/produto');
   }

   return (
   <div className='main_container'>
      <div className='grid content'>        

         <div className='box box-left'>
            <img src="/login.png" alt="Login" 
            className='imagem'/>
         </div>

         <div className='w-100 box'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-width'>
               <div className="mb-1 flex-column">
                  <Form.Label>CPF</Form.Label>
                  <InputMask 
                  mask={`999.999.999-99`} 
                  type='text' 
                  className='input' 
                  placeholder='CPF' 
                  {...register('cpf')}/>
                  <div className='errors-box'>
                     {errors.cpf && <span className='errors'>{errors.cpf.message}</span>}
                     {cpfInvalid && <span className='errors'>Informe um CPF válido</span>}
                  </div>
               </div>

               <div className="mb-3">
                  <Form.Label className="mb-3 flex-column">Senha</Form.Label>
                  <input
                  className='input' 
                  type="password" 
                  placeholder="Senha" 
                  {...register('senha')}/>
                  <div className='errors-box'>
                     {errors.senha && <span className='errors'>{errors.senha.message}</span>}
                  </div>
               </div>

               <div className='buttons'>
                  <Button variant="primary" type="submit" className='button-login'>Entrar</Button>
                  <div>
                     <span>Não possui uma conta?</span>
                     <Link to={'/cadastro'}>
                        <span className='m-2'>Cadastre-se</span>
                     </Link>
                  </div>
               </div>
            </form>
         </div>
      </div>
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
   )
 }

 export default LoginPage;

