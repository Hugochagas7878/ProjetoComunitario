async function getAllOrganizacoes(){
    const res = await api.get('/organizacaos')
    return res.data
}