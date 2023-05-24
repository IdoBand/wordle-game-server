export interface GameObject {
    gameId: string
    userId: string
    currentTile: number
    currentRowFirstTile: number
    totalAttempts: number
    completed: boolean
    win: boolean
    score: number
    wordToGuess: string
    tilesContent: string
    tilesClassNames: string
}