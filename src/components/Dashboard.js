import React, { Component } from 'react';

import TasksList from './TasksList';
import TaskForm from './TaskForm';

class Dashboard extends Component {

    state = {
        taskformdisplay: false,
        task: {}
    }

    showForm = () => {
        this.setState({taskformdisplay: !this.state.taskformdisplay})
    }

    editForm = (task) => {
        this.setState({
            taskformdisplay: !this.state.taskformdisplay,
            task: task
        });
    }

    render(){
    return(
        <div>
            <div className="card" style={{width: '500px'}}>
                <h4 className="m-2">Available Tasks <button className="mr-2 btn  btn-success float-right" onClick={this.showForm}>+</button></h4>
            </div>
            <TasksList editForm={this.editForm}/>
            {
                this.state.taskformdisplay && <TaskForm closeform={this.showForm} task={this.state.task}/>
            }
        </div>
    )}
}

export default Dashboard;