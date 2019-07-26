import * as Constants from '../actions';

export default function reducer(state, payload) {

    switch (payload.type) {
        case Constants.REMOVE:
            return state.filter(std => std.name !== payload.name);
        case Constants.ADD:
            return state.concat({name: payload.name});
        case Constants.SET:
            return payload.list;
    }
    
    if (state) {
        return state;
    }
    
    return [
        {name: 'John'},
        {name: 'Lina'},
        {name: 'Svetlana'},
        {name: 'SpaceInvaders'},
    ];
}