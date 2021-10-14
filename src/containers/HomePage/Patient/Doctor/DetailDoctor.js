import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader';
import './DetailDoctor.scss';
import { getDetailDoctorServices } from '../../../../services/doctorServices';
import { LANGUAGES } from '../../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
import DoctorInfo from './DoctorInfo';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if( this.props.match && this.props.match.params && this.props.match.params.id ) {
            let inputId = this.props.match.params.id;
            this.setState({
                currentDoctorId: inputId
            })
            let detail = await getDetailDoctorServices(inputId);
            if( detail && detail.errCode === 0) {
                this.setState({
                    detailDoctor: detail.data,
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) { 
    }

    render() { 
        let detailDoctor = this.state.detailDoctor;
        let namevi = '', nameen = '';
        if(detailDoctor && detailDoctor.positionData){
            namevi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameen = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="detail-doctor-container">
                    <div className="detail-doctor-content">
                        <div className="detail-doctor-content__intro">
                            <div className="container detail-doctor-content__intro--content">
                                <div 
                                    className="detail-doctor-content__intro--right"
                                    style={{ backgroundImage:  `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                                ></div>
                                <div className="detail-doctor-content__intro--left">
                                <h2>
                                    {this.props.language === LANGUAGES.VI ? namevi : nameen}
                                </h2>

                                { detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                    <p dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.description }}>
                                        {/* {detailDoctor.Markdown.description} */}
                                    </p>
                                }
                                </div>
                            </div>
                        </div>
                        <div className="detail-doctor-content__schedule">
                            <div  className="container detail-doctor-content__schedule--content">
                                <div className="col-6 detail-doctor-content__schedule--left">
                                    <DoctorSchedule 
                                        doctorId={this.state.currentDoctorId}
                                    />
                                </div>

                                <div className="col-6 detail-doctor-content__schedule--right">
                                    <DoctorInfo
                                        doctorId={this.state.currentDoctorId}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="detail-doctor-content__desc">
                            <div className="container">
                                {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                    <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML }}></div>
                                }
                            </div>
                        </div>
                        <div className="detail-doctor-content__comment">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
