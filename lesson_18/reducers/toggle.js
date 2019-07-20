import * as Constants from '../actions';
export default function reducer(state, payload) {    
    switch (payload.type) {
        case Constants.CHECK:
            return !state;        
    }
    if (state) {
        return state;
    }
    return false;
}