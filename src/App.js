import React from 'react';
import Home from './Pages/Home';
import LoginForm from './Pages/LogIn';
import { getUsersList } from './Components/fetchData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: null,
      usersList: null
    }

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
  }

  updateUsersList() {

    getUsersList().then(res => {
      if (JSON.parse(localStorage.getItem('loggedUser'))) {

        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        if (loggedUser && loggedUser.length === 1) {
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser[0]));
        }

        this.setState({
          loggedUser: loggedUser,
          usersList: res
        })

      } else {
        this.setState({
          usersList: res
        })
      }
    });

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
    console.log("<App />", this.state.usersList)
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

export default App;
