async function getAllUsers() {
    const res = await api.get('/users')
    return res.data
}

async function getOneUser(user) {
    const res = await api.post('auth/local', {
        identifier: user.email,
        password: user.password
    })
    return res.data
}

async function createUser(user) {

    const res = await api.post('/auth/local/register', {
        username: user.username,
        email: user.email,
        password: user.password
    });

    return res.data;

}


async function updateUser(user) {
    const res = await api.put(`/users/${user.documentId}`, {
        data: {

        }
    })
    return res.data
}

async function eraseUser(user) {
    const res = await api.delete(`/users/${id}`)
    return res.data
}