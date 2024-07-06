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

    // Define a mapping from ID to the corresponding smiley image
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
