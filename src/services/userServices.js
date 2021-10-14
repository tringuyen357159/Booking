import axios from '../axios';

const handleLoginServices = (email, password) => {
    return axios.post('/api/login' ,{ email, password });
}

const getAllUserServices = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
}

const createNewUserServices = (data) => {
    return axios.post('/api/create-new-users',data)
}

const deleteUserServices = (userId) => {
    return axios.delete('/api/delete-users',{data:{id: userId}})
}

const updateUserServices = (data) => {
    return axios.put('/api/edit-users',data)
}

const getAllCodeServices = (typeInput) => {
    return axios.get(`/api/allcode?type=${typeInput}`)
}

export { 
    handleLoginServices,
    getAllUserServices,
    createNewUserServices,
    deleteUserServices,
    updateUserServices,
    getAllCodeServices,
 };