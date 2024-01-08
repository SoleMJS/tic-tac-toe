import React, { Component } from 'react'
import './App.css'

export class Information extends Component {
	render() {
		const { currentPlayer, isGameEnded, isDraw } = this.props
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
}
