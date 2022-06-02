import { sendData } from "../../helpers/helpers";
import { mainUrl } from "../../helpers/variables";

export const POST_FIND_REQUEST = 'POST_FIND_REQUEST';
export const POST_FIND_SUCCESS = 'POST_FIND_SUCCESS';
export const POST_FIND_FAILED = 'POST_FIND_FAILED';
export const POST_FIND_LOADED = 'POST_FIND_LOADED';
export const CLEAR_FIND_LIST = 'CLEAR_FIND_LIST';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const CLEAR_DATES = 'CLEAR_DATES';
export const SET_FIND_EMPTY = 'SET_FIND_EMPTY';
export const CLEAR_FINDED_STATUS = 'CLEAR_FINDED_STATUS';

export const postFindHouses = (dates) => {
    return function (dispatch) {
        dispatch({
            type: POST_FIND_REQUEST
        })
        sendData({
            url: `${mainUrl}/bookedhouse.php`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dates
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Something wrong: ${res.status}`)
            })
            .then(res => {
                if (res || res.length !== 0) {
                    dispatch({
                        type: POST_FIND_SUCCESS,
                        payload: res
                    })
                    dispatch({
                        type: POST_FIND_LOADED,
                        payload: true
                    })
                } else if (res.length === 0) {
                    dispatch({
                        type: SET_FIND_EMPTY
                    })
                } else {
                    dispatch({
                        type: POST_FIND_FAILED
                    })
                }
            }
            )
            .catch(err => {
                console.log(err)
                dispatch({
                    type: POST_FIND_FAILED
                })
                dispatch({
                    type: CLEAR_FIND_LIST
                })
            })
    }
}