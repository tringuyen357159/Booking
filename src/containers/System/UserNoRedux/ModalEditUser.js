import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            roleId: '',
            gender: '',
        }
    }

    //lấy lại data
    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                roleId: user.roleId,
                gender: user.gender
            })
        }
    }

    //handle open,close modal => received props
    handleToggle = () => {
        this.props.handleToggleUserModalEdit()
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
        let arrInput = ['email', 'firstName', 'lastName', 'phoneNumber', 'address', 'roleId', 'gender'];
        for(let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    //handle update user => received props
    handleEditUser = () => {
        let isValid = this.handlecheckValidateInput();
        if(isValid === true) {
            this.props.handleUpdateUser(this.state);
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpenModalEdit} 
                toggle={() => {this.handleToggle()}} 
                className={"modal-user__container"} 
                size="md"
                centered
            >
                <ModalHeader toggle={() => {this.handleToggle()}}>EDIT USER</ModalHeader>
                <ModalBody>
                    <div className="modal-user__item">
                        <label>Email:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'email')}}
                            value={this.state.email}
                            readOnly
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
                        <label>Role:</label>
                        <input 
                            type="text" 
                            onChange={(e) => {this.handleInput(e, 'roleId')}}
                            value={this.state.roleId}
                            readOnly
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
                                    defaultChecked={this.state.gender === 1 ? 'checked' : ''}    
                                />
                                <span>Male</span>
                            </div>
                            <div className="modal-user__gender-item">
                                <input 
                                    type="radio"
                                    onChange={(e) => {this.handleInput(e, 'gender')}}
                                    value="0"
                                    name="gender"
                                    defaultChecked={this.state.gender === 0 ? 'checked' : ''}    
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
                    onClick={() => {this.handleEditUser()}}
                >Save Changes</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
