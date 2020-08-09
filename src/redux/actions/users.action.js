const addUser = (token,userid) => {
    return{
        type: 'ADD_USER',
        token,
        userid
    }
}

export {
    addUser
}