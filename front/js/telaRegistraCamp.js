const organizacoes = document.getElementById('instituicao')
const addCamp = document.getElementById('addCamp')

loginLogout()

async function listOrg(){
    const res = await getAllOrganizacoes()
    for(org of res.data){
        const option = document.createElement('option')
        option.value = org.documentId
        option.innerHTML = org.nome
        organizacoes.appendChild(option)
    }
}

addCamp.addEventListener('click', async (e)=>{
    e.preventDefault()
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataTermino = document.getElementById("dataTermino").value;
    const local = document.getElementById("local").value;
    const quantia = document.getElementById("quantia").value;
    const imagem = document.getElementById("imagem").files[0];
    const instituicao = document.getElementById("instituicao").value;

    const campanha = {
        nome: nome,
        descricao: descricao,
        inicio: dataInicio,
        termino: dataTermino,
        local: local,
        objetivo: quantia,
        imagem: imagem,
        organizacao: instituicao
    };
    try {
        const res = await createCampanha(campanha) 
        alert('Campanha criada com sucesso')
    } catch (e) {
        alert('Erro na criação da campanha')
    }
    
    // const res2 = await sendImagem(imagem)
    // const res3 = await updateImageCampanha(campanha)
    window.location.href = './campanhas.html'
})

listOrg()

