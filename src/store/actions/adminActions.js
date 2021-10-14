import actionTypes from './actionTypes';
import { 
    getAllCodeServices,
    createNewUserServices,
    getAllUserServices,
    deleteUserServices,
    updateUserServices
    } 
from '../../services/userServices';
import { toast } from 'react-toastify';


//get gender
export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER })
            let gender = await getAllCodeServices('gender');
            if( gender && gender.errCode === 0){
                dispatch(fetchGenderSuccess(gender.data));
            }else{
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
        }
    }
}

export const fetchGenderSuccess = ( genderData ) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})


//get role
export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE })
            let role = await getAllCodeServices('role');
            if( role && role.errCode === 0 ){
                dispatch(fetchRoleSuccess(role.data));
            }else{
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
        }
    }
}

export const fetchRoleSuccess = ( roleData ) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


//get position
export const fetchPosition = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION })
            let position = await getAllCodeServices('position');
            if(position && position.errCode === 0){
                dispatch(fetchPositionSuccess(position.data));
            }else{
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
        }
    }
}

export const fetchPositionSuccess = ( positionData ) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData 
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

//create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER })
            let user = await createNewUserServices(data);
            if(user = user.errCode === 0){
                dispatch(createNewUserSuccess());
                toast.success("Create user succeed!");
                dispatch(fetchAllUser());
            }else{
                dispatch(createNewUserFail());
                toast.error("Create user fail!");
            }
        } catch (error) {
            dispatch(createNewUserFail());
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createNewUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

// get all user
export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USER })
            let user = await getAllUserServices('ALL');
            if(user && user.errCode === 0){
                dispatch(fetchAllUserSuccess(user.users));
            }else{
                dispatch(fetchAllUserFail());
            }
        } catch (error) {
            dispatch(fetchAllUserFail());
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

//delete user

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELTE_USER })
            let user = await deleteUserServices(userId);
            if(user && user.errCode === 0){
                dispatch(deleteUserSuccess());
                toast.success("Delete user succeed!");
                dispatch(fetchAllUser());
            }else{
                dispatch(deleteUserFail());
                toast.error("Delete user fail!");
            }
        } catch (error) {
            dispatch(deleteUserFail());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELTE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELTE_USER_FAIL
})

//edit user

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.EDIT_USER })
            let user = await updateUserServices(data);
            if(user && user.errCode === 0){
                dispatch(editUserSuccess());
                toast.success("Update user succeed!");
                dispatch(fetchAllUser());
            }else{
                dispatch(editUserFail());
                toast.error("Update user fail!");
            }
        } catch (error) {
            dispatch(editUserFail());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})