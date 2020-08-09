const addTask = ({messageid,description,date,time,user}) => {
    return{
        type: 'ADD_TASK',
        messageid,
        description,
        date,
        time,user
    }
}

const editTask = (messageid,updates) => {
    return{
        type: 'EDIT_TASK',
        messageid,
        updates
    }
}

const deleteTask = (messageid) => {
    return{
        type: 'DELETE_TASK',
        messageid
    }
}

export {
    addTask,
    editTask,
    deleteTask
}