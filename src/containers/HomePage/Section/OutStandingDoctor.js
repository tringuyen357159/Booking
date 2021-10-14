import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           arrDoctor: []
        }
    }

    componentDidMount() {
        this.props.handleLoadDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if( prevProps.doctors !== this.props.doctors){
            this.setState({
                arrDoctor: this.props.doctors
            })
        }
    }

    handleDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let listDoctor = this.state.arrDoctor;
        return (
           <>
                <div className="outstandingdoctor">
                    <div className="section-outstandingdoctor container">
                        <div className="section-outstandingdoctor-content">
                            <div className="section-outstandingdoctor-content__header">
                                <div className="section-outstandingdoctor-content__header--title">
                                    <FormattedMessage id="homepage.out-standing-doctor" />
                                </div>
                                <button className="section-outstandingdoctor-content__header--btn">
                                    <FormattedMessage id="homepage.see-more" />
                                </button>
                            </div>
                            <Slider  {...this.props.settings}>
                                {listDoctor && listDoctor.length > 0 && 
                                    listDoctor.map((item, index) => {
                                        let img = '';
                                        if(item.image) {
                                            img = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        let namevi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                        let nameen = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                                        return(
                                            <div 
                                                className="section-outstandingdoctor-content__item" 
                                                key={index}
                                                onClick={() => this.handleDetailDoctor(item)}
                                            >
                                                <div className="section-outstandingdoctor-content__item-customer">
                                                    <div 
                                                        className="section-outstandingdoctor-content__item--img"
                                                        style={{ backgroundImage:  `url(${img})`}}
                                                    >
                                                    </div>
                                                    <h3 className="section-outstandingdoctor-content__item--title">
                                                    {   this.props.language === LANGUAGES.VI ? 
                                                       namevi
                                                    :
                                                        nameen
                                                    }
                                                    </h3>
                                                    <h5 className="section-outstandingdoctor-content__item--desc">
                                                        Da liễu
                                                    </h5>   
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
           </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctors: state.doctor.doctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleLoadDoctor: () => dispatch(actions.fetchDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
