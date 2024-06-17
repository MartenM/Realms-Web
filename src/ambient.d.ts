interface Profile {
    isSet: boolean
    pwId: string
    name: string
}

interface PublishedWorld {
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

interface HighscorePlayer {
    username: string
    amount: number
    verified: boolean
}

interface HighscoreConfiguration {
    apiUrl: string,
    type: string
}