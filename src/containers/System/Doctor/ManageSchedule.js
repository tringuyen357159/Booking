import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { LANGUAGES,dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createScheduleDoctor } from '../../../services/doctorServices';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            selectedDoctor: '',
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleHours();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.doctors !== this.props.doctors){
            let dataSelect = this.handleInputSelect(this.props.doctors);
            this.setState({
                arrDoctors: dataSelect
            })
        }
        if(prevProps.schedule !== this.props.schedule){
            let data = this.props.schedule;
            if(data && data.length > 0 ){
                data = data.map(item => ({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let lablevi = `${item.lastName} ${item.firstName}`;
                let lableen = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? lablevi : lableen;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ 
            selectedDoctor
        });
    }

    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
               if(item.id === time.id){
                   item.isSelected = !item.isSelected;
               }
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleCreateSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        if(!currentDate) {
            toast.error("Invalid date!");
            return ;
        }
        if(!selectedDoctor){
            toast.error("Invalid selected doctor!");
            return;
        }
        let formatDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length > 0){
            let selectTime = rangeTime.filter(item => item.isSelected === true);
            if(selectTime && selectTime.length > 0) {
                selectTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = item.keyMap
                    result.push(object);
                })
            }else{
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await createScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate
        });

        if(res && res.errCode === 0) {
            toast.success("Create success!");
        }else{
            toast.error("Create fail!");
        }
    }

    render() {
        let { language } = this.props;
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="title text-center">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="manage-schedule-content container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="manage-schedule-content__lable">
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.arrDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="manage-schedule-content__lable">
                                    <FormattedMessage id="manage-schedule.choose-time" />
                                </label>
                                <DatePicker 
                                    onChange={this.handleDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div  className="col-12 manage-schedule-content__hours">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button 
                                                key={index} 
                                                className={item.isSelected === true ? 'btn manage-schedule-content__btn active' : 'btn manage-schedule-content__btn'}
                                                onClick={() => this.handleClickBtnTime(item)}
                                            >
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-12">
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => this.handleCreateSchedule()}
                                >
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors : state.doctor.allDoctors,
        schedule: state.doctor.allScheduleHours,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()), 
        fetchAllScheduleHours : () => dispatch(actions.fetchAllScheduleHours())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
