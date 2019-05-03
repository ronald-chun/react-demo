import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from "react-redux";
import thunk from 'redux-thunk'

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

import rootReducer from './reducers'

const middleware = [ thunk ]
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
)

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
