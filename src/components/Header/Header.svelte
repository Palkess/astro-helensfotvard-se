<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<header>
    {@render children()}
</header>

<style>
    header {
        background-color: #333;
        color: white;
        padding: 1rem;
        text-align: center;
    }
</style>
