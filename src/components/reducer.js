
import initialState from './items'



export default function ItemsReducer(state = initialState, action) {
    // console.log("State=", state);
    switch (action.type) {

        case 'CHANGE_ITEM':
            let newArrItems = [...action.items];
            return newArrItems

        default:
            return state
    }
}
