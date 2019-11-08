import {ADD_NAME} from "../Action/ActionType";

const initialState = {
    data: [
        {
            title: 'test0',
        },
    ],
};

export const nameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NAME:
            return {
                ...state,
                data: state.data.concat(action.data),
            };
        default:
            return state;
    }
};
