import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorServices } from '../../../services/doctorServices';
import { CRUD_ACTION } from '../../../utils/constant';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save table mark down
            contentHtml: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            arrDoctors: [],
            isChange: false,
            action : '',
            //save table doctor_infor
            arrPrice: [],
            arrProvince: [],
            arrPayment: [],
            arrClinic: [],
            arrSpecialty: [],
            selectedClinic: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedSpecialty: '',
            nameClinic: '',
            nameAddressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getDoctorAllInfo()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.doctors !== this.props.doctors){
            let dataSelect = this.handleInputSelect(this.props.doctors, 'USERS');
            this.setState({
                arrDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language) {
            let { price, province, payment } = this.props.allInfoDoctor;
            let dataSelect = this.handleInputSelect(this.props.doctors, 'USERS');
            let dataSelectPrice = this.handleInputSelect(price, 'PRICE');
            let dataSelectPayment = this.handleInputSelect(payment, 'PAYMENT');
            let dataSelectProvince = this.handleInputSelect(province, 'PROVINCE');
            this.setState({
                arrDoctors: dataSelect,
                arrPrice: dataSelectPrice,
                arrProvince: dataSelectProvince,
                arrPayment: dataSelectPayment,
            })
        }
        if(prevProps.allInfoDoctor !== this.props.allInfoDoctor) {
            let { price, province, payment, specialty, clinic } = this.props.allInfoDoctor
            let dataSelectPrice = this.handleInputSelect(price, 'PRICE');
            let dataSelectProvince = this.handleInputSelect(province, 'PROVINCE');
            let dataSelectPayment = this.handleInputSelect(payment, 'PAYMENT');
            let dataSelectSpecialty = this.handleInputSelect(specialty, 'SPECIALTY')
            let dataSelectClinic = this.handleInputSelect(clinic, 'CLINIC')
            this.setState({
                arrPrice: dataSelectPrice,
                arrProvince: dataSelectProvince,
                arrPayment: dataSelectPayment,
                arrSpecialty: dataSelectSpecialty,
                arrClinic: dataSelectClinic
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html
        })
    }

    handleCreateMarkdown = () => { 
        this.props.createDetailDoctor({
            contentHTML: this.state.contentHtml,
            contentMarkDown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.isChange === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            nameAddressClinic: this.state.nameAddressClinic,
            note: this.state.note,
            selectedClinic: this.state.selectedClinic.value,
            selectedSpecialty:this.state.selectedSpecialty.value
        })
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ 
            selectedDoctor
        });
        let { arrPrice, arrProvince, arrPayment, arrSpecialty, arrClinic } = this.state;
        let data = await getDetailDoctorServices(selectedDoctor.value);
        if(data && data.errCode === 0 && data.data && data.data.Markdown) {
            let markdown = data.data.Markdown;
            let addressClinic = '',nameClinic = '',note = '',paymentId = '',priceId = '',provinceId = '',specialtyId = '', clinicId = '';
            let selectedPayment = '',selectedPrice = '',selectedProvince = '', selectedSpecialty = '', selectedClinic = '';
            if(data.data.Doctor_Infor) {
                addressClinic = data.data.Doctor_Infor.addressClinic;
                nameClinic = data.data.Doctor_Infor.nameClinic;
                note = data.data.Doctor_Infor.note;

                paymentId = data.data.Doctor_Infor.paymentId;
                priceId = data.data.Doctor_Infor.priceId;
                provinceId = data.data.Doctor_Infor.provinceId;
                specialtyId =  data.data.Doctor_Infor.specialtyId;
                clinicId = data.data.Doctor_Infor.clinicId;
           
                selectedPayment = arrPayment.find(item => {
                    return item && item.value === paymentId;
                })
                selectedPrice = arrPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectedProvince = arrProvince.find(item => {
                    return item && item.value === provinceId;
                })
                selectedSpecialty = arrSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = arrClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHtml: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkDown,
                description: markdown.description,
                isChange: true,
                nameClinic: nameClinic,
                nameAddressClinic: addressClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }else{
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                isChange: false,
                nameClinic: '',
                nameAddressClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    }

    handleChangeText = (e , id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if(inputData && inputData.length > 0){
            if( type === 'USERS'){
                inputData.map((item, index) => {
                    let object = {};
                    let lablevi =  `${item.lastName} ${item.firstName}`;
                    let lableen =  `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? lablevi : lableen;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type === 'PRICE' ) {
                inputData.map((item, index) => {
                    let object = {};
                    let lablevi = `${item.valueVi} VNĐ`;
                    let lableen = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? lablevi : lableen;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'PROVINCE'|| type === 'PAYMENT'){
                inputData.map((item, index) => {
                    let object = {};
                    let lablevi = item.valueVi;
                    let lableen = item.valueEn;
                    object.label = language === LANGUAGES.VI ? lablevi : lableen;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if(type === 'SPECIALTY'){
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
                })
            }
            if(type === 'CLINIC'){
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
                })
            }
        }

        return result;
    }

    handleChangeSelectDoctorInfo = (selected, name) => {
        let stateName = name.name;
        let copyState = {...this.state};
        copyState[stateName] = selected;
        this.setState({
            ...copyState
        })
    }

    render() {
        return (
            <div className="manage-doctor-container container">
                <div className="title text-center">
                    <div><FormattedMessage id="manage-doctor.manage-detail" /></div>
                </div>
                <div className="manage-doctor__desc">
                    <div className="manage-doctor__desc--right form-group col-6">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-select" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.arrDoctors}
                            placeholder="Chọn bác sĩ"
                        />
                    </div>
                    <div className="manage-doctor__desc--left form-group col-6">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-intro" />
                        </label>
                        <textarea 
                            className="form-control manage-doctor__desc-text" 
                            onChange={(e) => this.handleChangeText(e , 'description')}
                            value={this.state.description}
                            rows="3"
                        >
                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor__desc-extra row">
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.arrPrice}
                            placeholder={<FormattedMessage id="manage-doctor.manage-price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.arrProvince}
                            placeholder={<FormattedMessage id="manage-doctor.manage-province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.arrPayment}
                            placeholder={<FormattedMessage id="manage-doctor.manage-payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-name-clinic" />
                        </label>
                        <input 
                            className="form-control"
                            onChange={(e) => this.handleChangeText(e , 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-addres-clinic" />
                        </label>
                        <input 
                            className="form-control"
                            onChange={(e) => this.handleChangeText(e , 'nameAddressClinic')}
                            value={this.state.nameAddressClinic}
                        />
                    </div>
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-desc" />
                        </label>
                        <input 
                            className="form-control"
                            onChange={(e) => this.handleChangeText(e , 'note')}
                            value={this.state.note}
                        />
                    </div>


                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.arrSpecialty}
                            placeholder={<FormattedMessage id="manage-doctor.manage-specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label className="manage-doctor__desc-title">
                            <FormattedMessage id="manage-doctor.manage-clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.arrClinic}
                            placeholder={<FormattedMessage id="manage-doctor.manage-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-content">
                    <MdEditor 
                        style={{ height: '380px',marginBottom: '30px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button 
                    className={this.state.isChange === false ? 'btn btn-primary' : 'btn btn-warning'}
                    onClick={() => this.handleCreateMarkdown()}
                >
                    {this.state.isChange === false ? 
                        <FormattedMessage id="manage-doctor.save" /> 
                        : 
                        <FormattedMessage id="manage-doctor.edit" />
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors : state.doctor.allDoctors,
        allInfoDoctor: state.doctor.allInfoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()), 
        createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
        getDoctorAllInfo: () => dispatch(actions.fetchDoctorAllInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
