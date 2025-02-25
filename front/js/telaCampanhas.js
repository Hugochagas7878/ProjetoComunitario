const createCamp = document.getElementById('createCamp')

mostarCampanhas()
loginLogout()
 async function checkRole() {
    const user = await getOneUser(localStorage.getItem('id'))

    if(!user.data || user.data.role.name != 'Admin'){
        createCamp.style.display = 'none'
    }else{
        createCamp.style.display = 'block'
    }
 }
 checkRole()