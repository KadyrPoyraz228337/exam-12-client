import {GET_PICTURES_SUCCESS, GET_USER_PICTURES_SUCCESS} from "./actionTypes";
import axiosApi from "../../axiosConfig";
import {push} from 'connected-react-router'

export const getPicturesSuccess = pictures => ({type: GET_PICTURES_SUCCESS, pictures});
export const getUserPicturesSuccess = user => ({type: GET_USER_PICTURES_SUCCESS, user});

export const getPictures = () => async dispatch => {
  try {
    const resp = await axiosApi.get('pictures');

    dispatch(getPicturesSuccess(resp.data))
  } catch (e) {
  }
};

export const getUserPictures = id => async dispatch => {
  try {
    const resp = await axiosApi.get('/pictures/'+id);

    dispatch(getUserPicturesSuccess(resp.data))
  } catch (e) {
    console.log(e);
  }
};

export const removePicture = id => async dispatch => {
  try {
    await axiosApi.delete('/pictures/'+id);
  } catch (e) {
    console.log(e);
  }
};

export const addNewPicture = picture => async dispatch => {
  try {
    await axiosApi.post('/pictures', picture);

    dispatch(push('/'))
  } catch (e) {
    console.log(e);
  }
};