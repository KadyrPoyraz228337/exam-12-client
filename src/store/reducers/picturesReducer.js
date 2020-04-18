import {GET_PICTURES_SUCCESS, GET_USER_PICTURES_SUCCESS} from "../actions/actionTypes";

const INITIAL_STATE = {
  pictures: null,
  user: null,
  error: null
};

const picturesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PICTURES_SUCCESS:
      return {...state, pictures: action.pictures};
    case GET_USER_PICTURES_SUCCESS:
      return {...state, user: action.user};
    default: return state
  }
};

export default picturesReducer;