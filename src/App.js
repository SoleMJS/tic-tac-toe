import React, { useEffect, useState } from 'react'
import './App.css'
import { Field } from './Field'
import { Information } from './Information'
import { WIN_PATTERNS } from './constant/win-patterns'
import store from './store'

const UPDATE_FIELD = 'UPDATE_FIELD'
const RESTART_GAME = 'RESTART_GAME'

const checkWinner = (currentField, currentPlayer) => {
	const lines = WIN_PATTERNS

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (
			currentField[a] === currentPlayer &&
			currentField[b] === currentPlayer &&
			currentField[c] === currentPlayer
		) {
			return true
		}
	}

	return false
}

export const App = () => {
	const [, forceUpdate] = useState()

	useEffect(() => {
		const handleStateChange = () => {
			forceUpdate({})
		}

		const unsubscribe = store.subscribe(handleStateChange)

		return () => {
			unsubscribe()
		}
	}, [])

	const handleCellClick = index => {
		const state = store.getState()

		if (!state.isGameEnded && !state.field[index]) {
			const updatedField = [...state.field]
			updatedField[index] = state.currentPlayer

			let gameEnded = false
			let isDraw = false

			console.log(`Updated Field: ${updatedField}`)

			if (checkWinner(updatedField, state.currentPlayer)) {
				gameEnded = true
			} else if (updatedField.every(cell => cell !== '')) {
				gameEnded = true
				isDraw = true
			}

			console.log(
				`Game Ended: ${gameEnded}, Is Draw: ${isDraw}, Current Player: ${state.currentPlayer}`
			)

			store.dispatch({
				type: UPDATE_FIELD,
				payload: {
					field: updatedField,
					currentPlayer: gameEnded
						? state.currentPlayer
						: state.currentPlayer === 'X'
						? 'O'
						: 'X',
					isGameEnded: gameEnded,
					isDraw: isDraw,
				},
			})
		}
	}

	const handleRestartClick = () => {
		store.dispatch({ type: RESTART_GAME })
	}

	return (
		<div className='App'>
			<h1>Крестики-Нолики</h1>
			<Information
				currentPlayer={store.getState().currentPlayer}
				isGameEnded={store.getState().isGameEnded}
				isDraw={store.getState().isDraw}
			/>
			<Field field={store.getState().field} onCellClick={handleCellClick} />
			<button className='restart-button' onClick={handleRestartClick}>
				Начать заново
			</button>
		</div>
	)
}
