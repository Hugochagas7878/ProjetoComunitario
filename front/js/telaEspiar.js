const params = new URLSearchParams(window.location.search);
const campanhaId = params.get('id');
const loginLogout = document.getElementById('login-logout')
const modal = document.getElementById('myModal');
const close = document.getElementById('close');
const doacaoButton = document.getElementById('doacaoButton')
const valorDoacao = document.getElementById('doacao')

doacaoButton.addEventListener('click', async ()=>{
    if(valorDoacao.value <= 0){
        alert('Valor inváldio')
        return
    }
    const campanha = await getByIdCampanha(campanhaId)
    console.log(campanha.data.documentId)
    const doacao = {
        valor: valorDoacao.value,
        campanha: campanha.data.documentId,
        user: localStorage.getItem('id')
    }
    try {
        const res = await createDoacao(doacao)
        const req = {
            documentId: campanha.data.documentId,
            valor: Number(campanha.data.atual) + Number(valorDoacao.value)
        }
        const res2 = await updateValorCampanha(req)
        alert('Doação feita com sucesso')
        modal.style.display = "none";
        mostrarCampanha()
    } catch (e) {
        alert('Erro na doação')
    }
    
})

function diferencaEmDias(data1, data2) {
    const umDiaEmMs = 1000 * 60 * 60 * 24; 
    const diferencaMs = data2.getTime() - data1.getTime(); 
    return Math.floor(diferencaMs / umDiaEmMs); 
}

async function mostrarCampanha() {
    const res = await getByIdCampanha(campanhaId)
    console.log(res)
    const data = res.data

    const container = document.getElementById('containerCamp');

    container.innerHTML = ''

    const titulo = document.createElement('h2');
    titulo.textContent = data.nome;

    const organizador = document.createElement('p');
    if(data.organizador){
        organizador.textContent = `por ${data.organizador}`;
    }

    const campanhaStats = document.createElement('div');
    campanhaStats.className = 'campanha-stats';

    const img = document.createElement('img');
    img.src = 'https://www.galaxcms.com.br/imgs_crud_comum/877/Vulnerabilidadedecriancasnotrabalho-20140603204922.jpg';
    img.alt = 'imagem.jpg';

    const progresso = document.createElement('div');
    progresso.className = 'progresso';

    const valorArrecadado = document.createElement('h3');
    valorArrecadado.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.atual);;

    const apoiadores = document.createElement('p');
    apoiadores.innerHTML = `apoiados por <strong>${data.doacoes.length} pessoas</strong>`;

    const barraProgresso = document.createElement('div');
    barraProgresso.className = 'barra-progresso';

    const barra = document.createElement('div');
    barra.className = 'barra';
    if(data.atual >= data.objetivo){
        barra.style.width = '100%'
    }else{
        barra.style.width = `${data.atual/data.objetivo*100}%`
    }

    const meta = document.createElement('p');
    meta.innerHTML = '<strong>Meta:</strong> ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.objetivo);

    const diasRestantes = document.createElement('p');
    let termino = new Date(data.termino);
    let agora = new Date()
    let flag = 0;
    if(diferencaEmDias(agora, termino) < 0){
        diasRestantes.innerHTML = '<strong>0 dias restantes</strong>'
        flag = 1
    }else{
        diasRestantes.innerHTML = `<strong>${diferencaEmDias(agora, termino)} dias restantes</strong>`;
    }
    

    const botaoApoiar = document.createElement('a');

    botaoApoiar.className = 'botao-apoiar';

    botaoApoiar.textContent = 'Apoiar este projeto';

    if(flag == 1){
        botaoApoiar.style.pointerEvents = 'none'
        botaoApoiar.style.backgroundColor = 'lightgrey'
    }

    const prazo = document.createElement('p');

    termino = new Intl.DateTimeFormat('pt-BR').format(termino)
    prazo.innerHTML = `Você pode apoiar este projeto até o dia <strong>${termino}</strong> às 23h59.`;

    // Construindo a hierarquia
    barraProgresso.appendChild(barra);
    progresso.appendChild(valorArrecadado);
    progresso.appendChild(apoiadores);
    progresso.appendChild(barraProgresso);
    progresso.appendChild(meta);
    progresso.appendChild(diasRestantes);
    progresso.appendChild(botaoApoiar);
    progresso.appendChild(prazo);

    campanhaStats.appendChild(img);
    campanhaStats.appendChild(progresso);

    container.appendChild(titulo);
    container.appendChild(organizador);
    container.appendChild(campanhaStats);

    botaoApoiar.addEventListener('click', ()=>{
        modal.style.display = "block";
    })

    close.addEventListener('click', ()=>{
        modal.style.display = "none";
    })

    window.addEventListener('click', (e)=>{
        if(e.target == modal){
            modal.style.display = "none";
        }
    })

    if(localStorage.getItem('token')){
        const link = document.createElement('a')


        const listItem = document.createElement('li')
        listItem.textContent = 'Logout'

        const link2 = document.createElement('a')
        link2.setAttribute('href', './perfil.html')

        const listItem2 = document.createElement('li')
        listItem2.textContent = 'Perfil'

        link.appendChild(listItem)
        link2.appendChild(listItem2)

        link.addEventListener('click', ()=>{
            localStorage.clear()
            window.location.reload()
        })
        link2.addEventListener('click', ()=>{
            localStorage.setItem('redirectPerfil', window.location.href)
        })

        loginLogout.appendChild(link)
        loginLogout.appendChild(link2)

    }else{
        const link = document.createElement('a')
        link.setAttribute('href', './login.html')

        const listItem = document.createElement('li')
        listItem.textContent = 'Login'
    

        const link2 = document.createElement('a')
        link2.setAttribute('href', './registro.html')

        const listItem2 = document.createElement('li')
        listItem2.textContent = 'Cadastrar'

        
        link.appendChild(listItem)
        link2.appendChild(listItem2)

        loginLogout.appendChild(link)
        loginLogout.appendChild(link2)
        botaoApoiar.style.pointerEvents = 'none'
        botaoApoiar.style.backgroundColor = 'lightgrey'

        link.addEventListener('click', ()=>{
            localStorage.setItem('redirectLogin', window.location.href)
        })
        link2.addEventListener('click', ()=>{
            localStorage.setItem('redirectCadastro', window.location.href)
        })
    }
}

mostrarCampanha()