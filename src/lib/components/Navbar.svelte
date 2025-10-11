<script lang="ts">
    import { page } from '$app/stores';

    let navEntry = [
        {
            name: 'Rated',
            route: '/',
            icon: 'bx-trophy',
        },
        {
            name: 'Recent',
            route: '/recent',
            icon: 'bx-time',
        },
        {
            name: 'Highscores',
            route: '/highscores',
            icon: 'bx-list-ol',
        },
        {
            name: 'Search',
            route: '/search',
            icon: 'bx-search',
        },
        {
            name: 'Publish',
            route: '/publish',
            icon: 'bx-cloud-upload',
        },
        {
            name: 'Settings',
            route: '/settings',
            icon: 'bx-cog',
        },
        {
            name: 'About',
            route: '/about',
            icon: 'bx-info-circle',
        }
    ];
</script>


<nav>
    {#each navEntry as nav, index}
        <a href="{nav.route}">
            <div class="nav-entry {$page.url.pathname === nav.route ? 'selected' : ('nav-' + nav.name.toLowerCase()) } ">
                <i class="bx {nav.icon}"></i>
                <div>{nav.name}</div>
            </div>
        </a>
    {/each}
</nav>

<style>
    .nav-entry {
        font-family: Joystix, serif;

        background-color: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 0.6em 1em;
        
        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 1em;
        border: 1px solid #4d4d4d;
        margin-bottom: 10px;
    }

    .nav-entry.selected {
        border: 1px solid gold;
        background-color: #917a0096;
    }

    .nav-entry i {
        margin-right: 0.5em;
    }

    .nav-publish i {
        /*animation: borderAnimation 4s infinite;*/
        color: gold;
    }

    /*@keyframes borderAnimation {*/
    /*    0% { border-color: grey; }*/
    /*    50% { border-color: gold; }*/
    /*    100% { border-color: grey; }*/
    /*}*/
    
    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration:none;
    }
</style>