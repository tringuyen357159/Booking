import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { getAllCodeServices } from '../../../services/userServices';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant';
import  CommonUtils  from '../../../utils/CommonUtils';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: {},
            roleArr: {},
            positionArr: {},
            ImageUrl: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            roleId: '',
            gender: '',
            positionId: '',
            image: '',
            action: '',
            userId: ''
        }
    }

    async componentDidMount() {
        this.props.getGender();
        this.props.getRole();
        this.props.getPosition();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //kiểm tra state cũ với hiện tại nếu khác thì re-render
        if( prevProps.genders !== this.props.genders ){
            let copyGenders = this.props.genders;
            this.setState({
                genderArr: copyGenders,
                gender: copyGenders && copyGenders.length > 0 ? copyGenders[0].keyMap : ''
            })
        }
        if( prevProps.roles !== this.props.roles ){
            let copyRoles = this.props.roles;
            this.setState({
                roleArr: copyRoles,
                roleId: copyRoles && copyRoles.length > 0 ? copyRoles[0].keyMap : ''
            })
        }
        if( prevProps.positions !== this.props.positions ){
            let copyPosition = this.props.positions;
            this.setState({
                positionArr: copyPosition,
                positionId: copyPosition && copyPosition.length > 0 ? copyPosition[0].keyMap : ''
            })
        }
        if(prevProps.users !== this.props.users) {
            let copyGenders = this.props.genders;
            let copyRoles = this.props.roles;
            let copyPosition = this.props.positions;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                roleId: copyRoles && copyRoles.length > 0 ? copyRoles[0].keyMap : '',
                gender: copyGenders && copyGenders.length > 0 ? copyGenders[0].keyMap : '',
                positionId: copyPosition && copyPosition.length > 0 ? copyPosition[0].keyMap : '',
                image: '',
                action: CRUD_ACTION.CREATE,
                ImageUrl: ''
            })
        }
    }

    handleChangeImage = async (e) => {
        let data = e.target.files[0];
        if(data) {
            let base64 = await CommonUtils.getBase64(data);
            let file = URL.createObjectURL(data);
            this.setState({
                ImageUrl: file,
                image: base64
            })
        }
    }

    handleOpenImage = () => {
        if(!this.state.ImageUrl)
            return;
        this.setState({
            isOpen: true
        })
    }

    handleOnChangeinput = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handlecheckValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'roleId', 'gender','positionId'];
        const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        for(let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        if(!email.test(this.state.email) ){
            isValid = false;
            alert('Email invalidate');
        }
        if(!phone.test(this.state.phoneNumber)) {
            isValid = false;
            alert('Phone invalidate');
        }

        return isValid;
    }

    handleCreateUsers = () => {
        let isValid = this.handlecheckValidateInput();
        let action = this.state.action;
        if(action === CRUD_ACTION.CREATE){
            if(isValid === true) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    phoneNumber: this.state.phoneNumber,
                    positionId: this.state.positionId,
                    image: this.state.image
                })
            }
        }
        if(action === CRUD_ACTION.EDIT){
            this.props.editUser({
                id: this.state.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleId,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.positionId,
                image: this.state.image
            });
        }
    }

    handleEditUser = (user) => {

        let img = '';
        if(user.image) {
            img = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
            gender: user.gender,
            positionId: user.positionId,
            image: '',
            action: CRUD_ACTION.EDIT,
            userId: user.id,
            ImageUrl: img
        })
    }

    render() {

        let language = this.props.language;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        return (
            <div className="users-container">
                <div className="title text-center"><FormattedMessage id="manage-user.title" /></div>
                <div className="user-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 user-content__title">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.firstname" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleOnChangeinput(e, 'firstName')}
                                />
                           </div>
                           <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.lastname" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleOnChangeinput(e, 'lastName')}
                                />
                           </div>
                           <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.address" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="Address"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeinput(e, 'address')}
                                />
                           </div>
                           <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.email" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnChangeinput(e, 'email')}
                                    
                                />
                           </div>
                           <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.password" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="password" 
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangeinput(e, 'password')}
                                />
                           </div>
                           <div  className="col-4 user-content__item">
                                <label className="user-content__lable" >
                                    <FormattedMessage id="manage-user.phone" />:
                                </label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="Phone"
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeinput(e, 'phoneNumber')}
                                />
                           </div>
                           <div  className="col-3 user-content__item">
                                <label htmlFor="inputState" className="user-content__lable">
                                    <FormattedMessage id="manage-user.gender" />:
                                </label>
                                <select 
                                    id="inputState" 
                                    className="form-control"
                                    onChange={(e) => this.handleOnChangeinput(e, 'gender')}
                                    value={this.state.gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {LANGUAGES.VI === language ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        }) 
                                    }
                                </select>
                           </div>
                           <div  className="col-3 user-content__item">
                                <label htmlFor="inputState" className="user-content__lable">
                                    <FormattedMessage id="manage-user.role" />:
                                </label>
                                <select 
                                    id="inputState" 
                                    className="form-control"
                                    onChange={(e) => this.handleOnChangeinput(e, 'roleId')}
                                    value={this.state.roleId}
                                >
                                    {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {LANGUAGES.VI === language ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            }) 
                                    }
                                </select>
                           </div>
                           <div  className="col-3 user-content__item">
                                <label htmlFor="inputState" className="user-content__lable">
                                    <FormattedMessage id="manage-user.position" />:
                                </label>
                                <select 
                                    id="inputState" 
                                    className="form-control"
                                    onChange={(e) => this.handleOnChangeinput(e, 'positionId')}
                                    value={this.state.positionId}
                                >
                                    {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {LANGUAGES.VI === language ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            }) 
                                    }
                                </select>
                           </div>
                           <div className="col-3 user-content__item">
                                <label htmlFor="inputState" className="user-content__lable">
                                    <FormattedMessage id="manage-user.image" />:
                                </label>
                                <div>
                                    <input 
                                        type="file" 
                                        id="input-img" 
                                        hidden
                                        onChange={(e) => this.handleChangeImage(e)}
                                    />
                                    <div className="user-content__customize">
                                        <label htmlFor="input-img" className="user-content__upload">
                                            <FormattedMessage id="manage-user.upload-img" />
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        
                                        <div className={this.state.ImageUrl ? 'user-content__img' : ''}
                                            style={{ backgroundImage:  `url(${this.state.ImageUrl})`}}
                                            onClick={() => this.handleOpenImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className="col-12 user-content__item">
                                <button 
                                    className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleCreateUsers()}
                                >
                                    {this.state.action === CRUD_ACTION.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                    :   
                                        <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>
                        </div>
                        <div className="user-content__item mb-5">
                            <TableManageUser 
                                handleUpdateUser={this.handleEditUser}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
               
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.ImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders : state.admin.genders,
        roles : state.admin.roles,
        positions : state.admin.positions,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGender()), 
        getRole: () => dispatch(actions.fetchRole()), 
        getPosition: () => dispatch(actions.fetchPosition()), 
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
