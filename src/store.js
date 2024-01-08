import { createStore } from 'redux'

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const RESTART_GAME = 'RESTART_GAME'

const initialState = {
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	field: Array(9).fill(''),
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_FIELD:
			return {
				...state,
				...action.payload,
			}
		case RESTART_GAME:
			return initialState
		default:
			return state
	}
}

const store = createStore(reducer)

export default store
