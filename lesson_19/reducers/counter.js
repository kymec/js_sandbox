import * as Constants from '../actions';
export default function reducer(state, payload) {
    switch (payload.type) {
        case Constants.ADD_COUNT:
            return {count: state.count + 1};   
        case Constants.COUNTER_DECREMENT:
                return {count: state.count - 1};      
    }

    if (state) {
        return state;
    }
    return {count: 0}
}