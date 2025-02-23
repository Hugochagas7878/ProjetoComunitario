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