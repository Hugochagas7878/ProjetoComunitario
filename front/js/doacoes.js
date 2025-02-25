async function createDoacao(doacao){
    const res = await api.post('/doacaos', {
        data: {
            valor: doacao.valor,
            campanha: doacao.campanha,
            user: doacao.user
        }
    })
    return res.data
}

async function getOneDoacao(id){
    const res = await api.get(`/doacaos/${id}?populate=campanha`)
    return res.data
}