import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

   

    render() {

        return (
           <>
                <div className="footer">
                    <div className="section-footer container">
                        <div className="section-footer-content">
                            © 2021 Nguyễn Văn Trí.
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
