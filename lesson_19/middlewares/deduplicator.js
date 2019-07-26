import {ADD} from '../actions';

const LOCAL_KEY = 'students';

export default (store) => (next) => {
   
    return (payload) =>{
        
        let equal = false;
        if(payload.type === ADD) {
            const list = store.getState().students;
            list.map((value) => {
                if(payload.name === value.name) {
                    equal = true;
                }                
            })         
        }
        if (!equal) {
            next(payload);
        } 
    }
}