const organizacoes = document.getElementById('instituicao')
const addCamp = document.getElementById('addCamp')

loginLogout()

async function checkRole() {
    const user = await getOneUser(localStorage.getItem('id'))
    if(user.data.role.name != 'Admin'){
        window.location.href = './'
    }
    console.log()
}
if(!localStorage.getItem('token')){
    window.location.href = './login.html'
}
checkRole()

async function listOrg(){
    const res = await getAllOrganizacoes()
    for(org of res.data){
        const option = document.createElement('option')
        option.value = org.documentId
        option.innerHTML = org.nome
        organizacoes.appendChild(option)
    }
}

addCamp.addEventListener('submit', async (e)=>{
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
    let res
    try {
        res = await createCampanha(campanha) 
        let res2
        if(imagem){
            res2 = await sendImagem(imagem)
        }

        const camp2 = {
            documentId: res.data.documentId,
            imagem: res2[0].id
        }
        
        const res3 = await updateImageCampanha(camp2)
    
        window.location.href = './campanhas.html'
    } catch (e) {
        alert('Erro na criação da campanha')
    }
    
     
    
})

listOrg()

