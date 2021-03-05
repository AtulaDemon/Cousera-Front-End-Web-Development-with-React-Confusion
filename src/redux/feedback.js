import * as ActionTypes from './ActionTypes';

export const Feedback = (state = null, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK: 
            return action.payload;

        default: 
            return state;
    }
}