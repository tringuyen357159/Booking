import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import './RemedyModal.scss';
import { LANGUAGES } from '../../../utils/constant';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../store/actions';
import { createBookingScheduleService } from '../../../services/patientService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import  CommonUtils  from '../../../utils/CommonUtils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: ''
        }
    }

    async componentDidMount() {
        if(this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) { 
       if(this.props.dataModal !==  prevProps.dataModal){
           this.setState({
               email: this.props.dataModal.email
           })
       }
    }

    handleToggle = () => {
        this.props.handleOpenModal()
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    handleChangeImage = async (e) => {
        let data = e.target.files[0];
        if(data) {
            let base64 = await CommonUtils.getBase64(data);
            this.setState({
                image: base64
            })
        }
    }

    render() { 
      
        return (
            <Modal 
                isOpen={this.props.isOpenModal} 
                toggle={() => {this.handleToggle()}} 
                className={"remedy-modal__container"} 
                size="md"
                centered
            >
                <ModalHeader 
                    toggle={() => {this.handleToggle()}}
                    className="remedy-modal__header"
                >Hoá đơn khám bệnh</ModalHeader>
                <ModalBody>
                    <div className="row remedy-modal__content">
                        <div className="form-group col-12 remedy-modal__item">
                            <label className="remedy-modal__content--lable">
                                Email
                            </label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="form-group col-12 remedy-modal__item">
                            <label className="remedy-modal__content--lable">
                                Chọn file đơn thuốc
                            </label>
                            <input 
                                type="file" 
                                onChange={(e) => this.handleChangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                    color="primary" 
                    className="modal-user__btn--save"
                    onClick={() => this.handleSendRemedy()}
                >Gửi</Button>
                <Button color="secondary" onClick={() => {this.handleToggle()}} className="modal-user__btn--close">
                    Đóng
                </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
