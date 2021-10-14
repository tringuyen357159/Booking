import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginServices } from '../../services/userServices';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleUserName = (e) => {   
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
           let data = await handleLoginServices(this.state.username, this.state.password);
           if(data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
           }
           if(data && data.errCode === 0) {
               this.props.userLoginSuccess(data.user)
           }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }
        }
       
    }

    handleHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13){
            this.handleLogin();
        }
    }

    render() {

        return (
            <>
                <div className="login">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 login__heading">LOGIN</div>
                            <div className="col-12 form-group">
                                <label className="login__lable">UserName:</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Enter your name" 
                                    value={this.state.username}
                                    onChange={(e) => {this.handleUserName(e)}}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label className="login__lable">Password:</label>
                                <div className="login__input--password">
                                    <input 
                                        type={this.state.isShowPassword ? 'text' : 'password'} 
                                        className="form-control" 
                                        placeholder="Enter your password" 
                                        value={this.state.password}
                                        onChange={(e) => {this.handlePassword(e)}}
                                        onKeyDown={(e) => this.handleKeyDown(e)}
                                    />
                                    <span onClick={() => {this.handleHidePassword()}}>
                                        <i className={this.state.isShowPassword ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{color:'red'}}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 form-group">
                                <button 
                                    className="login__submit" 
                                    onClick={() => {this.handleLogin()}}

                                >Login</button>
                            </div>
                            <div className="col-12 ">
                                <span className="login__forgot">Forgot your password?</span>
                            </div>
                            <div className="col-12 mt-2">
                                <span className="login__other">Login with:</span>
                            </div>
                            <div className="col-12 mt-2 login__social">
                                <div className="login__social--facebook"></div>
                                <div className="login__social--google"></div>             
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
