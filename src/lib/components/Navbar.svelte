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
            <div class="nav-entry {$page.url.pathname === nav.route ? 'selected' : '' }">
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
        padding: 1em;
        
        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 1em;
        border: 2px solid grey;
        margin-bottom: 10px;
    }

    .nav-entry.selected {
        border: 2px solid gold;
    }

    .nav-entry i {
        margin-right: 0.5em;
    }
    
    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration:none;
    }
</style>