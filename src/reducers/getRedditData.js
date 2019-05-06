const INITIAL_STATE = {
	data: {},
	isFetching: false,
	error: undefined,
	lastRefrech: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "GET_REDDIT_DATA_REQUEST":
			return {
				...state,
				isFetching: true
			};
		case "GET_REDDIT_DATA_SUCCESS":
			return {
				...state,
				isFetching: false,
				data: action.data,
				lastRefrech: new Date(),
			};
		case "GET_REDDIT_DATA_FAILURE":
			return {
				...state,
				isFetching: false,
				error: action.error,
				lastRefrech: new Date(),
			};
		default:
			return state;
	}
};
