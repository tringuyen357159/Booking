import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { getProfileDoctorServices } from '../../../../services/doctorServices';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getProfileDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getProfileDoctor = async (id) => {
        let result = {};
        if(id){
            let data = await getProfileDoctorServices(id);
            if(data && data.errCode === 0){
                result = data.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { 
        if(this.props.doctorId !== prevProps.doctorId){
            let data = await this.getProfileDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data
            })
        }
    }

    renderTimeBooking = (dataTime) => {
        let {language} = this.props;
        if(dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return(
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.free-booking" /> </div>
                </>
            )
        }else{
            <></>
        }
    }


    render() { 
        let {dataProfile} = this.state;
        let namevi = '', nameen = '';
        if(dataProfile && dataProfile.positionData){
            namevi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameen = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        let { dataScheduleModal } = this.props;
        return (
            <>
               <div className="profile-doctor-content__intro">
                    <div className="profile-doctor-content__intro--content">
                        <div 
                            className="profile-doctor-content__intro--right"
                            style={{ backgroundImage:  `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}
                        ></div>
                        <div className="profile-doctor-content__intro--left">
                        <h2>
                            {this.props.language === LANGUAGES.VI ? namevi : nameen}
                        </h2>
                        {this.props.isShowDescriptionDoctor === true ?
                            <>
                                { dataProfile.Markdown && dataProfile.Markdown.description && 
                                    <p dangerouslySetInnerHTML={{__html: dataProfile.Markdown.description }}>
                                        {/* {detailDoctor.Markdown.description} */}
                                    </p>
                                }
                            </>
                            :
                            <>
                                {this.renderTimeBooking(dataScheduleModal)}
                            </>
                        }
                        </div>
                    </div>
                    {this.props.isShowLinkDetail === true && 
                        <Link 
                            to={`/detail-doctor/${this.props.doctorId}`}
                            className="profile-doctor-content__intro--link"
                        >Xem thêm</Link>
                    }
                    {this.props.isShowPrice === true &&
                        <div className="profile-doctor-content__intro--price">
                            <FormattedMessage id="patient.booking-modal.price" /> 
                            {dataProfile && dataProfile.Doctor_Infor && this.props.language === LANGUAGES.VI && 
                                <NumberFormat 
                                    value={dataProfile.Doctor_Infor.priceData.valueVi} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    suffix={'VNĐ'} 
                                />
                            }
                            {dataProfile && dataProfile.Doctor_Infor && this.props.language === LANGUAGES.EN && 
                                <NumberFormat 
                                    value={dataProfile.Doctor_Infor.priceData.valueEn} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'} 
                                />
                            }
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
