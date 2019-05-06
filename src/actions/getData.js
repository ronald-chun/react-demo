import fetch from 'cross-fetch'

export const GET_DATA_REQUEST = () => ({
	type: 'GET_DATA_REQUEST',
});

export const GET_DATA_SUCCESS = (data) => ({
	type: 'GET_DATA_SUCCESS',
	data: data
});

export const GET_DATA_FAILURE = (data) => ({
	type: 'GET_DATA_FAILURE',
	error: data.error
});

export const GET_REDDIT_DATA_REQUEST = () => ({
	type: 'GET_REDDIT_DATA_REQUEST',
});

export const GET_REDDIT_DATA_SUCCESS = (data) => ({
	type: 'GET_REDDIT_DATA_SUCCESS',
	data: data
});

export const GET_REDDIT_DATA_FAILURE = (data) => ({
	type: 'GET_REDDIT_DATA_FAILURE',
	error: data.error
});


export const getData = () => (dispatch) => {
	// Instead of plain objects, we are returning function.
	// Dispatching REQUEST action, which tells our app, that we are started requesting data.
	dispatch(GET_DATA_REQUEST());

	return fetch('https://datastudio-apis.hkstp.org/smartcampus/taximinibuscount/v1/')
	// Here, we are getting json body(in our case it will contain `data` or `error` prop, depending on request was failed or not) from server response
	// And providing `response` and `body` variables to the next chain.
		.then(response => response.json().then(body => ({response, body})))
		// .then(response => console.log(response.json().then(r => console.log(r))))
		.then(({response, body}) => {
			// console.table(response)
			// console.table(body)
			if (!response.ok) {
				// If request was failed, dispatching FAILURE action.
				dispatch(GET_DATA_FAILURE(body));
			} else {
				// When everything is ok, dispatching SUCCESS action.
				dispatch(GET_DATA_SUCCESS(body));
			}
		});
}

export const getRedditData = () => dispatch => {
	dispatch(GET_REDDIT_DATA_REQUEST())
	return fetch(`https://www.reddit.com/r/reactjs.json`)
	.then(response => response.json().then(body => ({response, body})))
		// .then(response => console.log(response))
		.then(({response, body}) => {
			if (!response.ok) {
				// If request was failed, dispatching FAILURE action.
				dispatch(GET_REDDIT_DATA_FAILURE(body))
			} else {
				// When everything is ok, dispatching SUCCESS action.
				dispatch(GET_REDDIT_DATA_SUCCESS(body))
			}
		})
}
