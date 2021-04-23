import User from '../Components/User';
import React from 'react';
import LoginForm from './LogIn';
import { NewInfoAdmin } from '../Pages/EditInfoPages/EditInfoAdmin';
import { NewInfoUser } from '../Pages/EditInfoPages/EditInfoUser';
import { deleteRequest, putRequest } from '../Components/fetchData';

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
            usersList: null
        }

        this.userIsAdmin = this.userIsAdmin.bind(this);
        this.userIsNotAdmin = this.userIsNotAdmin.bind(this);
        this.changePageStateToEdit = this.changePageStateToEdit.bind(this);
        this.changePageStateToList = this.changePageStateToList.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.changeDataPutRequest = this.changeDataPutRequest.bind(this);
    }

    componentDidMount() {
        this.setState({
            usersList: this.props.usersList
        })
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
            this.props.updateUsersList()
        });
    }

    deleteUser(id) {
        deleteRequest(id)
        this.props.logOut()
    }

    userIsAdmin() {
        let allUsers = this.props.usersList.map(oneUser => {
            return <User
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
        if (this.state.pageState === 'list') {
            if (!this.props.loggedUser) {
                return <LoginForm />
            } else {
                return (
                    this.props.loggedUser.role === 'admin' ? this.userIsAdmin() : this.userIsNotAdmin()
                )
            }
        }

        if (this.state.pageState === 'edit' && this.props.loggedUser.role === 'admin') {
            return (
                <NewInfoAdmin
                    selectedUser={this.state.selectedUser}
                    loggedUser={this.props.loggedUser}
                    changeDataPutRequest={this.changeDataPutRequest}
                    changePageStateToList={this.changePageStateToList}
                    updateUsersList={this.props.updateUsersList}
                />
            )
        }
        if (this.state.pageState === 'edit' && this.props.loggedUser.role === 'user') {
            return (
                <NewInfoUser
                    selectedUser={this.props.loggedUser}
                    usersList={this.props.usersList}
                    changeDataPutRequest={this.changeDataPutRequest}
                    changePageStateToList={this.changePageStateToList}
                    updateUsersList={this.props.updateUsersList}
                />
            )
        }
    }
}


export default Home;