interface Profile {
    isSimple: boolean,
    hasSession: boolean
    username: string | null,
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
}

interface HighscoreConfiguration {
    apiUrl: string,
    type: string
}

interface PlayerProfile {
    id:            string;
    username:      string;
    playerGroup:   number;
    trophies:      number;
    builderPoints: number;
    verified:      boolean;
    totalPlays:    number;
    completedWorlds: number;
}

interface DifficultyMeta {
    icon: Image,
    name: string,
}

interface SpeedRecord {
    username: string;
    face:     number;
    time:     string;
}

interface SpeedRecordResponse {
    records: SpeedRecord[];
    ownRecord: SpeedRecord | null;
}
