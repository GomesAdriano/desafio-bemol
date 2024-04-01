import axios from 'axios';
import { instance } from '../utils/http';

export const efetuarCompra = async (compra) => {
    const res = await instance.http
        .post('/compra', compra)
        .then((response) => {
            return response.data.msg;
        })
        .catch((error) => {
            return error.response.data.msg;
        });
    return res;
};

export const getCompras = async () => {
    try {
        const response = await instance.http.get('/compra');
        const { data } = response;
        const pedidosPorCliente = organizarCompras(data);

        return { error: null, data: pedidosPorCliente[0] };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                window.location.href = '/';
            }
        } else return { error: error.response.data.msg, data: null };
    }
};

const organizarCompras = (compras) => {
    const pedidosPorCliente = {};

    compras.forEach((compra) => {
        const { cliente_cpf, compra_id, data_compra, qtd_parcela, valor_total, quitado } = compra;
        const { produto_id, produto_nome, produto_descricao, produto_preco, produto_imagem } =
            compra;
        const { parcela_id, numero_parcela, valor_parcela, vencimento, paga } = compra;

        if (!pedidosPorCliente[cliente_cpf]) {
            pedidosPorCliente[cliente_cpf] = [];
        }

        const pedidoExistente = pedidosPorCliente[cliente_cpf].find(
            (pedido) => pedido.compra.compra_id === compra_id,
        );

        if (!pedidoExistente) {
            pedidosPorCliente[cliente_cpf].push({
                produto: {
                    produto_id,
                    nome: produto_nome,
                    descricao: produto_descricao,
                    preco: produto_preco,
                    imagem: produto_imagem,
                },
                compra: {
                    compra_id,
                    data_compra,
                    qtd_parcela,
                    valor_total,
                    quitado,
                },
                parcelas: [
                    {
                        parcela_id,
                        numero_parcela,
                        valor_parcela,
                        vencimento,
                        paga,
                    },
                ],
            });
        } else {
            pedidoExistente.parcelas.push({
                parcela_id,
                numero_parcela,
                valor_parcela,
                vencimento,
                paga,
            });
        }
    });

    const pedidosPorClienteArray = Object.entries(pedidosPorCliente).map(
        ([cliente_cpf, pedidos]) => ({
            cliente_cpf,
            pedido: pedidos,
        }),
    );

    return pedidosPorClienteArray;
};
