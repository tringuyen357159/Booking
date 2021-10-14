import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { toast } from 'react-toastify';
import HomeHeader from '../../HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfo from '../Doctor/DoctorInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyService } from '../../../../services/specialtyService';
import _ from 'lodash';
import { getAllCodeServices } from '../../../../services/userServices'

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailSpecialty: {},
            arrDoctorId: [],
            arrProvince: []
        }
    }

    async componentDidMount() {
        if( this.props.match && this.props.match.params && this.props.match.params.id ) {
            let id = this.props.match.params.id;
            let detail = await getDetailSpecialtyService({
                id: id,
                location: 'ALL'
            });
            let province = await getAllCodeServices('PROVINCE');
            if( detail && detail.errCode === 0 && province && province.errCode === 0) {
                let data = detail.data;
                let arrDoctor = [];
                if(data && !_.isEmpty(detail.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = province.data;
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn Quốc",
                        createdAt: null
                    })
                }
                this.setState({
                    dataDetailSpecialty: detail.data,
                    arrDoctorId: arrDoctor,
                    arrProvince: dataProvince ? dataProvince : []
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleOnChangeSelect = async (e) => {
        if( this.props.match && this.props.match.params && this.props.match.params.id ) {
            let location = e.target.value;
            let id = this.props.match.params.id;

            let detail = await getDetailSpecialtyService({
                id: id,
                location: location
            });
            if( detail && detail.errCode === 0) {
                let data = detail.data;
                let arrDoctor = [];
                if(data && !_.isEmpty(detail.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: detail.data,
                    arrDoctorId: arrDoctor,
                })
            }
        }
    }

    render() {
        let { dataDetailSpecialty, arrDoctorId, arrProvince } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">
                    <div className="detail-specialty-container__desc ">
                        <div className="container">
                            {dataDetailSpecialty && dataDetailSpecialty.descriptionHTML &&
                                    <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                        </div>
                    </div>
                    <div className="detail-specialty-container__search">
                        <div className="container">
                            <select
                                onChange={(e) => this.handleOnChangeSelect(e)}
                                className="detail-specialty-container__search--list"
                            >
                                {arrProvince && arrProvince.length > 0 &&
                                    arrProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="detail-specialty-content ">
                        <div className="container">
                            {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return(
                                        <div className="detail-specialty-container__list" key={index}>
                                            <div className="detail-specialty-container__list--left">
                                                <ProfileDoctor 
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                            <div className="detail-specialty-container__list--right">
                                                <div className="detail-specialty-container__list--right-top">
                                                    <DoctorSchedule 
                                                        doctorId={item}
                                                    />
                                                </div>
                                                <div className="detail-specialty-container__list--right-bottom">
                                                    <DoctorInfo 
                                                        doctorId={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
