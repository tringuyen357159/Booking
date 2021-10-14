import actionTypes from '../actions/actionTypes';

const initialState = {
    allSpecialty: [],
    allClinic: []
}

const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {
        //get top specialty
        case actionTypes.FETCH_SPECIALTY: 
            return {
                ...state,
            }
        case actionTypes.FETCH_SPECIALTY_SUCCESS:
            state.allSpecialty = action.specialty;
            return {
                ...state,
            }
        case actionTypes.FETCH_SPECIALTY_FAIL:
            state.allSpecialty = []; 
            return {
                ...state,   
            }
        //get top clinic
        case actionTypes.FETCH_CLINIC: 
            return {
                ...state,
            }
        case actionTypes.FETCH_CLINIC_SUCCESS:
            state.allClinic = action.clinic;
            return {
                ...state,
            }
        case actionTypes.FETCH_CLINIC_FAIL:
            state.allClinic = []; 
            return {
                ...state,   
            }
        default:
            return state;
    }
}

export default specialtyReducer;