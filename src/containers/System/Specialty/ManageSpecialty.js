import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import  CommonUtils  from '../../../utils/CommonUtils';
import { toast } from 'react-toastify';
import { createSpecialtyService } from '../../../services/specialtyService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSpeacialty: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,
            ImageUrl: '',
            image: '',
        }
    }

    componentDidMount() {
       
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleName = (e) => {
        this.setState({
            nameSpeacialty: e.target.value
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
        let res = await createSpecialtyService({
            nameSpeacialty: this.state.nameSpeacialty,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            image: this.state.image
        })
        if(res && res.errCode === 0){
            toast.success('Create Specialty success!')
            this.setState({
                nameSpeacialty: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                ImageUrl: '',
                image: '',
            })
        }else{
            toast.error('Create Specialty fail!')
        }
    }

    render() {
        return (
            <>
                <div className="manage-speacialty-container">
                    <div className="title text-center">
                        <div><FormattedMessage id="manage-specialty.manage-specialty" /></div>
                    </div>
                    <div className="manage-speacialty-content container">
                        <div className="row">
                            <div className=" col-6">
                                <lable className="manage-speacialty-content__lable">
                                    <FormattedMessage id="manage-specialty.name" />
                                </lable>
                                <input 
                                    className="form-control"
                                    type="text"
                                    value={this.state.nameSpeacialty}
                                    onChange={(e) => this.handleName(e)}
                                />
                            </div>
                            <div className="col-6">
                                <label className="manage-speacialty-content__lable">
                                    <FormattedMessage id="manage-specialty.image" />
                                </label>
                                <div>
                                    <input 
                                        type="file" 
                                        id="input-img" 
                                        hidden
                                        onChange={(e) => this.handleChangeImage(e)}
                                    />
                                    <div className="manage-speacialty-content__customize">
                                        <label htmlFor="input-img" className="manage-speacialty-content__upload">
                                            <FormattedMessage id="manage-specialty.upload" />
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        
                                        <div className={this.state.ImageUrl ? 'manage-speacialty-content__img' : ''}
                                            style={{ backgroundImage:  `url(${this.state.ImageUrl})`}}
                                            onClick={() => this.handleOpenImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
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
                            ><FormattedMessage id="manage-specialty.save" /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
