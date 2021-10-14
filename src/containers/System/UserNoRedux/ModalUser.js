import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            roleId: '',
            gender: '',
        }

        this.listenToEmitter();
    }

    //lắng nge từ thằng cha gởi qua
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                roleId: '',
                gender: '',
            })
        });
    }

    //handle open,close modal => received props
    handleToggle = () => {
        this.props.handleToggleUserModal()
    }

    //handle input
    handleInput = ( e, id ) => {
        let copystate = {...this.state};
        copystate[id] = e.target.value;
        this.setState({
            ...copystate
        })
    }

    //handle validation
    handlecheckValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'roleId', 'gender'];
        for(let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    //handle create new user => received props
    handleCreateUser = () => {
        let isValid = this.handlecheckValidateInput();
        if(isValid === true) {
            this.props.handleCreateNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpenModal} 
                toggle={() => {this.handleToggle()}} 
                className={"modal-user__container"} 
                size="md"
                centered
            >
                <ModalHeader toggle={() => {this.handleToggle()}}>CREATE USER</ModalHeader>
                <ModalBody>
                    <div className="modal-user__item">
                        <label>Email:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'email')}}
                            value={this.state.email}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'firstName')}}
                            value={this.state.firstName}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'lastName')}}
                            value={this.state.lastName}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Address:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'address')}}
                            value={this.state.address}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Phone:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'phoneNumber')}}
                            value={this.state.phoneNumber}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            onChange={(e) => {this.handleInput(e, 'password')}}
                            value={this.state.password}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Role:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'roleId')}}
                            value={this.state.roleId}
                        />
                    </div>
                    <div className="modal-user__item">
                        <label>Gender:</label>
                        <div className="modal-user__gender">
                            <div className="modal-user__gender-item">
                                <input 
                                    type="radio" 
                                    onChange={(e) => {this.handleInput(e, 'gender')}}
                                    value="1"
                                    name="gender"
                                />
                                <span>Male</span>
                            </div>
                            <div className="modal-user__gender-item">
                                <input 
                                    type="radio"
                                    onChange={(e) => {this.handleInput(e, 'gender')}}
                                    value="0"
                                    name="gender"
                                />
                                <span>Female</span>
                            </div> 
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                    color="primary" 
                    className="modal-user__btn--save"
                    onClick={() => {this.handleCreateUser()}}
                >Save</Button>
                <Button color="secondary" onClick={() => {this.handleToggle()}} className="modal-user__btn--close">Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
