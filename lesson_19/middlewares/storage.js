import {ADD, REMOVE, SET, GET} from '../actions';

const LOCAL_KEY = 'students';

export default (store) => (next) => {
   
    return (payload) =>{
        next(payload);

        if(payload.type === ADD || payload.type === REMOVE) {
            const list = store.getState().students;
            localStorage.setItem(LOCAL_KEY, JSON.stringify(list));        
        }
        if(payload.type === GET) {
            try {
                const data = JSON.parse(localStorage.getItem(LOCAL_KEY));
                if(Array.isArray(data)){
                    next({type: SET, list: data});
                }
            }
            catch (err) {} 
        }
    }
}