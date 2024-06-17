<script>
    import { page } from '$app/stores';
</script>

<div class="col-md-10">
    <div class="error-box">
        <h1>{$page.status}: {$page?.error?.message}</h1>
        <p>Whoops, you manged to get yourself an error!</p>
    </div>
</div>

<style>
    .error-box {
        text-align: center;
        color: white;
        margin: 1em;
        padding: 1em;

        background-color: rgba(0, 0, 0, 0.75);
    }

    h1 {
        color: white;
        text-align: center;
        color: orange;
    }
</style>