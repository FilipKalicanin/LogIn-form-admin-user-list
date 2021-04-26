import React from 'react';
import Home from './Pages/Home';
import LoginForm from './Pages/LogIn';
import { getUsersList } from './Components/fetchData';
import { ErrorPage } from './Pages/ErrorPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: null,
      usersList: null,
      error: false
    }

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
  }

  updateUsersList() {
    getUsersList().then(res => {

      if (JSON.parse(localStorage.getItem('loggedUser'))) {

        const findUser = JSON.parse(localStorage.getItem('loggedUser'));

        let loggedUser;

        res.forEach(user => {
          if (user.id === findUser) {
            loggedUser = user;
            return loggedUser
          }
        })

        this.setState({
          loggedUser: loggedUser,
          usersList: res
        })

      } else {
        this.setState({
          usersList: res
        })
      }
    })
      .catch(() => {
        this.setState({
          error: true
        })
      })
  }

  componentDidMount() {
    this.updateUsersList()
  }

  logIn(filteredUser) {
    this.setState({
      loggedUser: filteredUser
    })
  }

  logOut() {
    localStorage.clear();
    this.setState({
      loggedUser: null
    })
  }

  render() {
    if (this.state.error === true) {
      return <ErrorPage />
    } else {
      return (
        <div className="root">
          {this.state.loggedUser ?
            <Home
              logOut={this.logOut}
              usersList={this.state.usersList}
              loggedUser={this.state.loggedUser}
              updateUsersList={this.updateUsersList}
            /> :
            <LoginForm
              logIn={this.logIn}
              logOut={this.logOut}
              usersList={this.state.usersList}
              loggedUser={this.state.loggedUser}
              updateUsersList={this.updateUsersList}
            />}
        </div>
      )
    }
  }
}

export default App;
