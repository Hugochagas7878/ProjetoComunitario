const cadastro = document.getElementById('cadastro')

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
    const res = await createUser(user)
    console.log(res)
})