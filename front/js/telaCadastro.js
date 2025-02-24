const cadastro = document.getElementById('cadastro')
const voltar = document.getElementById('voltar')

voltar.addEventListener('click', ()=>{
    const link = localStorage.getItem('redirectCadastro')
    if(link){
        localStorage.removeItem('redirectCadastro')
        window.location.href = link
    }else{
        window.location.href = './index.html'
    }
})

cadastro.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const name = document.getElementById('username')
    const email = document.getElementById('email')
    const senha = document.getElementById('password')

    const user = {
        username: name.value, 
        email: email.value,
        password: senha.value
    }
    try {
        const res = await createUser(user)
        localStorage.setItem('token', res.jwt)
        const link = localStorage.getItem('redirectCadastro')
        alert('Usuário criado com sucesso')
        if(link){
            localStorage.removeItem('redirectCadastro')
            window.location.href = link
        }else{
            window.location.href = './index.html'
        }
    } catch (e) {
        alert('Falha na criação de usuário')
    }
    
    
})