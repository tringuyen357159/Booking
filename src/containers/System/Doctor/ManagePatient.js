import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { LANGUAGES,dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { sendRemeryServices,getBookingPatientServices } from '../../../services/doctorServices';
import RemedyModal from './RemedyModal';
import ClipLoader from "react-spinners/ClipLoader";

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate:  moment(new Date()).startOf('day').valueOf(),
            arrDataPatient: [],
            isOpenModal: false,
            dataModal: [],
            isShowLoading: false
        }
    }

    async componentDidMount() {
       await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getBookingPatientServices({
            doctorId: user.id,
            date: formatedDate
        });
        if(res && res.errCode === 0){
            this.setState({
                arrDataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
           await this.getDataPatient()
        })
    }

    handleConfirm = (item) => {
        console.log(item);
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenModal: true,
            dataModal: data
        })
    }

    handleOpenModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            dataModal: []
        })
    }

    sendRemedy = async (data) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await sendRemeryServices({
            email: data.email,
            image: data.image,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if(res && res.errCode === 0){
            this.setState({
                isShowLoading: false
            })
            toast.success('Send semery success!')
            await this.getDataPatient();
            this.setState({
                isOpenModal:false
            })
        }else{
            this.setState({
                isShowLoading: false
            })  
            toast.error('Send semery fail!')
        }
    }

    render() {
        let { arrDataPatient,isShowLoading } = this.state;
        return (
            <>
                <div className={isShowLoading === true ? 'show': ''}>
                    {isShowLoading === true ?
                        <ClipLoader 
                            color={'#ffffff'} 
                            loading={this.state.isShowLoading} 
                            size={100} 
                        />
                    :
                    <>
                        <div className="manage-patient-container">
                            <div className="title text-center">
                                <FormattedMessage id="manage-doctor.manage-patient" />
                            </div>
                            <div className="manage-patient-content">
                                <div className="container">
                                    <div className="col-6 form-group" style={{padding: '0',marginBottom: '40px'}}>
                                        <label className="manage-schedule-content__lable">
                                            <FormattedMessage id="manage-doctor.choose-date" />
                                        </label>
                                        <DatePicker 
                                            onChange={this.handleDatePicker}
                                            className="form-control"
                                            value={this.state.currentDate}
                                        />
                                    </div>
                                    <table id="customers">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th><FormattedMessage id="manage-doctor.name" /></th>
                                                <th><FormattedMessage id="manage-doctor.gender" /></th>
                                                <th><FormattedMessage id="manage-doctor.address" /></th>
                                                <th><FormattedMessage id="manage-doctor.reason" /></th>
                                                <th><FormattedMessage id="manage-doctor.date" /></th>
                                                <th><FormattedMessage id="manage-doctor.action" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arrDataPatient && arrDataPatient.length > 0 ? 
                                                arrDataPatient.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>
                                                                {this.props.language === LANGUAGES.VI ? 
                                                                    item.patientData.genderData.valueVi :
                                                                    item.patientData.genderData.valueEn
                                                                }
                                                            </td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{item.reason}</td>
                                                            <td>
                                                                {this.props.language === LANGUAGES.VI ? 
                                                                    item.timeTypeDataPatient.valueVi :
                                                                    item.timeTypeDataPatient.valueEn
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <button 
                                                                    className="btn btn-primary mr-3"
                                                                    onClick={() => this.handleConfirm(item)}
                                                                ><FormattedMessage id="manage-doctor.confirm" /></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr  className="text-center nodata">
                                                    <td colSpan= "7">
                                                        <FormattedMessage id="manage-doctor.no-data" />
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <RemedyModal 
                            isOpenModal={this.state.isOpenModal}
                            handleOpenModal={this.handleOpenModal}
                            dataModal={this.state.dataModal}
                            sendRemedy={this.sendRemedy}
                        />
                    </>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
