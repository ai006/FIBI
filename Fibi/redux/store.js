import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from './reducerCombiner';

//create the redux object and fill it with data from server
const store = createStore( rootReducer,applyMiddleware(thunk));

export default store;