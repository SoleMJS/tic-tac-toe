import React from 'react'
import './App.css'

export const Information = ({ currentPlayer, isGameEnded, isDraw }) => {
	let status

	if (isDraw) {
		status = 'Ничья'
	} else if (isGameEnded) {
		status = `Победа: ${currentPlayer === 'X' ? 'Крестиков' : 'Ноликов'}`
	} else {
		status = `Ходит: ${currentPlayer}`
	}

	return <div className='information'>{status}</div>
}
