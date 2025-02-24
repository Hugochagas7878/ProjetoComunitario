const cards = document.getElementById('cards')
const loginLogout = document.getElementById('login-logout')

async function mostarCampanhas() {
    const res = await getAllCampanhas()
    console.log(res)
    for(camp of res.data){
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.className = 'img-camp';
        img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeewWxj7fbksIQdSLiNu6YXwsFIlPQcRvfKw&s';
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

mostarCampanhas()

if(localStorage.getItem('token')){
    const link = document.createElement('a')
    

    const listItem = document.createElement('li')
    listItem.textContent = 'Logout'

    link.appendChild(listItem)
    link.addEventListener('click', ()=>{
        localStorage.clear()
        window.location.reload()
    })
    loginLogout.appendChild(link)
    
}else{
    const link = document.createElement('a')
    link.setAttribute('href', './login.html')

    const listItem = document.createElement('li')
    listItem.textContent = 'Login'

    link.appendChild(listItem)
    loginLogout.appendChild(link)
}