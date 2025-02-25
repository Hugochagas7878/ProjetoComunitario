const voltar = document.getElementById('voltar')

voltar.addEventListener('click', ()=>{
    const link = localStorage.getItem('redirectPerfil')
    if(link){
        localStorage.removeItem('redirectPerfil')
        window.location.href = link
    }else{
        window.location.href = './index.html'
    }
})

if(!localStorage.getItem('token')){
    window.location.href = './login.html'
}

async function mostrarUser() {
    const user = await getOneUser(localStorage.getItem('id'))
    const container = document.getElementById('container');

    const perfilHeader = document.createElement('div');
    perfilHeader.className = 'perfil-header';

    const img = document.createElement('img');
    img.src = 'https://as2.ftcdn.net/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
    img.alt = 'Foto de Perfil';

    const perfilInfo = document.createElement('div');
    const nomeUsuario = document.createElement('h2');
    nomeUsuario.textContent = user.data.username;

    const emailUsuario = document.createElement('p');
    emailUsuario.textContent = 'Email: ' + user.data.email;

    perfilInfo.appendChild(nomeUsuario);
    perfilInfo.appendChild(emailUsuario);

    perfilHeader.appendChild(img);
    perfilHeader.appendChild(perfilInfo);

    const info = document.createElement('div');
    info.className = 'info';

    const infoTitulo = document.createElement('h3');
    infoTitulo.textContent = 'Informações';

    const dataCadastro = document.createElement('p');
    let date = new Date(user.data.createdAt)
    date = date.toLocaleDateString('pt-BR')
    dataCadastro.innerHTML = '<strong>Data de Cadastro:</strong> ' + date;

    const totalDoacoes = document.createElement('p');

    let donateValue = 0
    for(let donate of user.data.doacao){
        donateValue += donate.valor
    }
    totalDoacoes.innerHTML = '<strong>Total de Doações:</strong> ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(donateValue);

    info.appendChild(infoTitulo);
    info.appendChild(dataCadastro);
    info.appendChild(totalDoacoes);

    const configuracoes = document.createElement('div');
    configuracoes.className = 'configuracoes';

    const configTitulo = document.createElement('h3');
    configTitulo.textContent = 'Configurações da Conta';

    
    const alterarPerfil = document.createElement('a');
    const modal = document.getElementById('myModal')
    alterarPerfil.href = ''
    alterarPerfil.innerHTML = 'Editar perfil<br><br>';
    const nomeUser = document.getElementById('nomeUser')
    alterarPerfil.addEventListener('click', (e)=>{
        e.preventDefault()
        modal.style.display = 'block'
        nomeUser.value = user.data.username

    })
    const close = document.getElementById('close')
    close.addEventListener('click', ()=>{
        modal.style.display = 'none'
    })
    const enviar = document.getElementById('enviarButton')
    enviar.addEventListener('click', async (e)=>{
        e.preventDefault()
        try {
            const res = await updateUser({documentId: user.data.id, name: nomeUser.value})
            alert('Perfil atualizado com sucesso!')
            window.location.reload()
        } catch (error) {
            alert('Erro ao atualizar perfil')
            modal.style.display = 'none'
        }
        
    })

    const deletarConta = document.createElement('a');
    deletarConta.href = ''
    deletarConta.innerHTML = 'Deletar conta';
    
    deletarConta.addEventListener('click', async (e)=>{
        e.preventDefault()
        let confirmAction = confirm("Você tem certeza?");
    
        if (confirmAction) {
            try {
                await eraseUser({documentId: user.data.id})
            } catch (error) {
                alert("Erro ao deletar usuário");
            }
            
        } 
    })

    configuracoes.appendChild(configTitulo);
    configuracoes.appendChild(alterarPerfil);
    configuracoes.appendChild(deletarConta);

    const historico = document.createElement('div');
    historico.className = 'historico';

    const historicoTitulo = document.createElement('h3');
    historicoTitulo.textContent = 'Histórico de Doações';

    const historicoLista = document.createElement('ul');
    let cont = 0
    
    for(let donate of user.data.doacao){
        if(cont >= 5) break
        cont++;
        const doacao = document.createElement('li');
        const res = await getOneDoacao(donate.documentId)
        console.log(res.data)
        doacao.innerHTML = `Doação para a campanha <strong>${res.data.campanha.nome}</strong> - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(donate.valor)} - ${(new Date(donate.createdAt)).toLocaleDateString('pt-BR')}`;
        historicoLista.appendChild(doacao);
    }
    

    historico.appendChild(historicoTitulo);
    historico.appendChild(historicoLista);

    container.appendChild(perfilHeader);
    container.appendChild(info);
    container.appendChild(configuracoes);
    container.appendChild(historico);
    
}

mostrarUser()