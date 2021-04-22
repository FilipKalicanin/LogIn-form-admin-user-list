import React from 'react';
import { UserIcon } from '../Icons/IconUser'
import { PasswordIcon } from '../Icons/IconPassword'

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                username: '',
                password: '',
                role: 'user',
                id: ''
            }
        }

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.addUserToUsersList = this.addUserToUsersList.bind(this);
        this.addUser = this.addUser.bind(this);
    }

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

    addUserToUsersList() {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.newUser)
        })
            .then(res => res.json())
            .then(res => { return res })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                username: '',
                password: '',
                role: 'user',
                id: ''
            })
        } else {
            this.addUserToUsersList();
            this.props.updateUsersList();
            localStorage.clear();
            localStorage.setItem('loggedUser', JSON.stringify(this.state.newUser));
        }
    }


    render() {
        return (
            <>
                <div className="login-form-container">
                    <div className="login-form-input-container">
                        <label className="login-form-header">Create account</label>
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><UserIcon /></label>
                        <input type="text" className="login-form-input-input" value={this.state.newUser.username} onChange={this.handleChangeUserName} />
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><PasswordIcon /></label>
                        <input type="password" className="login-form-input-input" value={this.state.newUser.password} onChange={this.handleChangePassword} />
                    </div>

                    <button className="login-form-button" onClick={this.addUser}>Create</button>

                    <div className="create-user-wrapper">
                        <button onClick={this.props.backToLogIn} className='create-user-button'>Back to Log-In</button>
                    </div>
                </div>
            </>
        )
    }
}

export default NewUser;