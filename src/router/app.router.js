import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import TaskForm from '../components/TaskForm';

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/:id" component={TaskForm}/>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;