import { ResultSetHeader } from 'mysql2';
import { produtos } from '../mock/produtos.mock';
import connection from './dbConnection';
import { Connection } from 'mysql2/promise';

const tabelaCliente = async (con: Connection) => {
    return await con.query(
        'CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`cliente` ( `cliente_cpf` CHAR(11) NOT NULL, `nome_completo` VARCHAR(100) NOT NULL, `email` VARCHAR(100) NOT NULL, `telefone` CHAR(11) NOT NULL, `senha` VARCHAR(100) NOT NULL, `saldo` DECIMAL(12,2) NOT NULL DEFAULT 1000.00, UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE, UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE, PRIMARY KEY (`cliente_cpf`)) ENGINE = InnoDB;',
    );
};

const tabelaEndereco = async (con: Connection) => {
    return await con.query(
        'CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`endereco` ( `endereco_id` CHAR(36) NOT NULL, `logradouro` VARCHAR(100) NOT NULL, `numero` VARCHAR(20) NOT NULL, `complemento` VARCHAR(100) NULL, `bairro` VARCHAR(100) NOT NULL, `cidade` VARCHAR(100) NOT NULL, `estado` CHAR(2) NOT NULL, `cep` CHAR(8) NOT NULL, `cliente_cpf` CHAR(11) NOT NULL, PRIMARY KEY (`endereco_id`), INDEX `fk_endereco_cliente_idx` (`cliente_cpf` ASC) VISIBLE, CONSTRAINT `fk_endereco_cliente` FOREIGN KEY (`cliente_cpf`) REFERENCES `ecommerce_bemol`.`cliente` (`cliente_cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
    );
};

const tabelaProduto = async (con: Connection) => {
    return await con.query(
        'CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`produto` ( `produto_id` CHAR(6) NOT NULL, `nome` VARCHAR(100) NOT NULL, `descricao` VARCHAR(550) NOT NULL, `preco` DECIMAL(12,2) NOT NULL, `imagem` VARCHAR(200) NOT NULL, PRIMARY KEY (`produto_id`)) ENGINE = InnoDB;',
    );
};

const tabelaCompra = async (con: Connection) => {
    return await con.query(
        'CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`compra` ( `compra_id` CHAR(36) NOT NULL, `data_compra` DATE NOT NULL, `qtd_parcela` TINYINT NOT NULL, `valor_total` DECIMAL(12,2) NOT NULL, `quitado` TINYINT NOT NULL DEFAULT 0, `cliente_cpf` CHAR(11) NOT NULL, `produto_id` CHAR(6) NOT NULL, PRIMARY KEY (`compra_id`), INDEX `fk_compra_cliente1_idx` (`cliente_cpf` ASC) VISIBLE, INDEX `fk_compra_produto1_idx` (`produto_id` ASC) VISIBLE, CONSTRAINT `fk_compra_cliente1` FOREIGN KEY (`cliente_cpf`) REFERENCES `ecommerce_bemol`.`cliente` (`cliente_cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `fk_compra_produto1` FOREIGN KEY (`produto_id`) REFERENCES `ecommerce_bemol`.`produto` (`produto_id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
    );
};

const tabelaParcela = async (con: Connection) => {
    return await con.query(
        'CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`parcela` ( `parcela_id` CHAR(36) NOT NULL, `numero_parcela` TINYINT NOT NULL, `valor_parcela` DECIMAL(12,2) NOT NULL, `vencimento` DATE NOT NULL, `paga` TINYINT NOT NULL DEFAULT 0, `compra_id` CHAR(36) NOT NULL, PRIMARY KEY (`parcela_id`), INDEX `fk_parcela_compra1_idx` (`compra_id` ASC) VISIBLE, CONSTRAINT `fk_parcela_compra1` FOREIGN KEY (`compra_id`) REFERENCES `ecommerce_bemol`.`compra` (`compra_id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB;',
    );
};

const criarTabelas = async (con: Connection) => {
    await tabelaCliente(con);
    await tabelaEndereco(con);
    await tabelaProduto(con);
    await tabelaCompra(con);
    await tabelaParcela(con);
};

const inserirProdutos = async (con: Connection) => {
    let stringValues = '(?, ?, ?, ?, ?)';
    for (let i = 0; i < produtos.length - 1; i++) stringValues += ', (?, ?, ?, ?, ?)';

    const sql = `INSERT IGNORE INTO produto(produto_id, nome, descricao, preco, imagem) VALUES ${stringValues}`;
    const values = produtos.flatMap((produto) => Object.values(produto));
    return await con.execute<ResultSetHeader>(sql, values);
};

const seeds = async () => {
    const con = await connection();
    try {
        await criarTabelas(con);
        await inserirProdutos(con);
    } catch (err) {
        console.error(err);
    } finally {
        await con.end();
    }
};

export default seeds;
