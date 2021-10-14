import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import './DoctorInfo.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { getExtraInfoDoctorServices } from '../../../../services/doctorServices';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {
        if(this.props.doctorId){
            let data = await getExtraInfoDoctorServices(this.props.doctorId);
            if(data && data.errCode ===0) {
                this.setState ({
                    extraInfo: data.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { 

        if(prevProps.doctorId !== this.props.doctorId){
            let data = await getExtraInfoDoctorServices(this.props.doctorId);
            if(data && data.errCode ===0) {
                this.setState ({
                    extraInfo: data.data
                })
            }
        }
    }

    handleShow = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() { 
        let {extraInfo}  = this.state;
        return (
            <>
                <div className="doctor-info-container">
                    <div className="doctor-info-content">
                        <div className="doctor-info-content__top">
                            <div className="doctor-info-content__lable">
                                <FormattedMessage id="patient.detail-doctor.address" />
                            </div>
                            <div className="doctor-info-content__name--clinic">
                                {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                            </div>
                            <div className="doctor-info-content__address--clinic">
                                {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                            </div>
                        </div>

                        <div className="doctor-info-content__bottom">
                            <span className="doctor-info-content__price--lable">
                                <FormattedMessage id="patient.detail-doctor.price" />
                            </span> 
                            {this.state.isShow === false ?
                                <>
                                    {extraInfo && extraInfo.priceData && this.props.language === LANGUAGES.VI && 
                                        <>
                                            <NumberFormat 
                                                value={extraInfo.priceData.valueVi} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={'VNĐ'} 
                                                className="doctor-info-content__price--price"
                                            />
                                            <span>.</span>
                                        </>
                                    }
                                    {extraInfo && extraInfo.priceData && this.props.language === LANGUAGES.EN && 
                                        <>
                                            <NumberFormat 
                                                value={extraInfo.priceData.valueEn} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'$'} 
                                                className="doctor-info-content__price--price"
                                            />
                                            <span>.</span>
                                        </>
                                    }
                                    <span 
                                        className="doctor-info-content__price--btn"
                                        onClick={() => this.handleShow()}
                                    > <FormattedMessage id="patient.detail-doctor.more-info" /></span>
                                </>
                            :
                                <>
                                    <div className="doctor-info-content__price--desc">
                                        <div className="doctor-info-content__price--desc--top">
                                            <div className="doctor-info-content__price--desc--top--left">
                                                <FormattedMessage id="patient.detail-doctor.price" />
                                                <br/>
                                                <p>{extraInfo && extraInfo.note ? extraInfo.note : ''}</p>
                                            </div>
                                            <div className="doctor-info-content__price--desc--top--right">
                                                {extraInfo && extraInfo.priceData && this.props.language === LANGUAGES.VI && 
                                                    <NumberFormat 
                                                        value={extraInfo.priceData.valueVi} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        suffix={'VNĐ'} 
                                                        className="doctor-info-content__price--price"
                                                    />
                                                }
                                                {extraInfo && extraInfo.priceData && this.props.language === LANGUAGES.EN && 
                                                    <NumberFormat 
                                                        value={extraInfo.priceData.valueEn} 
                                                        displayType={'text'} 
                                                        thousandSeparator={true} 
                                                        prefix={'$'} 
                                                        className="doctor-info-content__price--price"
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="doctor-info-content__price--desc--bottom">
                                            <FormattedMessage id="patient.detail-doctor.payment" />
                                            {extraInfo && extraInfo.paymentData && this.props.language === LANGUAGES.VI && extraInfo.paymentData.valueVi}
                                            {extraInfo && extraInfo.paymentData && this.props.language === LANGUAGES.EN && extraInfo.paymentData.valueEn}
                                        </div>
                                    </div>
                                    <span 
                                        className="doctor-info-content__price--desc--btn"
                                        onClick={() => this.handleShow()}
                                    ><FormattedMessage id="patient.detail-doctor.hidden-info" /></span>
                                </>
                            }   
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
