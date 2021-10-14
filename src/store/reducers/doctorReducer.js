import actionTypes from '../actions/actionTypes';

const initialState = {
    doctors: [],
    allDoctors: [],
    allScheduleHours: [],
    allInfoDoctor: [],
}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        //get top doctors
        case actionTypes.FETCH_DOCTOR: 
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_SUCCESS:
            state.doctors = action.doctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_FAIL:
            state.doctors = []; 
            return {
                ...state,   
            }

        //get all doctors
        case actionTypes.FETCH_ALL_DOCTOR: 
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.doctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctors = []; 
            return {
                ...state,   
            }
        //get all schedule
        case actionTypes.FETCH_SCHEDULE_HOURS: 
            return {
                ...state,
            }
        case actionTypes.FETCH_SCHEDULE_HOURS_SUCCESS:
            state.allScheduleHours = action.dataTimes;
            return {
                ...state,
            }
        case actionTypes.FETCH_SCHEDULE_HOURS_FAIL:
            state.allScheduleHours = []; 
            return {
                ...state,   
            }
        //get all info doctor
        case actionTypes.FETCH_ALL_INFO_DOCTOR: 
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_INFO_DOCTOR_SUCCESS:
            state.allInfoDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_INFO_DOCTOR_FAIL:
            state.allInfoDoctor = []; 
            return {
                ...state,   
            }
        default:
            return state;
    }
}

export default doctorReducer;