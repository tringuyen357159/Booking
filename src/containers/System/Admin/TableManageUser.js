import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import * as ReactDOM from 'react-dom';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUsers: []
        }
    }

    componentDidMount(){
        this.props.fetchAllUser();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.users !== this.props.users){
            this.setState({
                listUsers: this.props.users
            })
        }
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    }

    handleEditUser = (user) => {
        this.props.handleUpdateUser(user);
    }

    render() {
        let arrUsers = this.state.listUsers;
        console.log(arrUsers);
        return (
            <>
            <div className="users-container">
                <div className="users-table mt-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th><FormattedMessage id="manage-user.email" /></th>
                                <th><FormattedMessage id="manage-user.firstname" /></th>
                                <th><FormattedMessage id="manage-user.lastname" /></th>
                                <th><FormattedMessage id="manage-user.address" /></th>
                                <th><FormattedMessage id="manage-user.phone" /></th>
                                <th><FormattedMessage id="manage-user.gender" /></th>
                                <th><FormattedMessage id="manage-user.position" /></th>
                                <th><FormattedMessage id="manage-user.role" /></th>
                                <th><FormattedMessage id="manage-user.action" /></th>
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
                                            <td>
                                                {this.props.language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}
                                            </td>
                                            <td>
                                                {this.props.language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}
                                            </td>
                                            <td>
                                                {this.props.language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn }
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
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
            </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser: () => dispatch(actions.fetchAllUser()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
