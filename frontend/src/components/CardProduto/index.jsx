/* eslint-disable react/prop-types */
import './styles.css'
import { Card, Button } from 'react-bootstrap'

export default function CardProduto({data, setShow, setProdutoSelecionado}) {

  const handleClick = () => {
    setProdutoSelecionado(data)
    setShow(true)
  }

  return (
    <>
      <Card className='box-produto'>
        <Card.Img variant="top" src={data.imagem} className='imagem-produto' />
        <Card.Body>
          <Card.Title>{data.nome.length > 22 ? data.nome.substring(0, 22) + '...' : data.nome}</Card.Title>
          <Card.Text>
            {data.descricao.length > 55 ? data.descricao.substring(0, 55) + '...' : data.descricao}
          </Card.Text>
          <Card.Text>
            R$ {Number(data.preco).toFixed(2).replace('.', ',')}
          </Card.Text>
          <Button variant="primary" onClick={() => handleClick()}>Comprar</Button>
        </Card.Body>
      </Card>      
    </>
  );
}
