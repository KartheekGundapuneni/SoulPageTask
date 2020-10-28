import * as actionTypes from './action.store';

let initialState = {
    favRepositories : '',
    contributors : '',
}

export {getFavouriteRepository,setContributorsList} from './action.store.jsx';

 export default function repositoryReducer(state = initialState , action) {
    switch(action.type) {
        case actionTypes.REPOSITORY : return {...state,favRepositories : action.favRepo};
        case actionTypes.CONTRIBUTORS : return {...state, contributors : action.data};
        default : return state
    }
}

