import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';

import AppRouter from './router/app.router';
import GlobalStore from './redux/globalStore';
import { addUser } from './redux/actions/users.action';

class App extends Component {

  store = GlobalStore();

  state = {
    error: null
  }

  user = {
    email : 'spicebluetest6@gmail.com',
    password : '12345678'
  }

  componentDidMount(){
    axios.post("https://stageapi.hellomail.io/login",this.user)
    .then(res => {
      const token = res.data.results.token;
      const headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      axios.get("https://stageapi.hellomail.io/profile",{headers})
      .then(res => {
        localStorage.setItem('user', JSON.stringify({
          token: token,
          userid: res.data.results.id
        }));
        this.store.dispatch(addUser(token,res.data.results.id))
      })
      .catch(err => this.setState({error: err.message}))
    })
    .catch(err => this.setState({error: err.message}))
  }

  componentWillUnmount(){
    localStorage.removeItem('user')
  }

  render(){
  return (
    <Provider store={this.store}>
      {
        this.state.error && alert(this.state.error)
      }
      <AppRouter />
    </Provider>
  )};
}

export default App;
