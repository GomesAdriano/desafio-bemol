import { zodResolver } from '@hookform/resolvers/zod';
import { schemaCadastro } from '../../schemas';
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { createCliente, getCep } from '../../services/cliente.service';
import { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CPF from 'cpf';
 
const CadastroClientePage = () => {

   const { setValue, register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(schemaCadastro)
   });

   const [cpfInvalid, setCpfInvalid] = useState(false);
   const [telefoneInvalid, setTelefoneInvalid] = useState(false);
   const [cepInvalid, setCepInvalid] = useState(false);
   const navigate = useNavigate();

   const limparCampos = () => {
      setValue('logradouro', "");
      setValue('bairro', "");
      setValue('complemento', "");
      setValue('cidade', "");
      setValue('estado', "");
      setCepInvalid(true);
   };

   const buscarCep = async (cep) => {      
      
      cep = cep.replace(/[^0-9]/g, '');
      const data = await getCep(cep);
      if (!data) {
         limparCampos();         
      } else {
         setValue('cep', data.cep);
         setValue('logradouro', data.logradouro);
         setValue('bairro', data.bairro);
         setValue('complemento', data.complemento);
         setValue('cidade', data.localidade);
         setValue('estado', data.uf);
         setCepInvalid(false);
      }      
   };
   
   const onSubmit = async (data) => {

      const cpf = data.cpf.replace(/[^0-9]/g, '');
      const telefone = data.telefone.replace(/[^0-9]/g, '');
      const cep = data.cep.replace(/[^0-9]/g, '');

      if (cpf.length !== 11 || !CPF.isValid(cpf)) {
         setCpfInvalid(true);
         return;
      }

      if (telefone.length !== 11) {
         setTelefoneInvalid(true);
         return;
      }

      if (cep.length !== 8 || cepInvalid) {
         setCepInvalid(true);
         return;
      } 

      setCpfInvalid(false);
      setTelefoneInvalid(false);

      let cliente = {
         cliente_cpf: cpf,
         nome_completo: data.nome_completo,
         email: data.email,
         telefone: telefone,
         senha: data.senha,
         endereco: {
            logradouro: data.logradouro,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            cep: cep
         }
      };

      const res = await createCliente(cliente);
      if (res.includes("uso") || res.includes("Erro")) return toast.error(res);
      navigate('/');
   }

    return (
      <div className='main_container' >
         <div className='grid content'>               
            <div className='box box-left'>
               <img src="/register.png" alt="Login" 
               className='imagem'/>
            </div>        

            <div className='box-cadastro'>
               <h1 className='m-3'>Cadastro</h1>
               <form onSubmit={handleSubmit(onSubmit)} className='form-width'>
                  <div className="flex-column">
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

                  <div className="flex-column">
                     <input
                     type='text' 
                     className='input' 
                     placeholder='Nome Completo' 
                     {...register('nome_completo')}/>
                     <div className='errors-box'>
                        {errors.nome_completo && <span className='errors'>{errors.nome_completo.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                     type='email' 
                     className='input' 
                     placeholder='Email' 
                     {...register('email')}/>
                     <div className='errors-box'>
                        {errors.email && <span className='errors'>{errors.email.message}</span>}
                     </div>
                  </div>
                  <div className="flex-column">
                     <InputMask 
                     mask={`(99) 99999-9999`} 
                     type='text' 
                     className='input' 
                     placeholder='Telefone' 
                     {...register('telefone')}/>
                     <div className='errors-box'>
                        {errors.telefone && <span className='errors'>{errors.telefone.message}</span>}
                        {telefoneInvalid && <span className='errors'>Informe um telefone válido</span>}
                     </div>
                  </div>
                  <div className="flex-column">
                     <input 
                        type='password' 
                        className='input' 
                        placeholder='Senha' 
                        {...register('senha')}
                     />
                     <div className='errors-box'>
                        {errors.senha && <span className='errors'>{errors.senha.message}</span>}
                     </div>
                  </div>
                  
                  <div className="flex-column">
                     <input 
                        type='password' 
                        className='input' 
                        placeholder='Repita a senha' 
                        {...register('repetir_senha')}
                     />
                     <div className='errors-box'>
                        {errors.repetir_senha && <span className='errors'>{errors.repetir_senha.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column mb-2">
                     <InputMask 
                     mask={`99999-999`} 
                     type='text' 
                     className='input' 
                     placeholder='CEP' 
                     {...register('cep')}
                     onChange={(event) => { 
                        event.target.value.length >= 9 ? buscarCep(event.target.value) : limparCampos()
                     }}/>
                     <div className='errors-box'>
                        {errors.cep && <span className='errors'>{errors.cep.message}</span>}
                        {cepInvalid && <span className='errors'>Informe um CEP válido</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        disabled
                        type='text' 
                        className='input' 
                        placeholder='Logradouro' 
                        {...register('logradouro')}
                     />
                     <div className='errors-box'>
                        {errors.logradouro && <span className='errors'>{errors.logradouro.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        type='text' 
                        className='input' 
                        placeholder='Nº da Casa' 
                        {...register('numero')}
                     />
                     <div className='errors-box'>
                        {errors.numero && <span className='errors'>{errors.numero.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        type='text' 
                        className='input' 
                        placeholder='Complemento' 
                        {...register('complemento')}
                     />
                     <div className='errors-box'>
                        {errors.complemento && <span className='errors'>{errors.complemento.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        disabled
                        type='text' 
                        className='input' 
                        placeholder='Bairro' 
                        {...register('bairro')}
                     />
                     <div className='errors-box'>
                        {errors.bairro && <span className='errors'>{errors.bairro.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        disabled
                        type='text' 
                        className='input' 
                        placeholder='Cidade' 
                        {...register('cidade')}
                     />
                     <div className='errors-box'>
                        {errors.cidade && <span className='errors'>{errors.cidade.message}</span>}
                     </div>
                  </div>

                  <div className="flex-column">
                     <input 
                        disabled
                        type='text' 
                        className='input' 
                        placeholder='Estado' 
                        {...register('estado')}
                     />
                     <div className='errors-box'>
                        {errors.estado && <span className='errors'>{errors.estado.message}</span>}
                     </div>
                  </div>                  

                  <div className='buttons'>
                     <Button variant="primary" type="submit" className='button-cadastro'>Cadastrar</Button>
                     <div>
                        <span>Já possui uma conta?</span>
                        <Link to={'/'}>
                           <span className='m-2'>Entrar</span>
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

 export default CadastroClientePage;

