import React from 'react';
import { UserIcon } from '../../Icons/IconUser';
import { PasswordIcon } from '../../Icons/IconPassword';

class ExistingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <div className="login-form-container">
                    <div className="login-form-input-container">
                        <label className="login-form-header">Log-in</label>
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><UserIcon /></label>
                        <input type="text" className="login-form-input-input" value={this.props.username} onChange={this.props.handleChangeUserName} />
                    </div>

                    <div className="login-form-input-container">
                        <label className="login-form-input-label"><PasswordIcon /></label>
                        <input type="password" className="login-form-input-input" value={this.props.password} onChange={this.props.handleChangePassword} />
                    </div>

                    <button className="login-form-button" onClick={this.props.logInCheck}>Log-in</button>

                    <div className="create-user-wrapper">
                        <label className='not-a-member'>Not a member?</label>
                        <button onClick={this.props.changePageStateToNewUser} className='create-user-button'>Create account</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ExistingUser;