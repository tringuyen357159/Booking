import actionTypes from './actionTypes';
import { getSpecialtyService } from '../../services/specialtyService';
import { getClinicService } from '../../services/clinicService';

//get top doctor
export const fetchSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_SPECIALTY })
            let specialty = await getSpecialtyService();
            if(specialty && specialty.errCode === 0){
                dispatch(fetchSpecialtySuccess(specialty.data));
            }else{
                dispatch(fetchSpecialtyFail());
            }
        } catch (error) {
            dispatch(fetchSpecialtyFail());
        }
    }
}

export const fetchSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_SPECIALTY_SUCCESS,
    specialty: data
})

export const fetchSpecialtyFail = () => ({
    type: actionTypes.FETCH_SPECIALTY_FAIL
})

//get top clinic

export const fetchClinic = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CLINIC })
            let clinic = await getClinicService();
            if(clinic && clinic.errCode === 0){
                dispatch(fetchClinicSuccess(clinic.data));
            }else{
                dispatch(fetchClinicFail());
            }
        } catch (error) {
            dispatch(fetchClinicFail());
        }
    }
}

export const fetchClinicSuccess = (data) => ({
    type: actionTypes.FETCH_CLINIC_SUCCESS,
    clinic: data
})

export const fetchClinicFail = () => ({
    type: actionTypes.FETCH_CLINIC_FAIL
})