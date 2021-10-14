import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import './BookingModal.scss';
import { LANGUAGES } from '../../../../../utils/constant';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../../components/Input/DatePicker';
import * as actions from '../../../../../store/actions';
import { createBookingScheduleService } from '../../../../../services/patientService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import localization from 'moment/locale/vi';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber:'',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            genderArr: {},
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGender()
    }

    componentDidUpdate(prevProps, prevState, snapshot) { 
        if(this.props.genders !== prevProps.genders){
            this.setState({
                genderArr: this.props.genders,
                gender: this.props.genders && this.props.genders.length > 0 ? this.props.genders[0].keyMap : ''
            })
        }
        if(this.props.dataScheduleModal !== prevProps.dataScheduleModal) {
            this.setState({
                doctorId:this.props.dataScheduleModal.doctorId,
                timeType: this.props.dataScheduleModal.timeType
            })
        }
    }

    handleToggle = () => {
        this.props.handleCloseModalBooking()
    }

    handleInput = (e, id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    handleDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleCreateBooking = async () => {
        let time = new Date(this.state.birthday).getTime();
        let gender = this.state.gender;
        let timeString = this.buildBookingTime(this.props.dataScheduleModal);
        let doctorName = this.buildDoctorName(this.props.dataScheduleModal);
        let res = await createBookingScheduleService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleModal.date,
            birthday: time,
            gender: gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        });
        if(res && res.errCode === 0) {
            toast.success("Create booking succeed!");
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                gender: '',
            })
            this.props.handleCloseModalBooking()
        }else{
            toast.error("Create booking fail!");
        }
    }

    buildBookingTime = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`;
        }else{
            return '';
        }
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
            : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }else{
            return '';
        }
    }

    render() { 
        let { dataScheduleModal } = this.props;
        let doctorId = ''; 
        let {genderArr} = this.state;
        if(dataScheduleModal && !_.isEmpty(dataScheduleModal)){
            doctorId = dataScheduleModal.doctorId;
        } 
        return (
            <Modal 
                isOpen={this.props.isOpenModal} 
                toggle={() => {this.handleToggle()}} 
                className={"booking-modal__container"} 
                size="lg"
                centered
            >
                <ModalHeader 
                    toggle={() => {this.handleToggle()}}
                    className="modal-booking__header"
                ><FormattedMessage id="patient.booking-modal.title" /></ModalHeader>
                <ModalBody>
                    <ProfileDoctor 
                        doctorId={doctorId}
                        isShowDescriptionDoctor={false}
                        dataScheduleModal={this.props.dataScheduleModal}
                        isShowLinkDetail={false}
                        isShowPrice={true}
                    />
                    <div className="row booking-modal__content">
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.fullname" />
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                onChange={(e) => {this.handleInput(e, 'fullName')}}
                                value={this.state.fullName}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.phone" />
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                onChange={(e) => {this.handleInput(e, 'phoneNumber')}}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                Email:
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                onChange={(e) => {this.handleInput(e, 'email')}}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.address" />
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                onChange={(e) => {this.handleInput(e, 'address')}}
                                value={this.state.address}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.birthday" />
                            </label>
                            <DatePicker 
                                onChange={this.handleDatePicker}
                                className="form-control"
                                value={this.state.birthday}
                            />
                        </div>
                        <div className="form-group col-6">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.gender" />
                            </label>
                            <select 
                                    id="inputState" 
                                    className="form-control"
                                    onChange={(e) => this.handleInput(e, 'gender')}
                                    value={this.state.gender}
                                >
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {LANGUAGES.VI === this.props.language ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        }) 
                                    }
                                </select>
                        </div>
                        <div className="form-group col-12">
                            <label className="booking-modal__content--lable">
                                <FormattedMessage id="patient.booking-modal.reason" />
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                onChange={(e) => {this.handleInput(e, 'reason')}}
                                value={this.state.reason}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                    color="primary" 
                    className="modal-user__btn--save"
                    onClick={() => {this.handleCreateBooking()}}
                ><FormattedMessage id="patient.booking-modal.save" /></Button>
                <Button color="secondary" onClick={() => {this.handleToggle()}} className="modal-user__btn--close">
                    <FormattedMessage id="patient.booking-modal.close" />
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGender())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
