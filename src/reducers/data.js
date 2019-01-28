function data (state, action) {
	switch (action.type) {
		case 'ANIMATE_STEP':
			return {
				...state,
				aniStep: action.step
			}
		default:
			return state
	}
} 

export default data