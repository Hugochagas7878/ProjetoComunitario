async function getAllCampanhas(){
    const res = await api.get('/campanhas')
    return res.data
}

async function getByIdCampanha(id){
    const res = await api.get(`/campanhas/${id}?populate=doacoes&populate=organizacao`)
    return res.data
}

async function sendImagem(image) {
    const form = new FormData();
    form.append('files', image);

    const res = await api.post('/upload',
        form
    )
    return res.data
}

async function createCampanha(campanha){
    const res = await api.post('/campanhas', {
        data:{
            nome: campanha.nome,
            descricao: campanha.descricao,
            inicio: campanha.inicio,
            termino: campanha.termino,
            local: campanha.local,
            objetivo: campanha.objetivo,
            atual: 0,
            organizacao: campanha.organizacao
        }
    })
    return res.data
}

async function updateValorCampanha(campanha){
    const res = await api.put(`/campanhas/${campanha.documentId}`, {
        data: {
            atual: campanha.valor
        }
    })
    return res.data
}

async function updateImageCampanha(campanha){
    const res = await api.put(`/campanhas/${campanha.documentId}`, {
        data: {
            imagem: campanha.imagem
        }
    })
    return res.data
}

async function eraseCampanha(campanha){
    const res = await api.delete(`/campanhas/${id}`)
    return res.data
}