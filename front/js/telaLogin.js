const login = document.getElementById('login')

login.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const email = document.getElementById('emailLogin')
    const senha = document.getElementById('passwordLogin')

    const user = {
        email: email.value,
        password: senha.value
    }
    try{
        const res = await getOneUser(user)
        localStorage.setItem('token', res.jwt)
        window.location.href = './index.html'
        console.log(res.jwt)
    }catch(a){
        alert("Usuário ou senha incorretos")
        senha.value = ''
    }
    
})