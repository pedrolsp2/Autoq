const { getDistinctItem } = require('./arrayDistinct')

module.exports = {
    getUniqueProdutos: (produtos) => {
        const concat = (id, simplifiedId) =>
            id ? `${id}${simplifiedId == null ? 0 : simplifiedId}` : null

        const concattedProdutos = produtos.map((cotacao) => ({
            ...cotacao,
            SK_PRODUTO_TEMP: concat(
                cotacao.SK_PRODUTO
                    ? cotacao.SK_PRODUTO
                    : cotacao.SK_PRODUTO_SIMPLIFICADO,
                cotacao.PRODUTO_SIMPLIFICADO
            ),
        }))

        const uniqueProdutosIds = getDistinctItem(
            concattedProdutos,
            'SK_PRODUTO_TEMP'
        )

        return uniqueProdutosIds.map((produtoId) => {
            const produtoFound = concattedProdutos.find(
                (cotacao) => cotacao.SK_PRODUTO_TEMP === produtoId
            )
            console.log(produtoFound)

            return {
                SK_PRODUTO: produtoFound.SK_PRODUTO,
                SK_PRODUTO_SIMPLIFICADO: produtoFound.SK_PRODUTO_SIMPLIFICADO,
                PRODUTO: produtoFound.PRODUTO,
                QUANTIDADE: produtoFound.QUANTIDADE,
                SIMPLIFICADO: produtoFound.SIMPLIFICADO,
                SK_COTACAO_X_PRODUTO: produtoFound.SK_COTACAO_X_PRODUTO,
                QUANTIDADE: produtoFound.QUANTIDADE,
                PRECO: produtoFound.PRECO,
                IPI: produtoFound.IPI,
                PIS: produtoFound.PIS,
                COFINS: produtoFound.COFINS,
                ST: produtoFound.ST,
                FCP: produtoFound.FCP,
                ICMS: produtoFound.ICMS,
                FRETE: produtoFound.FRETE,
                PREVISAO_DE_ENTREGA: produtoFound.PREVISAO_DE_ENTREGA,
                STATUS: produtoFound.STATUS,
                D_E_L_E_T_: produtoFound.D_E_L_E_T_,
                SIMPLIFICADO: produtoFound.SIMPLIFICADO,
            }
        })
    },
    getUniqueFiles: (files, fornecedor = false) => {
        const filteredCotacoes = fornecedor
            ? files.filter(
                  (cotacao) =>
                      cotacao.SK_FORNECEDOR_ARQUIVO !== null ||
                      cotacao.SK_FORNECEDOR_SIMPLIFICADO_ARQUIVO !== null
              )
            : files.filter(
                  (cotacao) =>
                      cotacao.SK_FORNECEDOR_ARQUIVO === null &&
                      cotacao.SK_FORNECEDOR_SIMPLIFICADO_ARQUIVO === null
              )

        const uniqueFileIds = getDistinctItem(
            filteredCotacoes,
            'SK_COTACAO_X_ARQUIVOS'
        ).filter((id) => Boolean(id))

        return uniqueFileIds.map((fileId) => {
            const fileFound = files.find(
                (cotacao) => cotacao.SK_COTACAO_X_ARQUIVOS === fileId
            )

            return {
                SK_COTACAO_X_ARQUIVOS: fileFound.SK_COTACAO_X_ARQUIVOS,
                ARQUIVO: fileFound.ARQUIVO,
                EXTENSAO_DO_ARQUIVO: fileFound.EXTENSAO_DO_ARQUIVO,
                CHAVE_DO_ARQUIVO: fileFound.CHAVE_DO_ARQUIVO,
                TAMANHO_DO_ARQUIVO: fileFound.TAMANHO_DO_ARQUIVO,
            }
        })
    },
}
