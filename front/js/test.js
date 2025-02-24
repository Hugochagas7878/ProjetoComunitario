
async function getAll(){
    const res = api.get('/users')
    return res.data
}

const test = document.getElementById('test')

test.addEventListener('click', ()=>{
    console.log('click')
    const res = getAll()
    console.log(res)
})