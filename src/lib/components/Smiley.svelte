<script lang="ts">
    import smiley from '$lib/images/smileys/smiley.png';
    import grin from '$lib/images/smileys/grin.png';
    import tongue from '$lib/images/smileys/tongue.png';
    import happy from '$lib/images/smileys/happy.png';
    import annoyed from '$lib/images/smileys/annoyed.png';
    import sad from '$lib/images/smileys/sad.png';
    import surprised from '$lib/images/smileys/surprised.png';
    import indifferent from '$lib/images/smileys/indifferent.png';
    import crying from '$lib/images/smileys/cry.png';
    import wink from '$lib/images/smileys/wink.png';
    import frustrated from '$lib/images/smileys/frustrated.png';
    import shades from '$lib/images/smileys/shades.png';
    import devil from '$lib/images/smileys/devil.png';
    import inquisitive from '$lib/images/smileys/inquisitive.png';
    import ninja from '$lib/images/smileys/ninja.png';
    import santa from '$lib/images/smileys/santa.png';
    import worker from '$lib/images/smileys/worker.png';
    import robot from '$lib/images/smileys/robot.png';
    import extra_grin from '$lib/images/smileys/extra_grin.png';
    import angel from '$lib/images/smileys/angel.png';
    import bully from '$lib/images/smileys/bully.png';
    import commando from '$lib/images/smileys/commando.png';
    import diver from '$lib/images/smileys/diver.png';
    import fox from '$lib/images/smileys/fox.png';
    import ghost from '$lib/images/smileys/ghost.png';
    import hooded from '$lib/images/smileys/hooded.png';
    import kissing from '$lib/images/smileys/kissing.png';
    import native from '$lib/images/smileys/native.png';
    import nurse from '$lib/images/smileys/nurse.png';
    import penguin from '$lib/images/smileys/penguin.png';
    import propeller from '$lib/images/smileys/propeller.png';
    import vampire from '$lib/images/smileys/vampire.png';
    import winter from '$lib/images/smileys/winter.png';
    import wizard_blue from '$lib/images/smileys/wizard_blue.png';
    import wizard_red from '$lib/images/smileys/wizard_red.png';
    import XD from '$lib/images/smileys/XD.png';
    import XP from '$lib/images/smileys/XP.png';
    import witch from '$lib/images/smileys/witch.png';

    const smileyMap: { [key: number]: string } = {
        0: smiley,
        1: grin,
        2: tongue,
        3: happy,
        4: annoyed,
        5: sad,
        6: surprised,
        7: indifferent,
        8: crying,
        9: wink,
        10: frustrated,
        11: shades,
        12: devil,
        13: inquisitive,
        14: ninja,
        15: santa,
        16: worker,
        17: robot,
        18: extra_grin,
        19: angel,
        20: bully,
        21: commando,
        22: diver,
        23: fox,
        24: ghost,
        25: hooded,
        26: kissing,
        27: native,
        28: nurse,
        29: penguin,
        30: propeller,
        31: vampire,
        32: winter,
        33: wizard_blue,
        34: wizard_red,
        35: XD,
        36: XP,
        37: witch,
    };

    // Define a prop to receive the ID
    export let id: number;
</script>

<style>
    img {
        height: 48px;
        width: 48px;
        image-rendering: pixelated;
    }
</style>

<!-- Render the smiley image based on the ID -->
{#if smileyMap[id] !== undefined}
    <img src={smileyMap[id]} alt={`Smiley ${id}`}/>
{:else}
    <img src={smiley} alt="Missing smiley">
{/if}
