import React from 'react';
import { UserIcon } from '../Icons/IconUser';
import { PasswordIcon } from '../Icons/IconPassword';
import { postRequest } from '../Components/fetchData';
import { ErrorPage } from './ErrorPage';

const pageState = {
    EXISTING_USER: 'existingUser',
    NEW_USER: 'newUser'
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                role: 'user',
                id: ''
            },
            pageState: pageState.EXISTING_USER,
            error: false
        }

        this.loginCheck = this.loginCheck.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.changeFormToNew = this.changeFormToNew.bind(this);
        this.changeFormToExistng = this.changeFormToExistng.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    // METHODS FOR EXISTING USER

    handleChangeUserName(event) {
        this.setState({
            newUser: { ...this.state.newUser, username: event.target.value }
        })
    }

    handleChangePassword(event) {
        this.setState({
            newUser: { ...this.state.newUser, password: event.target.value }
        })
    }

    loginCheck() {

        if (this.state.newUser.username === '' || this.state.newUser.password === '') {
            alert('Input fields cannot be empty')
        }

        // does input credential match credentials from any user in usersList from <App />
        let filteredUser = this.props.usersList.filter(user => {
            if (user.username === this.state.newUser.username && user.password === this.state.newUser.password) {
                return true;
            }
            return false;
        })

        // If credentials do match, proceed into <Home /> with that user and set him as logged in localStorage
        if (filteredUser && filteredUser.length === 1) {
            this.props.logIn(filteredUser[0]);
            localStorage.setItem('loggedUser', JSON.stringify(filteredUser[0].id));
        } else {
            alert('Wrong username or password');
            this.setState({
                newUser: {
                    username: '',
                    password: '',
                    role: 'user',
                    id: ''
                }
            })
        }
    }

    // METHODS FOR NEW USER

    addUserToUsersList() {
        postRequest(this.state.newUser).then((res) => {
            this.props.updateUsersList();
            this.props.logIn(this.state.newUser);
            localStorage.setItem('loggedUser', JSON.stringify(res.id));
        }).catch(() => {
            this.setState({
                error: true
            })
        })
    }

    addUser() {

        if (this.state.newUser.username === '' || this.state.newUser.password === '') {
            alert('Input fields cannot be empty');
        }

        let checkUp = this.props.usersList.filter(user => {
            if (this.state.newUser.username === user.username) {
                return true;
            }
            return false;
        })

        if (checkUp && checkUp.length > 0) {
            alert('User with this username alredy exist');
            this.setState({
                newUser: {
                    username: '',
                    password: '',
                    role: 'user',
                    id: ''
                }
            })
        } else {
            this.addUserToUsersList();
        }
    }

    changeFormToNew() {
        this.setState({
            pageState: pageState.NEW_USER
        })
    }

    changeFormToExistng() {
        this.setState({
            pageState: pageState.EXISTING_USER
        })
    }

    render() {
        if (this.state.error === true) {
            return (
                <ErrorPage />
            )
        } else {
            return (
                <div className="login-form-container">
                    <div className="login-form-input-container">
                        <label className="login-form-header">{this.state.pageState === pageState.EXISTING_USER ? 'Log-in' : 'Create Account'}</label>
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><UserIcon /></label>
                        <input type="text" className="login-form-input-input" value={this.state.newUser.username} onChange={this.handleChangeUserName} />
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><PasswordIcon /></label>
                        <input type="password" className="login-form-input-input" value={this.state.newUser.password} onChange={this.handleChangePassword} />
                    </div>

                    <button className="login-form-button" onClick={this.state.pageState === pageState.EXISTING_USER ? this.loginCheck : this.addUser}>
                        {this.state.pageState === pageState.EXISTING_USER ? 'Log-In' : 'Create'}
                    </button>

                    {this.state.pageState === pageState.EXISTING_USER ?
                        <div className="create-user-wrapper">
                            <label className='not-a-member'>Not a member?</label>
                            <button onClick={this.changeFormToNew} className='create-user-button'>Create account</button>
                        </div> :
                        <div className="create-user-wrapper">
                            <button onClick={this.changeFormToExistng} className='create-user-button'>Back to Log-In</button>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default LoginForm;