import React from 'react'
import { useStore } from 'effector-react'
import { $game } from '../feature'

export function CurrentPlayer() {
  const game = useStore($game)
  if (game.winner !== -1) {
    return <div className='title'>Player #{game.winner} win</div>
  }
  return <div className='title'>Current player #{game.player}</div>
}