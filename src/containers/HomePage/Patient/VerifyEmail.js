import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import { createVerifyEmailService } from '../../../services/patientService';
import HomeHeader from '../HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let data = await createVerifyEmailService({
                token: token,
                doctorId: doctorId
            })

            if(data && data.errCode === 0 ){
                this.setState({
                    statusVerify: true,
                    errCode: data.errCode
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode:data && data.errCode ? data.errCode : -1
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) { 
    }

    render() {

        return (
           <>
                <HomeHeader />
                {this.state.VerifyEmail === false ?
                    <div>
                        Loading data...
                    </div>
                    :
                    <div>
                        {this.state.errCode === 0  ?
                            <div className="title text-center"> Xác nhận lịch hẹn thành công </div>
                            :
                            <div className="title text-center"> Lịch hẹn không tồn tại hoặc đã xác nhận </div>
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
