import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { getScheduleDoctorServices } from '../../../../services/doctorServices';
import { LANGUAGES } from '../../../../utils/constant';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allTime: [],
            isOpenModalBooking: false,
            dataScheduleModal: {}
        }
    }

    async componentDidMount() {
        let {language} = this.props;
        let allDays = this.getArrDays(language);
        if(this.props.doctorId) {
            let res = await getScheduleDoctorServices(this.props.doctorId, allDays[0].value);
            this.setState({
                allTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
        })
    }

    getArrDays = (language) => {
        let arrDate = [];
        for(let i = 0; i < 7 ; i++) {
            let object = {};
            if(this.props.language === LANGUAGES.VI) {
                if(i === 0){
                    let lablevi2 =  moment(new Date()).format('DD/MM');
                    let homnay = `Hôm nay - ${lablevi2}`;
                    object.lable = homnay;
                }else{
                    let lablevi =  moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.lable = this.capitalizeFirstLetter(lablevi);
                }
            }else{
                if(i === 0){
                    let lableen2 =  moment(new Date()).format('DD/MM');
                    let today = `Today - ${lableen2}`;
                    object.lable = today;
                }else{
                    object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);
        }
        return arrDate;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { 
        if(prevProps.language !== this.props.language){
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if(prevProps.doctorId !== this.props.doctorId){
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorServices(this.props.doctorId, allDays[0].value);
            this.setState({
                allTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        if( this.props.doctorId && this.props.doctorId !== -1 ) {
            let doctorId = this.props.doctorId;
            let date = e.target.value;
            let res = await getScheduleDoctorServices(doctorId, date);
            if(res && res.errCode === 0) {
                this.setState({
                    allTime: res.data ? res.data : []
                })
            }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleScheduleTime = (schedule) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: schedule
        })
    }

    handleCloseModalBooking = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }

    render() { 
        let {allDays, allTime} = this.state;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="doctor-schedule-content">
                        <div className="doctor-schedule-content__top">
                            <select 
                                className="doctor-schedule-content__top--select"
                                onChange={(e) => this.handleOnChangeSelect(e)}
                            >
                                {allDays && allDays.length > 0 &&
                                    allDays.map((item, index) => {
                                        return (
                                            <option 
                                                value={item.value} 
                                                key={index}
                                                className="doctor-schedule-content__top--select--item"
                                            >
                                                {item.lable}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="doctor-schedule-content__bottom">
                            <div className="doctor-schedule-content__bottom--title">
                                <i className="fas fa-calendar-alt"></i>
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule"/>
                                </span>
                            </div>
                            <div className="doctor-schedule-content__bottom--content">
                                {allTime && allTime.length > 0 ?
                                    <>
                                        {allTime.map((item, index) => {
                                            return (
                                                <button 
                                                    className={this.props.language === LANGUAGES.VI ? 'doctor-schedule-content__bottom--btn btn-vi' : 'doctor-schedule-content__bottom--btn btn-en'}
                                                    key={index}
                                                    onClick={() => this.handleScheduleTime(item)}
                                                >
                                                    {this.props.language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                </button>
                                            )
                                        })}
                                        <div className="doctor-schedule-content__bottom--content--bookfree">
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.choose"/> 
                                                <i className="far fa-hand-point-up"></i> 
                                                 <FormattedMessage id="patient.detail-doctor.book-free"/>
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <div className="doctor-schedule-content__bottom--desc">
                                        <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal 
                    isOpenModal={this.state.isOpenModalBooking}
                    handleCloseModalBooking={this.handleCloseModalBooking}
                    dataScheduleModal= {this.state.dataScheduleModal}
                />
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
