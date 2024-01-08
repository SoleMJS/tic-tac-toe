// App.js
import React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Field } from './Field'
import { Information } from './Information'
import { WIN_PATTERNS } from './constant/win-patterns'
import store from './store'

const UPDATE_FIELD = 'UPDATE_FIELD'
const RESTART_GAME = 'RESTART_GAME'

const checkWinner = currentField => {
	const lines = WIN_PATTERNS

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (
			currentField[a] &&
			currentField[a] === currentField[b] &&
			currentField[a] === currentField[c]
		) {
			return true
		}
	}

	return false
}

const App = () => {
	const dispatch = useDispatch()
	const { currentPlayer, isGameEnded, isDraw, field } = useSelector(
		state => state
	)

	const handleCellClick = index => {
		if (!field[index] && !isGameEnded) {
			const updatedField = [...field]
			updatedField[index] = currentPlayer

			if (checkWinner(updatedField)) {
				dispatch({ type: UPDATE_FIELD, payload: { isGameEnded: true } })
			} else if (updatedField.every(cell => cell !== '')) {
				dispatch({
					type: UPDATE_FIELD,
					payload: { isGameEnded: true, isDraw: true },
				})
			} else {
				dispatch({
					type: UPDATE_FIELD,
					payload: {
						field: updatedField,
						currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
					},
				})
			}
		}
	}

	const handleRestartClick = () => {
		store.dispatch({ type: RESTART_GAME })
	}

	return (
		<div className='App'>
			<h1>Крестики-Нолики</h1>
			<Information
				currentPlayer={currentPlayer}
				isGameEnded={isGameEnded}
				isDraw={isDraw}
			/>
			<Field field={field} onCellClick={handleCellClick} />
			<button className='restart-button' onClick={handleRestartClick}>
				Начать заново
			</button>
		</div>
	)
}

export const AppWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
