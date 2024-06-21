interface Profile {
    isSimple: boolean,
    hasSession: boolean
    username: string | null,
}

interface RealmDetails {

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
    completed: boolean,
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