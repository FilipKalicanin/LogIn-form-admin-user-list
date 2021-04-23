import React from 'react';
import { Back } from '../../Icons/IconBack';

//EDIT INFO WIHLE LOGGED IN AS ADMIN - PAGE//

export class NewInfoAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.editAsAdminAndUser = this.editAsAdminAndUser.bind(this);
        this.editAsAdminOnly = this.editAsAdminOnly.bind(this);
        this.collectUsername = this.collectUsername.bind(this);
        this.collectPassword = this.collectPassword.bind(this);
        this.saveDataAsUser = this.saveDataAsUser.bind(this);
    }

    // save data for users Role

    handleChange(event) {
        let newUserData = { ...this.props.selectedUser };
        newUserData.role = event.target.value;
        this.setState({
            user: newUserData
        })
    }

    saveData() {
        this.props.changeDataPutRequest(this.state.user.id, { ...this.state.user });
        this.props.changePageStateToList();
    }

    // save data for user Info

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

    saveDataAsUser() {
        let checkUp = this.props.usersList.filter(user => {
            if (this.state.username === user.username) {
                return true;
            }
            return false;
        })
        if (checkUp && checkUp.length > 0) {
            alert('User with wanted username already exist.')
        } else {
            this.props.changeDataPutRequest(this.props.loggedUser.id, { ...this.props.loggedUser, username: this.state.username, password: this.state.password });
            this.props.changePageStateToList();
        }
    }

    editAsAdminOnly() {
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

    editAsAdminAndUser() {
        return (
            <>
                <div>
                    <div className="button-back-wrapper-new-user">
                        <button onClick={this.props.changePageStateToList} className="button-back"><Back /></button>
                    </div>
                    <div className="edit-user-admin-wrapper">
                        <h3 className="edit-user-heading">Edit your role:</h3>
                        <div className="edit-user-admin-input-wrapper">
                            <select onChange={this.handleChange}>
                                <option value=''></option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button onClick={this.saveData} className="edit-button-admin-confirm">Confirm</button>
                        </div>
                    </div>
                </div>
                <div>
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
                            <button className="edit-button-confirm" onClick={this.saveDataAsUser}>Confirm</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        console.log(this.props.selectedUser, this.props.loggedUser)
        return (
            this.props.selectedUser === this.props.loggedUser ? this.editAsAdminAndUser() : this.editAsAdminOnly()
        )
    }
}
