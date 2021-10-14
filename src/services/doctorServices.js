import axios from '../axios';

const getDoctorServices = (limit) => {
    return axios.get(`/api/get-doctor?limit=${limit}`);
}

const getAllDoctorServices = () => {
    return axios.get('/api/get-all-doctor');
}

const createDetailDoctorServices = (data) => {
    return axios.post('/api/create-info-doctor',data);
}

const getDetailDoctorServices = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${id}`);
}

const createScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule',data);
}

const getScheduleDoctorServices = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInfoDoctorServices = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorServices = (doctorId) => {
    return axios.get(`/api/get-profile-doctor?doctorId=${doctorId}`);
}

const getBookingPatientServices = (data) => {
    return axios.get(`/api/get-list-patient-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const sendRemeryServices = (data) => {
    return axios.post('/api/send-remedy', data);
}


export { 
    getDoctorServices,
    getAllDoctorServices,
    createDetailDoctorServices,
    getDetailDoctorServices,
    createScheduleDoctor,
    getScheduleDoctorServices,
    getExtraInfoDoctorServices,
    getProfileDoctorServices,
    getBookingPatientServices,
    sendRemeryServices
};