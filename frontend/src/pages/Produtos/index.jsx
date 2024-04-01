import Header from '../../components/Header';
import CardProduto from '../../components/CardProduto';
import ModalCompra from '../../components/ModalCompra';
import './styles.css';
import { getProdutos } from '../../services/produto.service';
import { useEffect, useState } from 'react';

export default function Produtos() {
    const [show, setShow] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [produtos, setProdutos] = useState([]);

    const listarProdutos = async () => {
        const res = await getProdutos();
        setProdutos(res);
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    return (
        <>
            <Header />
            <div>Produtos</div>
            <div className="area-produtos">
                {produtos &&
                    produtos.map((produto, index) => (
                        <CardProduto
                            key={index}
                            data={produto}
                            setShow={setShow}
                            setProdutoSelecionado={setProdutoSelecionado}
                        />
                    ))}
            </div>
            <ModalCompra show={show} setShow={setShow} produtoSelecionado={produtoSelecionado} />
        </>
    );
}
