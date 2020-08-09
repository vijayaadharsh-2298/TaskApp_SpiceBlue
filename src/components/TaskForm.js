import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid'; 
import { connect } from 'react-redux';
//import axios from 'axios'; 
import "react-datepicker/dist/react-datepicker.css";
import { addTask, editTask, deleteTask } from '../redux/actions/tasks.action';

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false
        }
    }

    render(){
        return(
            <Formik
            initialValues={{
                description: this.props.task.task ? this.props.task.task.description : '',
                date: this.props.task.task ? new Date(this.props.task.task.date) : new Date(),
                time: this.props.task.task ? this.props.task.task.time :'12:00 AM',
                user: this.props.task.task ? this.props.task.task.user :'User 1'
            }}
            onSubmit={
                (values) => {
                    const date = `${values.date.getFullYear()}-${values.date.getMonth()}-${values.date.getDate()}`;
                    const task = {
                        messageid: uuidv4(),
                        description: values.description,
                        date: date,
                        time: values.time,
                        user: values.user
                    }
                    // console.log(this.props)
                    // const headers = {
                    //     'Authorization': 'Bearer ' + this.props.token,
                    //     'Accept': 'application/json',
                    //     'Content-Type': 'application/json'
                    //   };
                    // axios.post("https://stageapi.hellomail.io/task/lead_3d30a174c68042b48ffa1c612ef033cd",
                    // {
                    //     headers
                    // },{
                    //     assigned_user: this.props.userid,
                    //     task_date: date,
                    //     task_time: values.time,
                    //     task_msg: values.user
                    // }).then(res => console.log(res)).catch(err => console.log(err))
                    //console.log(date)
                    //console.log(values.date.getDate()+' '+values.date.getMonth()+' '+values.date.getFullYear());
                    this.props.task.task ? this.props.editTask(this.props.task.task.messageid, {
                        description: values.description,
                        date: date,
                        time: values.time,
                        user: values.user
                    }) : this.props.addTask(task);
                    this.props.closeform();
                }
            }
            >
                <Form 
                className="mt-4"
                style={{width: '400px', padding: '20px', background: '#BFC9CA', borderRadius: '10px'}}>
                    <div className="form-group">
                        <label>Task Description</label>
                        <Field name="description" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <br />
                        <Field name="date">
                        {
                            ({form,field})=>{
                                const { setFieldValue } = form;
                                const { value } = field;
                                return(
                                    <DatePicker 
                                    className="form-control"
                                    id="date"
                                    selected={value}
                                    onChange={val => setFieldValue("date",val)}
                                    />
                                )
                            }
                        }
                        </Field>
                    </div>
                    <div className="form-group">
                        <label>Time</label>
                        <Field as="select" name="time" className="form-control">
                            <option value="12:00 AM">12:00 AM</option>
                            <option value="3:00 AM">3:00 AM</option>
                            <option value="6:00 AM">6:00 AM</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                            <option value="6:00 PM">6:00 PM</option>
                            <option value="9:00 PM">9:00 PM</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <label>Assign To</label>
                        <Field as="select" name="user" className="form-control">
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                            <option value="User 3">User 3</option>
                            <option value="User 4">User 4</option>
                        </Field>
                    </div>
                    <button type="button" className="btn btn-danger m-1"
                    onClick={() => {
                        this.props.deleteTask(this.props.task.task.messageid)
                        this.props.closeform();
                    }}
                    >Delete</button>
                    <div className="float-right">
                        <button type="button" className="btn btn-danger m-1"
                        onClick={this.props.closeform}
                        >Cancel</button>
                        <button type="submit" className="btn btn-success m-1">{
                            this.props.task.task ? 'Edit' : 'Save'
                        }</button>
                    </div>
                </Form>
            </Formik>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.user.token,
        userid: state.user.userid,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addTask: (user) => dispatch(addTask(user)),
        editTask: (id,updates) => dispatch(editTask(id,updates)),
        deleteTask: (id) => dispatch(deleteTask(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);