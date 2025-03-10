const login = document.getElementById('login')
const voltar = document.getElementById('voltar')

if(localStorage.getItem('token')){
    window.location.href = './'
}

voltar.addEventListener('click', ()=>{
    const link = localStorage.getItem('redirectLogin')
    if(link){
        localStorage.removeItem('redirectLogin')
        window.location.href = link
    }else{
        window.location.href = './'
    }
})

login.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const email = document.getElementById('emailLogin')
    const senha = document.getElementById('passwordLogin')

    const user = {
        email: email.value,
        password: senha.value
    }
    try{
        const res = await loginUser(user)
        localStorage.setItem('token', res.jwt)
        localStorage.setItem('id', res.user.id)
        window.location.href = './index.html'
        const link = localStorage.getItem('redirectLogin')
        if(link){
            localStorage.removeItem('redirectLogin')
            window.location.href = link
        }else{
            window.location.href = './index.html'
        }
        
        console.log(res.jwt)
    }catch(a){
        alert("Usuário ou senha incorretos")
        senha.value = ''
    }

})