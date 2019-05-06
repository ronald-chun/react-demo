import {combineReducers} from 'redux'

import getData from "./getData";
import getRedditData from "./getRedditData";

const rootReducer = combineReducers({
	getData,
	getRedditData,
})


export default rootReducer
