import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUserServices,createNewUserServices,deleteUserServices,updateUserServices } from '../../../services/userServices';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {}
        }
    }

    //life circle
    async componentDidMount() {
        await this.handleGetAllUsers();
    }

    //handle get all user
    handleGetAllUsers = async () => {
        let response = await getAllUserServices('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }

    //handle open modal create 
    handleModalCreateUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    //handle open,close modal create
    handleToggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    //handle create new user
    handleCreateNewUser = async (data) => {
       try {
            let response = await createNewUserServices(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }
            else {
                await  this.handleGetAllUsers();
                this.setState({
                    isOpenModal: false 
                })
                //gởi yêu cầu lên thằng con
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
       } catch (error) {
            console.log(error);
       } 
    }

    //handle delete user
    handleDeleteUser = async (userId) => {
        console.log(userId);
        try {
            let response = await deleteUserServices(userId);
            if(response && response.errCode === 0 ) {
                await this.handleGetAllUsers();
            }else{
                alert(response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //handle open modal edit
    handleModalEditUser = (user) => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user
        })
    }

    //handle open,close modal edit
    handleToggleUserModalEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit
        })
    }

    //handle update user
    handleUpdateUser = async (data) => {
        try {
            let response = await updateUserServices(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }
            else {
                await  this.handleGetAllUsers();
                this.setState({
                    isOpenModalEdit: false 
                })
            }
       } catch (error) {
            console.log(error);
       } 
    }

    render() {
        let arrUsers = this.state.arrUser;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users No Redux</div>
                <div className="mx-2">
                    <buttont className="btn btn-primary px-4"
                        onClick={() => this.handleModalCreateUser()}
                    >
                        <i className="fas fa-plus"></i> 
                        Add User
                    </buttont>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.gender === 1 ? 'Male' : 'Female'}</td>
                                            <td>
                                                <button 
                                                    className="btn-edit"
                                                    onClick={() => this.handleModalEditUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => { if (window.confirm('Are you sure wish to delete this user?'))  this.handleDeleteUser(item.id) }} 
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <ModalUser
                    isOpenModal={this.state.isOpenModal}
                    handleToggleUserModal={this.handleToggleUserModal}
                    handleCreateNewUser={this.handleCreateNewUser}
                />
                {
                    this.state.isOpenModalEdit &&
                    <ModalEditUser 
                        isOpenModalEdit={this.state.isOpenModalEdit}
                        handleToggleUserModalEdit={this.handleToggleUserModalEdit}
                        currentUser={this.state.userEdit}
                        handleUpdateUser={this.handleUpdateUser}
                    />  
                }
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
