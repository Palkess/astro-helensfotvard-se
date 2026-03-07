<script lang="ts">
    import Button from '../atoms/Button.svelte';

    let menuOpen = $state(false);

    function toggleMenu() {
        menuOpen = !menuOpen;
    }

    function closeMenu() {
        menuOpen = false;
    }
</script>

<header class="sticky top-0 z-50 border-b border-stone-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="/" class="text-2xl font-semibold tracking-wide text-stone-800">Helens Fotvård</a>

        <nav class="hidden gap-10 text-lg text-stone-600 md:flex">
            <a href="#tjanster" class="transition-colors hover:text-green-700">Tjänster</a>
            <a href="#om-oss" class="transition-colors hover:text-green-700">Om oss</a>
            <a href="#kontakt" class="transition-colors hover:text-green-700">Kontakt</a>
            <Button href="#kontakt" size="sm">Boka tid</Button>
        </nav>

        <button
            class="rounded-md p-2 text-stone-700 transition-colors hover:bg-stone-100 md:hidden"
            onclick={toggleMenu}
            aria-label="Öppna meny"
            aria-expanded={menuOpen}>
            {#if menuOpen}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            {/if}
        </button>
    </div>

    {#if menuOpen}
        <nav
            class="flex flex-col gap-5 border-t border-stone-200 bg-white px-6 py-6 text-xl text-stone-700 md:hidden">
            <a href="#tjanster" onclick={closeMenu} class="transition-colors hover:text-green-700">
                Tjänster
            </a>
            <a href="#om-oss" onclick={closeMenu} class="transition-colors hover:text-green-700">
                Om oss
            </a>
            <a href="#kontakt" onclick={closeMenu} class="transition-colors hover:text-green-700">
                Kontakt
            </a>
            <a
                href="#kontakt"
                onclick={closeMenu}
                class="rounded-lg bg-green-700 px-5 py-3 text-center font-medium text-white transition-colors hover:bg-green-800">
                Boka tid
            </a>
        </nav>
    {/if}
</header>
