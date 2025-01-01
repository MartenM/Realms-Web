
import unknownIcon from "$lib/images/difficulties/unkown.png";
import easy from "$lib/images/difficulties/2.png";
import normal from "$lib/images/difficulties/3.png";
import hard from "$lib/images/difficulties/4.png";
import harder from "$lib/images/difficulties/5.png";
import extreme from "$lib/images/difficulties/6.png";
import demon from "$lib/images/difficulties/7.png";

export {
    unknownIcon,
    easy,
    normal,
    hard,
    harder,
    extreme,
    demon
}

export const difficultyMetas: DifficultyMeta[]  = [
    {
        icon: easy,
        name: "Easy",
        trophies: [1,2]
    },
    {
        icon: normal,
        name: "Normal",
        trophies: [3]
    },
    {
        icon: hard,
        name: "Hard",
        trophies: [4, 5]
    },
    {
        icon: harder,
        name: "Harder",
        trophies: [6,7]
    },
    {
        icon: extreme,
        name: "Extreme",
        trophies: [8,9]
    },
    {
        icon: demon,
        name: "Demon",
        trophies: [10]
    },
]