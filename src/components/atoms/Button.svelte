<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        href?: string;
        size?: 'sm' | 'lg';
        variant?: 'solid' | 'outline' | 'white';
        children: Snippet;
        onClick?: () => void;
    }
    const { href, size = 'lg', variant = 'solid', children, onClick }: Props = $props();

    let cssClass = $derived.by(() => {
        const variantClass =
            variant === 'outline'
                ? 'border border-primary text-primary hover:bg-primary hover:text-white'
                : variant === 'white'
                  ? 'border border-white text-white hover:bg-white hover:text-primary'
                  : 'bg-primary text-white hover:bg-primary-dark shadow-sm';

        const baseClass =
            variantClass +
            ' inline-flex items-center gap-2 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

        switch (size) {
            case 'sm':
                return baseClass + ' text-base px-5 py-2 rounded-full';
            default:
                return baseClass + ' text-lg px-10 py-4 rounded-full';
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
