import {createStore, combineReducers} from 'redux';
import ItemsReducer from './reducer'

const allReducers = combineReducers({
    items: ItemsReducer
})

const store = createStore(allReducers);

export default store;