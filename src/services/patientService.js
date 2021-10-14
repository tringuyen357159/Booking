import axios from '../axios';

const createBookingScheduleService = (data) => {
    return axios.post('/api/create-patient-book',data);
}

const createVerifyEmailService = (data) => {
    return axios.post('/api/verify-patient-book',data);
}

export { 
    createBookingScheduleService,
    createVerifyEmailService
}
