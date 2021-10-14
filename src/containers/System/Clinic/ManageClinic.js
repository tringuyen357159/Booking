import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { toast } from 'react-toastify';
import { createClinicService } from '../../../services/clinicService';
import Lightbox from 'react-image-lightbox';
import  CommonUtils  from '../../../utils/CommonUtils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,
            ImageUrl: '',
            image: '',
            address: ''
        }
    }

    componentDidMount() {
       
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleName = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleChangeImage = async (e) => {
        let data = e.target.files[0];
        if(data) {
            let base64 = await CommonUtils.getBase64(data);
            let file = URL.createObjectURL(data);
            this.setState({
                ImageUrl: file,
                image: base64
            })
        }
    }

    handleOpenImage = () => {
        if(!this.state.ImageUrl)
            return;
        this.setState({
            isOpen: true
        })
    }

    handleCreateSpecialty = async () => {
        let res = await createClinicService({
            name: this.state.name,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            image: this.state.image,
            address: this.state.address
        })
        if(res && res.errCode === 0){
            toast.success('Create Clinic success!')
            this.setState({
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                ImageUrl: '',
                image: '',
                address: ''
            })
        }else{
            toast.error('Create Clinic fail!')
        }
    }

    render() {
        return (
            <>
                 <div className="manage-clinic-container">
                    <div className="title text-center">
                        <div><FormattedMessage id="manage-clinic.manage-clinic" /></div>
                    </div>
                    <div className="manage-clinic-content container">
                        <div className="row">
                            <div className=" col-6">
                                <lable className="manage-clinic-content__lable">
                                    <FormattedMessage id="manage-clinic.name" />
                                </lable>
                                <input 
                                    className="form-control"
                                    type="text"
                                    value={this.state.name}
                                    onChange={(e) => this.handleName(e, 'name')}
                                />
                            </div>
                            <div className="col-6">
                                <label className="manage-clinic-content__lable">
                                    <FormattedMessage id="manage-clinic.image" />
                                </label>
                                <div>
                                    <input 
                                        type="file" 
                                        id="input-img" 
                                        hidden
                                        onChange={(e) => this.handleChangeImage(e)}
                                    />
                                    <div className="manage-clinic-content__customize">
                                        <label htmlFor="input-img" className="manage-clinic-content__upload">
                                            <FormattedMessage id="manage-clinic.upload" />
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        
                                        <div className={this.state.ImageUrl ? 'manage-clinic-content__img' : ''}
                                            style={{ backgroundImage:  `url(${this.state.ImageUrl})`}}
                                            onClick={() => this.handleOpenImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                           </div>
                           <div className=" col-6">
                                <lable className="manage-clinic-content__lable">
                                    <FormattedMessage id="manage-clinic.address" />
                                </lable>
                                <input 
                                    className="form-control"
                                    type="text"
                                    value={this.state.address}
                                    onChange={(e) => this.handleName(e, 'address')}
                                />
                            </div>
                        </div>
                        <MdEditor 
                            style={{ height: '380px',marginBottom: '30px',marginTop: '20px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                        <div>
                            <button 
                                className="btn btn-primary"
                                onClick={() => this.handleCreateSpecialty()}
                            ><FormattedMessage id="manage-clinic.save" /></button>
                        </div>
                    </div>
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.ImageUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
