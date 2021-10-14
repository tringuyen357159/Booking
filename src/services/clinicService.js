import axios from '../axios';

const createClinicService = (data) => {
    return axios.post('/api/create-clinic',data);
}

const getClinicService = () => {
    return axios.get('/api/get-clinic');
}

const getDetailClinicService = (data) => {
    return axios.get(`/api/get-detail-clinic?id=${data.id}`);
}

export { 
    createClinicService,
    getClinicService,
    getDetailClinicService
}