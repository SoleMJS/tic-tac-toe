// App.js
import React, { useState } from 'react'
import './App.css'
import { Field } from './Field'
import { Information } from './Information'
import { WIN_PATTERNS } from './constant/win-patterns'

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X')
	const [isGameEnded, setIsGameEnded] = useState(false)
	const [isDraw, setIsDraw] = useState(false)
	const [field, setField] = useState(Array(9).fill(''))

	const handleCellClick = index => {
		if (!field[index] && !isGameEnded) {
			const updatedField = [...field]
			updatedField[index] = currentPlayer
			setField(updatedField)

			if (checkWinner(updatedField)) {
				setIsGameEnded(true)
			} else if (updatedField.every(cell => cell !== '')) {
				setIsGameEnded(true)
				setIsDraw(true)
			} else {
				setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
			}
		}
	}

	const handleRestartClick = () => {
		setCurrentPlayer('X')
		setIsGameEnded(false)
		setIsDraw(false)
		setField(Array(9).fill(''))
	}

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
