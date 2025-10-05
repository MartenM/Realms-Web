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
    secondsToComplete: number,
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
    trophies: number[]
}

interface SpeedRecord {
    username: string;
    face:     number;
    time:     string;
    playerDifficulty: number | null;
}

interface SpeedRecordResponse {
    records: SpeedRecord[];
    ownRecord: SpeedRecord | null;
}

type RequestRealmResponse = {
    pixelWalkerRoomId: string;
    errorText:         null;
} | {
    pixelWalkerRoomId: null;
    errorText:         string;
}

interface RealmInformation {
    world: PublishedWorld;
    speedRecords: SpeedRecordResponse | null
}

interface ToastNotification {
    id: string,
    type: string,
    message: string,
    timeout: number
}

interface NumericalStats {
    labels:            string[];
    playersOnline:     number[];
    onlineRoomCount:   number[];
    onlineRealmsCount: number[];
    totalTrophies:     number[];
}

interface RealmSearchQuery {
    worldName: string;
    builderName: string;
    ratedOnly: boolean;
    featuredOnly: boolean;
    difficulties: number[]
}