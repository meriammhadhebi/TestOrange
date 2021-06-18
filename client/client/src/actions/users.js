import { FETCH_ALL,DELETE,FETCH_ONE,UPDATE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUser();

    dispatch({ type: FETCH_ONE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    await await api.deleteUser(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};