import React from 'react';
import { Back } from '../Icons/IconBack';

//EDIT INFO WIHLE LOGGED IN AS ADMIN - PAGE//

export class NewInfoAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    handleChange(event) {
        let newUserData = { ...this.props.selectedUser };
        newUserData.role = event.target.value;
        this.setState({
            user: newUserData
        })
    }

    saveData() {
        this.props.changeDataPutRequest(this.state.user.id, { ...this.state.user });
        this.props.updateUsersList();
        this.props.changePageStateToList();
    }

    render() {
        console.log(this.state.user)
        return (
            <>
                <div className="button-back-wrapper-new-user">
                    <button onClick={this.props.changePageStateToList} className="button-back"><Back /></button>
                </div>
                <div className="edit-user-admin-wrapper">
                    <h3 className="edit-user-heading">Edit users role:</h3>
                    <div className="edit-user-admin-input-wrapper">
                        <select onChange={this.handleChange}>
                            <option value=''></option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button onClick={this.saveData} className="edit-button-admin-confirm">Confirm</button>
                    </div>
                </div>
            </>
        )
    }
}

//EDIT INFO WHILE LOGGED IN AS A USER - PAGE//

export class NewInfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.collectUsername = this.collectUsername.bind(this);
        this.collectPassword = this.collectPassword.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    collectUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    collectPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    saveData() {
        let checkUp = this.props.usersList.filter(user => {
            if (this.state.username === user.username) {
                return true;
            }
            return false;
        })
        if (checkUp && checkUp.length > 0) {
            alert('User with wanted username already exist.')
        } else {
            this.props.changeDataPutRequest(this.props.selectedUser.id, { ...this.props.selectedUser, username: this.state.username, password: this.state.password });
            this.props.updateUsersList();
            this.props.changePageStateToList();
        }

    }

    render() {
        console.log(this.state)
        return (
            <>
                <div className="button-back-wrapper-new-user">
                    <button onClick={this.props.changePageStateToList} className="button-back"><Back /></button>
                </div>
                <div className="edit-user-wrapper">
                    <h2 className="edit-user-heading">Edit Your data</h2>
                    <div className="edit-user-input-wrapper">
                        <label className="edit-user-label">New Username:</label>
                        <input className="edit-user-input" type="text" value={this.state.username} onChange={this.collectUsername}></input>
                    </div>
                    <div className="edit-user-input-wrapper">
                        <label className="edit-user-label">New Password:</label>
                        <input className="edit-user-input" type="text" value={this.state.password} onChange={this.collectPassword}></input>
                    </div>
                    <div className="edit-user-input-wrapper">
                        <button className="edit-button-confirm" onClick={this.saveData}>Confirm</button>
                    </div>
                </div>
            </>
        )
    }
}