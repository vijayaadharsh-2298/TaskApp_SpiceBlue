const initialTaskState = [];

export default (state=initialTaskState,action) => {
    switch(action.type){
        case 'ADD_TASK':
            return[
                ...state,
                {
                    messageid: action.messageid,
                    description: action.description,
                    date: action.date,
                    time: action.time,
                    user: action.user
                }
            ]
        case 'EDIT_TASK':
            return state.map(task => {
                if(task.messageid === action.messageid){
                    return{
                        ...task,
                        description: action.updates.description,
                        date: action.updates.date,
                        time: action.updates.time,
                        user: action.updates.user
                    }
                }else return task;
            })
        case 'DELETE_TASK':
            return state.filter(task => task.messageid !== action.messageid)
        default:
            return state;
    }
}