import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { withRouter } from "react-router";

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: []
        }
    }
   
    componentDidMount() {
        this.props.fetchSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.specialty !== prevProps.specialty) {
            this.setState({
                arrSpecialty:this.props.specialty
            })
        }
    }

    handleDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {
    let { arrSpecialty } = this.state;
        return (
           <>
                <div className="specialty">
                    <div className="section-specialty container">
                        <div className="section-specialty-content">
                            <div className="section-specialty-content__header">
                                <div className="section-specialty-content__header--title">
                                    <FormattedMessage id="homepage.specialty" />
                                </div>
                                <button className="section-specialty-content__header--btn">
                                    <FormattedMessage id="homepage.see-more" />
                                </button>
                            </div>
                            <Slider  {...this.props.settings}>
                                {arrSpecialty && arrSpecialty.length > 0 &&
                                    arrSpecialty.map((item, index) => {
                                        return (
                                            <div 
                                                className="section-specialty-content__item" 
                                                key={index}
                                                onClick={() => this.handleDetailSpecialty(item)}
                                            >
                                                <div 
                                                    className="section-specialty-content__item--img"
                                                    style={{ backgroundImage:  `url(${item.image})`}}
                                                >
                                                </div>
                                                <h3 className="section-specialty-content__item--title">
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
        specialty: state.specialty.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialty: () => dispatch(actions.fetchSpecialty())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
