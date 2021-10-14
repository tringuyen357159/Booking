import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import { LANGUAGES } from '../../../../utils/constant';
import { toast } from 'react-toastify';
import HomeHeader from '../../HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInfo from '../Doctor/DoctorInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicService } from '../../../../services/clinicService';
import _ from 'lodash';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailClinic: {},
            arrDoctorId: [],
        }
    }

    async componentDidMount() {
        if( this.props.match && this.props.match.params && this.props.match.params.id ) {
            let id = this.props.match.params.id;
            let detail = await getDetailClinicService({
                id: id
            });
            console.log(detail);
            if( detail && detail.errCode === 0) {
                let data = detail.data;
                let arrDoctor = [];
                if(data && !_.isEmpty(detail.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: detail.data,
                    arrDoctorId: arrDoctor,
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }


    render() {
        let { dataDetailClinic, arrDoctorId } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="detail-clinic-container">
                    <div className="detail-clinic-container__desc ">
                        <div className="container">
                            <div className="detail-clinic-container__desc--name">
                                {dataDetailClinic && dataDetailClinic.descriptionHTML && 
                                    dataDetailClinic.name
                                }
                            </div>
                            <div className="detail-clinic-container__desc--address">
                                Địa chỉ: {dataDetailClinic && dataDetailClinic.descriptionHTML && 
                                    dataDetailClinic.address
                                }
                            </div>
                            {dataDetailClinic && dataDetailClinic.descriptionHTML &&
                                <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML }}></div>
                            }
                        </div>
                    </div>
                    <div className="detail-clinic-content ">
                        <div className="container">
                            {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return(
                                        <div className="detail-clinic-container__list" key={index}>
                                            <div className="detail-clinic-container__list--left">
                                                <ProfileDoctor 
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                            <div className="detail-clinic-container__list--right">
                                                <div className="detail-clinic-container__list--right-top">
                                                    <DoctorSchedule 
                                                        doctorId={item}
                                                    />
                                                </div>
                                                <div className="detail-clinic-container__list--right-bottom">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
