import { createStore, combineReducers } from 'redux';

import UserReducer from './reducers/users.reducer';
import TaskReducer from './reducers/tasks.reducer';

const globalStore = () => {
    const store = createStore(combineReducers({
        user: UserReducer,
        tasks: TaskReducer
    }));
    // store.subscribe(()=>{
    //     console.log(store.getState());
    // })
    return store;
}

export default globalStore;