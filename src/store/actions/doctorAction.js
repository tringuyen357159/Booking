import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { getDoctorServices,
    getAllDoctorServices,
    createDetailDoctorServices } from '../../services/doctorServices';
import { 
    getAllCodeServices,
    } 
from '../../services/userServices';
import { getSpecialtyService } from '../../services/specialtyService';
import { getClinicService } from '../../services/clinicService';


//get top doctor
export const fetchDoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_DOCTOR })
            let user = await getDoctorServices('8');
            if(user && user.errCode === 0){
                dispatch(fetchDoctorSuccess(user.data));
            }else{
                dispatch(fetchDoctorFail());
            }
        } catch (error) {
            dispatch(fetchDoctorFail());
        }
    }
}

export const fetchDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_SUCCESS,
    doctor: data
})

export const fetchDoctorFail = () => ({
    type: actionTypes.FETCH_DOCTOR_FAIL
})

//get all doctor

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR })
            let doctors = await getAllDoctorServices();
            if(doctors && doctors.errCode === 0){
                dispatch(fetchAllDoctorSuccess(doctors.data));
            }else{
                dispatch(fetchAllDoctorFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorFail());
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    doctors: data
})

export const fetchAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL
})

// create detail doctor

export const createDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_DETAIL_DOCTOR })
            let res  = await createDetailDoctorServices(data);
            if(res && res.errCode === 0){
                dispatch(createDetailDoctorSuccess());
                toast.success("Create detail doctor succeed!");
            }else{
                dispatch(createDetailDoctorFail());
                toast.error("Create detail doctor fail!");
            }
        } catch (error) {
            dispatch(createDetailDoctorFail());
        }
    }
}

export const createDetailDoctorSuccess = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS,
})

export const createDetailDoctorFail = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_FAIL
})

//get all schedule hours

export const fetchAllScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_SCHEDULE_HOURS })
            let schedule = await getAllCodeServices('TIME');
            if(schedule && schedule.errCode === 0){
                dispatch(fetchAllScheduleHoursSuccess(schedule.data));
            }else{
                dispatch(fetchAllScheduleHoursFail());
            }
        } catch (error) {
            dispatch(fetchAllScheduleHoursFail());
        }
    }
}

export const fetchAllScheduleHoursSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_HOURS_SUCCESS,
    dataTimes: data
})

export const fetchAllScheduleHoursFail = () => ({
    type: actionTypes.FETCH_SCHEDULE_HOURS_FAIL
})

//get all info doctor
export const fetchDoctorAllInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_INFO_DOCTOR })
            let price = await getAllCodeServices('PRICE');
            let province = await getAllCodeServices('PROVINCE');
            let payment = await getAllCodeServices('PAYMENT');
            let specialty = await getSpecialtyService();
            let clinic = await getClinicService();
            if( price && price.errCode === 0 && province && province.errCode === 0 && 
                payment && payment.errCode === 0 && specialty && specialty.errCode === 0 &&
                clinic && clinic.errCode ===0 ){
                let data = {
                    price: price.data,
                    province: province.data,
                    payment: payment.data,
                    specialty: specialty.data,
                    clinic: clinic.data
                }
                dispatch(fetchDoctorAllInfoSuccess(data));
            }else{
                dispatch(fetchDoctorAllInfoFail());
            }
        } catch (error) {
            dispatch(fetchDoctorAllInfoFail());
        }
    }
}

export const fetchDoctorAllInfoSuccess = ( allData ) => ({
    type: actionTypes.FETCH_ALL_INFO_DOCTOR_SUCCESS,
    data: allData
})

export const fetchDoctorAllInfoFail = () => ({
    type: actionTypes.FETCH_ALL_INFO_DOCTOR_FAIL
})