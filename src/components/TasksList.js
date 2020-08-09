import React from 'react';
import { connect } from 'react-redux';

const TasksList = (props) => {
    return(
        props.tasks.length <= 0 ? <p className="mt-2">No tasks available</p> : 
        <div className="card">
        {
            props.tasks.map(task => (
                <div key={task.messageid} className="card-body">
                    <label onClick={() => {
                        props.editForm({task})
                    }}>Task: {task.description}</label>
                    <br />
                    <label>Assigned To: {task.user}</label>
                </div>
            ))
        }
        </div>
    )
};

const mapStateToProps = state => {
    return{
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TasksList);