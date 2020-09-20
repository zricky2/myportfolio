import React from 'react'
import Data from '../stockComponents/Data'

export default function Stock({ match }) {
    return (
        <div>
            <h1>{match.params.symbol}</h1>
            <Data ticker={match.params.symbol} />
        </div>
    )
}
