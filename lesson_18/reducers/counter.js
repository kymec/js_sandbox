import * as Constants from '../actions';
export default function reducer(state, payload) {
    if (state) {
        if (payload.type === Constants.ADD_COUNT){
            return {count: state.count + 1};
        }
            
        return state;
    }


    return {count: 0}
}