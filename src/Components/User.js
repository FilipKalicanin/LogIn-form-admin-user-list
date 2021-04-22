import React from 'react';
import { UserIconProfile } from '../Icons/IconUser';
import { EditPen } from '../Icons/IconEditPen';
import { Delete } from '../Icons/IconDelete';

class User extends React.Component {
    constructor(props) {
        super(props)

        this.passwordTransform = this.passwordTransform.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

    passwordTransform() {
        let stars = '';
        if (this.props.user.password) {
            for (let i = 0; i < this.props.user.password.length; i++) {
                stars += '*'
            }
        }
        return stars
    }

    handleClick() {
        this.props.setSelectedUser(this.props.user);
        this.props.changePageStateToEdit();
    }

    render() {
        return (
            <>
                <div className="user-container">
                    <div className="user-icon-wrapper">
                        <UserIconProfile />
                    </div>
                    <div className="user-container-info">
                        <label className="user-container-info-label">Username:</label>
                        <label className="user-container-info-output">{this.props.user.username}</label>
                    </div>
                    <div className="user-container-info">
                        <label className="user-container-info-label">Password:</label>
                        <label className="user-container-info-output">{this.passwordTransform()}</label>
                    </div>
                    <div className="user-container-info">
                        <label className="user-container-info-label">Role:</label>
                        <label className="user-container-info-output">{this.props.user.role}</label>
                    </div>
                    <div className="user-container-info-buttons">
                        <button onClick={this.handleClick} className="button-edit">
                            <EditPen />
                        </button>
                        <button onClick={() => { this.props.deleteUser(this.props.user.id) }} className="button-edit">
                            <Delete />
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default User;