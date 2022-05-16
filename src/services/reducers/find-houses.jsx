import {
    POST_FIND_FAILED,
    POST_FIND_REQUEST,
    POST_FIND_SUCCESS,
    CLEAR_FIND_LIST,
    SET_START_DATE,
    SET_END_DATE,
    SET_FIND_EMPTY,
    CLEAR_DATES
} from "../actions/find-houses";

const initialState = {
    findRequest: false,
    findFailed: false,
    finded: [],
    startDate: new Date(),
    endDate: new Date(),
    findEmpty: false
}

export const findHousesReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_FIND_FAILED:
            return {
                ...state,
                findFailed: true,
                findRequest: false
            }
        case POST_FIND_REQUEST:
            return {
                ...state,
                findRequest: true
            }
        case POST_FIND_SUCCESS:
            return {
                ...state,
                finded: action.payload,
                findRequest: false,
                findFailed: false,
                findEmpty: false
            }
        case CLEAR_FIND_LIST:
            return {
                ...state,
                finded: [],
            }
        case SET_START_DATE:
            return {
                ...state,
                startDate: action.payload,
            }
        case SET_END_DATE:
            return {
                ...state,
                endDate: action.payload,
            }
        case CLEAR_DATES:
            return {
                ...state,
                startDate: '',
                endDate: '',
            }
        case SET_FIND_EMPTY:
            return {
                ...state,
                startDate: '',
                endDate: '',
            }
        default:
            return state;
    }
}