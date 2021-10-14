import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from "react-router";

class HomeHeader extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    handleLogo = () => {
        this.props.history.push('/home')
    }

    render() {

        let language = this.props.language;
        
        return (
            <>
                <div className="home-header">
                    <div className="home-header-container container">
                        <div className="home-header-content">
                            <div className="home-header-content__left">
                                <i className="fas fa-bars home-header-content__left--icon"></i>
                                <div 
                                    className="home-header-content__left--logo"
                                    onClick={() => this.handleLogo()}
                                ></div>
                            </div>
                            <div className="home-header-content__centre">
                                <div className="home-header-content__centre--item">
                                    <div className="home-header-content__centre--title">
                                    <FormattedMessage id="home-header.speciality"/>
                                    </div>
                                    <div className="home-header-content__centre--desc">
                                        <FormattedMessage id="home-header.search-doctor"/>
                                    </div>
                                </div>
                                <div className="home-header-content__centre--item">
                                    <div className="home-header-content__centre--title">
                                        <FormattedMessage id="home-header.health-facility"/>
                                    </div>
                                    <div className="home-header-content__centre--desc">
                                        <FormattedMessage id="home-header.select-room"/>
                                    </div>
                                </div>
                                <div className="home-header-content__centre--item">
                                    <div className="home-header-content__centre--title">
                                        <FormattedMessage id="home-header.doctor"/>
                                    </div>
                                    <div className="home-header-content__centre--desc">
                                        <FormattedMessage id="home-header.select-doctor"/>
                                    </div>
                                </div>
                                <div className="home-header-content__centre--item">
                                    <div className="home-header-content__centre--title">
                                        <FormattedMessage id="home-header.fee"/>
                                    </div>
                                    <div className="home-header-content__centre--desc">                                       
                                        <FormattedMessage id="home-header.check-health"/>
                                    </div>
                                </div>
                            </div>
                            <div className="home-header-content__right">
                                <i className="fas fa-question-circle home-header-content__right--icon"></i>
                                <div className="home-header-content__right--support"> 
                                    <FormattedMessage id="home-header.support"/>
                                </div>
                                <div 
                                    className={ language === LANGUAGES.EN ? 
                                    'home-header-content__right--language--en active' : 
                                    'home-header-content__right--language--en' }
                                > 
                                    <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span> 
                                </div>
                                <div 
                                    className={ language === LANGUAGES.VI ? 
                                    'home-header-content__right--language--vi active' : 
                                    'home-header-content__right--language--vi' }
                                >
                                    <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-banner-container">
                        <div className="home-banner-content">
                            <div className="home-banner-content-top">
                                <h2 className="home-banner-content-top__title">
                                    <FormattedMessage id="banner.medical-backgroud"/>
                                </h2>
                                <h3 className="home-banner-content-top__heading">
                                    <FormattedMessage id="banner.health-care"/>     
                                </h3>
                                <div className="home-banner-content-top__search">
                                    <i className="fas fa-search home-banner-content-top__search--icon"></i>
                                    <input className="home-banner-content-top__search--input" placeholder="Tìm kiếm"/>
                                </div>
                            </div>
                            <div className="home-banner-content-bottom">
                                <div className="home-banner-content-bottom__options">
                                    <ul className="home-banner-content-bottom__options-list">
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img1 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.special-examination"/>  
                                            </div>
                                        </li>
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img2 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.remote-examination"/>  
                                            </div>
                                        </li>
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img3 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.general-examination"/> 
                                            </div>
                                        </li>
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img4 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.medical-test"/> 
                                            </div>
                                        </li>
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img5 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.mental-health"/> 
                                            </div>
                                        </li>
                                        <li className="home-banner-content-bottom__options-item">
                                            <div className="home-banner-content-bottom__options-item--img6 banner-img"></div>
                                            <div className="home-banner-content-bottom__options-item--title">
                                                <FormattedMessage id="banner.mental-health"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>      
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
