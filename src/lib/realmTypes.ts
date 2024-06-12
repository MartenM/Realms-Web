export interface PublishedWorld {
    id: string
    shortHash: string
    title: string
    requestedDifficulty: number | null
    ratedDifficulty: number
    featuredLevel: number
    ownerUsername: string
    completions: number,
    plays: number,
}

export interface HighscorePlayer {
    username: string
    trophies: number
    verified: boolean
}
