const cards = document.getElementById('cards')
const loginL = document.getElementById('login-logout')

async function mostarCampanhas() {
    const res = await getAllCampanhas()
    console.log(res)
    for(camp of res.data){
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.className = 'img-camp';
        img.src = (camp.imagem)? 'http://127.0.0.1:1337' + camp.imagem.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeewWxj7fbksIQdSLiNu6YXwsFIlPQcRvfKw&s' 
        img.alt = 'Imagem da Campanha';
        

        const titulo = document.createElement('h2');
        titulo.textContent = camp.nome;

        const descricao = document.createElement('p');
        descricao.textContent = camp.descricao;

        // Criar barra de progresso
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        if(camp.atual >= camp.objetivo){
            progress.style.width = '100%'
        }else{
            progress.style.width = `${camp.atual/camp.objetivo*100}%`
        }

        progressBar.appendChild(progress);


        const meta = document.createElement('p');
        meta.className = 'meta';
        meta.textContent = `R$ ${camp.atual} de R$ ${camp.objetivo} arrecadados`;

        const botaoDoar = document.createElement('a');
        botaoDoar.href = `espiar.html?id=${camp.documentId}`;
        botaoDoar.className = 'doar-btn';
        botaoDoar.textContent = 'Doar Agora';

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(progressBar);
        card.appendChild(meta);
        card.appendChild(botaoDoar);

        cards?.appendChild(card)
    }
}



function loginLogout(){
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
    
        loginL.appendChild(link)
        loginL.appendChild(link2)
    
    }else{
        const link = document.createElement('a')
        link.setAttribute('href', './login.html')
    
        const listItem = document.createElement('li')
        listItem.textContent = 'Login'
    
        link.appendChild(listItem)
        const link2 = document.createElement('a')
        link2.setAttribute('href', './registro.html')
    
        const listItem2 = document.createElement('li')
        listItem2.textContent = 'Cadastrar'
    
        link2.appendChild(listItem2)
        loginL.appendChild(link)
        loginL.appendChild(link2)
        link.addEventListener('click', ()=>{
            localStorage.setItem('redirectLogin', window.location.href)
        })
        link2.addEventListener('click', ()=>{
            localStorage.setItem('redirectCadastro', window.location.href)
        })
    }
}
