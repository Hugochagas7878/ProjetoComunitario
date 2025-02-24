async function getAllCampanhas(){
    const res = await api.get('/campanhas')
    return res.data
}

async function getByIdCampanha(id){
    const res = await api.get(`/campanhas/${id}?populate=doacoes&populate=organizacao`)
    return res.data
}

async function createCampanha(campanha){
    const res = await api.post('/campanhas', {
        data: {

        }
    })
    return res.data
}

async function updateCampanha(campanha){
    const res = await api.put(`/campanhas/${campanha.documentId}`, {
        data: {
            
        }
    })
    return res.data
}

async function eraseCampanha(campanha){
    const res = await api.delete(`/campanhas/${id}`)
    return res.data
}