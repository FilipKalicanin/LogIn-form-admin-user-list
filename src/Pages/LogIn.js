import React from 'react';
import Home from './Home';
import NewUser from './NewUser';
import ExistingUser from './ExistingUser';

const pageState = {
    EXISTING_USER: 'existing',
    NEW_USER: 'new'
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            pageState: pageState.EXISTING_USER
        }

        this.loginCheck = this.loginCheck.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.changePageStateToNewUser = this.changePageStateToNewUser.bind(this);
        this.changePageStateToExsistingUser = this.changePageStateToExsistingUser.bind(this);
    }

    loginCheck() {

        if(this.state.username === '' || this.state.password === '') {
            alert('Input fields cannot be empty')
        }

        // does input credential match credentials from any user in usersList from <App />
        let filteredUser = this.props.usersList.filter(user => {
            if (user.username === this.state.username && user.password === this.state.password) {
                return true;
            }
            return false;
        })

        // If credentials do match, proceed into <Home /> with that user and set him as logged in localStorage
        if (filteredUser && filteredUser.length === 1) {
            this.props.logIn(filteredUser[0]);
            localStorage.setItem('loggedUser', JSON.stringify(filteredUser[0]));
        } else {
            alert('Wrong username or password');
            this.setState({
                username: '',
                password: '',
                pageState: pageState.EXISTING_USER
            })
        }
    }

    // collect input data from input to state
    handleChangeUserName(event) {
        this.setState({
            username: event.target.value
        })
    }

    // collect input data from input to state
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    changePageStateToNewUser() {
        this.setState({
            pageState: pageState.NEW_USER
        })
    }

    changePageStateToExsistingUser() {
        this.setState({
            pageState: pageState.EXISTING_USER
        })
    }

    render() {
        // if user is already logged in (exists in localStorage) proceed to <Home />
        if (this.props.loggedUser) {
            return <Home />;
        }
        if (this.state.pageState === pageState.EXISTING_USER) {
            return (
                <ExistingUser
                    username={this.state.username}
                    password={this.state.password}
                    handleChangeUserName={this.handleChangeUserName}
                    handleChangePassword={this.handleChangePassword}
                    logInCheck={this.loginCheck}
                    changePageStateToNewUser={this.changePageStateToNewUser}
                />
            )
        }
        if (this.state.pageState === pageState.NEW_USER) {
            return (
                <NewUser
                    usersList={this.props.usersList}
                    updateUsersList={this.props.updateUsersList}
                    backToLogIn={this.changePageStateToExsistingUser}
                />
            )
        }
    }
}

export default LoginForm;