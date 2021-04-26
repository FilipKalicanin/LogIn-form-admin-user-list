import User from '../Components/User';
import React from 'react';
import { NewInfoPage } from '../Pages/EditInfoPage';
import { deleteRequest, putRequest } from '../Components/fetchData';
import { ErrorPage } from './ErrorPage';

const pageState = {
    LIST: 'list',
    EDIT: 'edit'
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: pageState.LIST,
            selectedUser: null,
            usersList: null,
            error: false
        }

        this.userIsAdmin = this.userIsAdmin.bind(this);
        this.userIsNotAdmin = this.userIsNotAdmin.bind(this);
        this.changePageStateToEdit = this.changePageStateToEdit.bind(this);
        this.changePageStateToList = this.changePageStateToList.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.changeDataPutRequest = this.changeDataPutRequest.bind(this);
    }

    changePageStateToEdit() {
        this.setState({
            pageState: pageState.EDIT
        })
    }

    changePageStateToList() {
        this.setState({
            pageState: pageState.LIST
        })
    }

    setSelectedUser(user) {
        this.setState({
            selectedUser: user
        })
    }

    changeDataPutRequest(id, newData) {
        putRequest(id, newData).then(() => {
            this.props.updateUsersList();
        }).catch(() => {
            this.setState({
                error: true
            });
        })
    }

    deleteUser(id) {
        deleteRequest(id).then(() => {
            this.props.updateUsersList();
            if (this.props.loggedUser.id === id) {
                this.props.logOut();
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        })
    }

    userIsAdmin() {
        let allUsers = this.props.usersList.map(oneUser => {
            return <User
                loggedUser={this.props.loggedUser}
                user={oneUser}
                changePageStateToEdit={this.changePageStateToEdit}
                setSelectedUser={this.setSelectedUser}
                deleteUser={this.deleteUser}
                updateUsersList={this.props.updateUsersList}
                key={oneUser.id}
            />
        });

        return (
            <>
                <div className="link-wrapper">
                    <button onClick={this.props.logOut} className="logout-link">LogOut</button>
                </div>
                <div className="users-wrapper">{allUsers}</div>)
            </>
        )
    }

    userIsNotAdmin() {
        return (
            <>
                <div className="link-wrapper">
                    <button onClick={this.props.logOut} className="logout-link">LogOut</button>
                </div>
                <div className="users-wrapper">
                    <User
                        loggedUser={this.props.loggedUser}
                        user={this.props.loggedUser}
                        changePageStateToEdit={this.changePageStateToEdit}
                        setSelectedUser={this.setSelectedUser}
                        deleteUser={this.deleteUser}
                        updateUsersList={this.props.updateUsersList}
                        props={this.state}
                    />
                </div>
            </>
        )
    }

    render() {
        if(this.state.error === true) {
            return (
                <ErrorPage />
            )
        }
        if (this.state.pageState === 'list') {
            return (
                this.props.loggedUser.role === 'admin' ? this.userIsAdmin() : this.userIsNotAdmin()
            )
        }
        if (this.state.pageState === 'edit') {
            return (
                <NewInfoPage
                    selectedUser={this.state.selectedUser}
                    loggedUser={this.props.loggedUser}
                    usersList={this.props.usersList}
                    updateUsersList={this.props.updateUsersList}
                    changeDataPutRequest={this.changeDataPutRequest}
                    changePageStateToList={this.changePageStateToList}
                />
            )
        }
    }
}


export default Home;