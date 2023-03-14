import * as types from './actionType';
import axios from 'axios';

const getUsers = (users) => ({
    type : types.GET_USERS,
    payload : users,
});

// const userDeleted = (users) => ({
//     type : types.DELETE_USER,
//     payload : users,
// });

// const userAdded = () => ({
//     type : types.Add_USER,
// });

const userUpdated = () => ({
    type : types.UPDATE_USER,
});

const getUser = (user) => ({
    type : types.GET_SINGLE_USER,
    payload : user,
});

export const loadUsers = () => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}`)
            .then((resp) => {
                console.log("Reasp", resp)
                dispatch(getUsers(resp.data));
            })
            .catch((err) => console.log(err))
    };
};

export const deleteUser = (id) => {
    return function (dispatch) {
        axios
            .delete(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("Reasp", resp)
                // dispatch(userDeleted());
                dispatch(loadUsers())
            })
            .catch((err) => console.log(err))
    };
};

export const addUser = (user) => {
    return function (dispatch) {
        axios
            .post(`${process.env.REACT_APP_API}`, user)
            .then((resp) => {
                console.log("Reasp", resp)
                // dispatch(userAdded());
                dispatch(loadUsers())
            })
            .catch((err) => console.log(err))
    };
};

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("Reasp", resp)
                dispatch(getUser(resp.data));
            })
            .catch((err) => console.log(err))
    };
};

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios
            .put(`${process.env.REACT_APP_API}/${id}`, user)
            .then((resp) => {
                console.log("Reasp", resp)
                dispatch(userUpdated());
            })
            .catch((err) => console.log(err))
    };
};