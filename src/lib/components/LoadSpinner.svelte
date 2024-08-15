<script>
    export let size = '4em'; // Default size
    export let color = 'orange'; // Default color
</script>

<div class="load-spinner" style={`width: ${size}; height: ${size};`}>
    <div class="lds-dual-ring" style={`width: ${size}; height: ${size};`}>
        <div class="lds-dual-ring-inner" style={`width: calc(${size} - 1em); height: calc(${size} - 1em); border-color: ${color} transparent ${color} transparent;`} />
    </div>
</div>

<style>
    .load-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lds-dual-ring {
        position: relative;
        border-radius: 50%;
        border: 0.2em solid transparent; /* Transparent border for animation */
    }

    .lds-dual-ring-inner {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        border: 0.2em solid;
        border-color: var(--default-color) transparent var(--default-color) transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
