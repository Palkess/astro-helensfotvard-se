<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        href?: string;
        size?: 'sm' | 'lg';
        children: Snippet;
        onClick?: () => void;
    }
    const { href, size = 'lg', children, onClick }: Props = $props();

    let cssClass = $derived.by(() => {
        const baseClass = 'bg-primary text-white hover:bg-blue-900 transition-colors shadow-sm';

        switch (size) {
            case 'sm':
                return baseClass + ' text-base px-5 py-2 rounded-lg ';
            default:
                return baseClass + ' text-lg px-10 py-4 rounded-xl ';
        }
    });
</script>

{#if href}
    <a {href} class={cssClass}>
        {@render children()}
    </a>
{:else}
    <button class={cssClass} onclick={onClick}>
        {@render children()}
    </button>
{/if}
