import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { withRouter } from "react-router";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinic: []
        }
    }

    componentDidMount() {
        this.props.fetchClinic();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.clinics !== prevProps.clinics) {
            this.setState({
                arrClinic:this.props.clinics
            })
        }
    }

    handleDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    render() {
        let { arrClinic } = this.state;
        return (
           <>
                <div className="medicalfacility">
                    <div className="section-medicalfacility container">
                        <div className="section-medicalfacility-content">
                            <div className="section-medicalfacility-content__header">
                                <div className="section-medicalfacility-content__header--title">
                                    <FormattedMessage id="homepage.medical-facility" />
                                </div>
                                <button className="section-medicalfacility-content__header--btn">
                                    <FormattedMessage id="homepage.see-more" />
                                </button>
                            </div>
                            <Slider {...this.props.settings}>
                                {arrClinic && arrClinic.length > 0 &&
                                    arrClinic.map((item, index) => {
                                        return(
                                            <div 
                                                className="section-medicalfacility-content__item"
                                                key={index}
                                                onClick={() => this.handleDetailClinic(item)}
                                            >
                                                <div 
                                                    className="section-medicalfacility-content__item--img"
                                                    style={{ backgroundImage:  `url(${item.image})`}}
                                                >
                                                </div>
                                                <h3 className="section-medicalfacility-content__item--title">
                                                    {item.name}
                                                </h3>
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
        clinics: state.specialty.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinic: () => dispatch(actions.fetchClinic())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
