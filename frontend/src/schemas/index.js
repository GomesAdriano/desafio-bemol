import * as z from 'zod';

export const schemaLogin = z.object({
  cpf: z.string().min(14, { message: 'Informe um CPF válido' }),
  senha: z.string().min(6, { message: 'Senha inválida' }),
});

export const schemaCadastro = z.object({
  cpf: z.string().min(14, { message: 'Informe um CPF válido' }),
  nome_completo: z.string().min(3, { message: 'Informe um nome válido' }),
  email: z.string().email({ message: 'Informe um email válido' }),
  telefone: z.string().min(15, { message: 'Informe um telefone válido' }),
  senha: z.string().min(6, { message: 'Senha inválida' }),
  repetir_senha: z.string().min(6, { message: 'Senha inválida' }),
  cep: z.string().min(9, { message: 'Informe um CEP válido' }),
  logradouro: z.string().optional(),
  complemento: z.string().optional(),
  numero: z.string().min(1, { message: 'Informe o número da sua casa' }),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(), 
}).refine(data => data.senha === data.repetir_senha, {
    message: "Senha não confere",
    path: ["repetir_senha"],
});