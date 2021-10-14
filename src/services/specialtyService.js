import axios from '../axios';

const createSpecialtyService = (data) => {
    return axios.post('/api/create-specialty',data);
}

const getSpecialtyService = () => {
    return axios.get('/api/get-specialty');
}

const getDetailSpecialtyService = (data) => {
    return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`);
}

export { 
    createSpecialtyService,
    getSpecialtyService,
    getDetailSpecialtyService
}