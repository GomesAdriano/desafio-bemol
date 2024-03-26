export type ParcelaDto = {
    parcela_id: string;
    numero_parcela: number;
    valor_parcela: number;
    vencimento: Date;
    paga: boolean;
};

export type AtualizarParcelaDto = Pick<
    ParcelaDto,
    'parcela_id' | 'numero_parcela' | 'valor_parcela'
> & { compra_id: string; qtd_parcela: number };
