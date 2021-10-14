import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {

    render() {

        return (
           <>
                <div className="handbook">
                    <div className="section-handbook container">
                        <div className="section-handbook-content">
                            <div className="section-handbook-content__header">
                                <div className="section-handbook-content__header--title">
                                    Cẩm nang
                                </div>
                                <button className="section-handbook-content__header--btn">
                                    Xem thêm
                                </button>
                            </div>
                            <Slider {...this.props.settings}>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
                                <div className="section-handbook-content__item">
                                    <div className="section-handbook-content__item--img">
                                    </div>
                                    <h3 className="section-handbook-content__item--title">
                                        Bệnh viện Chợ Rẫy
                                    </h3>
                                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
