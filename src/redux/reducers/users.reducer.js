const initialUserState = {
    token: null,
    userid: null
};

export default (state=initialUserState,action) => {
    switch(action.type){
        case 'ADD_USER':
            return{
                ...state,
                token: action.token,
                userid: action.userid
            }
        default:
            return state;
    }
}