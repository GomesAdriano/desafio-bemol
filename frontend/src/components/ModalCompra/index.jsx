/* eslint-disable react/prop-types */
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getCreditoCliente } from '../../services/credito.service';
import { infoCliente } from '../../services/cliente.service';
import './styles.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { efetuarCompra } from '../../services/compra.service';

export default function ModalCompra({ show, setShow, produtoSelecionado }) {
    const [saldo, setSaldo] = useState();
    const [endereco, setEndereco] = useState('');
    const [parcela, setParcela] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const credito = await getCreditoCliente();
            setSaldo(credito);

            if (localStorage.getItem('cliente') !== null) {
                const enderecoCliente = infoCliente().endereco;
                const entrega = `
        Logradouro: ${enderecoCliente.logradouro},
        Número: ${enderecoCliente.numero}, 
        Bairro: ${enderecoCliente.bairro}, 
        Cidade: ${enderecoCliente.cidade} - ${enderecoCliente.estado}`;
                setEndereco(entrega);
            } else {
                setEndereco('');
            }
        }

        fetchData();
    }, []);

    const realizarCompra = async (compra) => {
        if (parcela > 0) {
            if (Number(produtoSelecionado.preco) <= saldo) {
                const res = await efetuarCompra(compra);
                res.includes('Erro') ? toast.error(res) : toast.success(res);
                setParcela(0);
                setSaldo((saldo - Number(produtoSelecionado.preco)).toFixed(2));
                setShow(false);
            } else {
                toast.error('Saldo insuficiente para realizar compra');
            }
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setParcela(0);
                    setShow(false);
                }}
                centered
                style={{ zIndex: 9999 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{produtoSelecionado.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3}>
                            <img
                                src={produtoSelecionado.imagem}
                                alt={produtoSelecionado.nome}
                                className="imagem-compra"
                            />
                        </Col>
                        <Col md={9}>
                            <p className="descricao-compra">{produtoSelecionado.descricao}</p>
                            <p className="preco-compra">
                                R$ {Number(produtoSelecionado.preco).toFixed(2).replace('.', ',')}
                            </p>
                        </Col>
                    </Row>
                    <hr />
                    <strong>Endereço de entrega:</strong>
                    <p>{endereco} </p>
                    <hr />
                    <strong>Informações da compra: </strong>
                    <Form.Select
                        className="mt-3"
                        value={parcela}
                        onChange={(e) => setParcela(e.target.value)}
                    >
                        <option value="0" disabled>
                            Parcelas
                        </option>
                        <option value="1">
                            x1 de{' '}
                            {(Number(produtoSelecionado.preco) / 1).toFixed(2).replace('.', ',')}
                        </option>
                        <option value="2">
                            x2 de{' '}
                            {(Number(produtoSelecionado.preco) / 2).toFixed(2).replace('.', ',')}
                        </option>
                        <option value="3">
                            x3 de{' '}
                            {(Number(produtoSelecionado.preco) / 3).toFixed(2).replace('.', ',')}
                        </option>
                        <option value="4">
                            x4 de{' '}
                            {(Number(produtoSelecionado.preco) / 4).toFixed(2).replace('.', ',')}
                        </option>
                    </Form.Select>
                    <div className="flex mt-3">
                        <p>
                            <strong>Saldo Atual:</strong> R${' '}
                            {Number(saldo).toFixed(2).replace('.', ',')}
                        </p>
                        <p>
                            <strong>Saldo pós compra:</strong>
                            {Number(produtoSelecionado.preco) <= saldo
                                ? `R$ ${(saldo - Number(produtoSelecionado.preco)).toFixed(2).replace('.', ',')}`
                                : 'Não será possível realizar a compra'}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            realizarCompra({
                                qtd_parcela: Number(parcela),
                                valor_total: Number(produtoSelecionado.preco).toFixed(2),
                                produto_id: produtoSelecionado.produto_id,
                            })
                        }
                        disabled={parcela === 0}
                    >
                        Finalizar compra
                    </Button>
                </Modal.Footer>
            </Modal>

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
                transition={Slide}
            />
        </>
    );
}
