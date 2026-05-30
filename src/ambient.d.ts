import type {FullWorldResponse} from "$lib/api/ApiClient";

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
    ranked: boolean,
    ownerUsername: string
    completions: number,
    completed: boolean,
    plays: number,
    secondsToComplete: number,
}

interface HighscoreConfiguration {
    apiUrl: string,
    type: string
}

interface PlayerProfile {
    id:            string;
    username:      string;
    smiley:        string;
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
    smiley:     string;
    durationAsString:     string;
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
    world: FullWorldResponse;
    speedRecords: SpeedRecordResponse | null,
    playerComments: RealmPlayerComment[] | null,
}

interface RealmPlayerComment {
    playerId: string;
    playerName: string;
    smiley: string;
    suggestedRating?: number | null; // corresponds to integer($int32)
    liked?: boolean | null;
    completed: boolean;
    completedDeathless: boolean;
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
    rankedOnly: boolean;
    difficulties: number[]
}