import axiosApi from "../../axiosConfig";
import {push} from 'connected-react-router';
import {INITIAL_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actionTypes";

export const initialUserSuccess = () => ({type: INITIAL_USER_SUCCESS});

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});


export const registerUser = user => async dispatch => {
  try {
    const res = await axiosApi.post('/users', user);
    dispatch(loginUserSuccess(res.data));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginUserFailure(e));
  }
};

export const loginUser = user => async dispatch => {
  try {
    const resp = await axiosApi.post('/users/sessions', user);
    dispatch(loginUserSuccess(resp.data));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginUserFailure(e))
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await axiosApi.delete('/users/sessions');
    dispatch(push('/login'));
    dispatch(logoutUserSuccess());
  } catch (e) {
    dispatch(push('/login'));
  }
};

export const facebookLogin = data => async dispatch => {
  try {
    const resp = await axiosApi.post('/users/facebook', data);
    dispatch(loginUserSuccess(resp.data));
    dispatch(push('/'))
  } catch (e) {
    console.log(e);
  }
};