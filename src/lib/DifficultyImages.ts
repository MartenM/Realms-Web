
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
    },
    {
        icon: normal,
        name: "Normal",
    },
    {
        icon: hard,
        name: "Hard",
    },
    {
        icon: harder,
        name: "Harder",
    },
    {
        icon: extreme,
        name: "Extreme",
    },
    {
        icon: demon,
        name: "Demon",
    },
]