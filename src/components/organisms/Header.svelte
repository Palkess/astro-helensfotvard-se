<script lang="ts">
    import { services } from '../../data/services';
    import Button from '../atoms/Button.svelte';

    let menuOpen = $state(false);
    let servicesOpen = $state(false);
    let mobileServicesOpen = $state(false);
    let navWrapper: HTMLElement;
    let currentPath = $state('');

    $effect(() => {
        currentPath = window.location.pathname;
    });

    function isActive(href: string) {
        return currentPath === href;
    }

    function isServiceActive() {
        return currentPath.startsWith('/tjanster/');
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
        if (!menuOpen) {
            mobileServicesOpen = false;
        }
    }

    function closeMenu() {
        menuOpen = false;
        mobileServicesOpen = false;
    }

    function toggleServices() {
        servicesOpen = !servicesOpen;
    }

    function closeServices() {
        servicesOpen = false;
    }

    function handleWindowPointerDown(e: PointerEvent) {
        if (navWrapper && !navWrapper.contains(e.target as Node)) {
            servicesOpen = false;
        }
    }

    function handleWindowKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            servicesOpen = false;
            menuOpen = false;
            mobileServicesOpen = false;
        }
    }
</script>

<svelte:window onpointerdown={handleWindowPointerDown} onkeydown={handleWindowKeydown} />

<header class="sticky top-0 z-50 border-b border-stone-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <a href="/" class="text-2xl font-semibold tracking-wide text-stone-800">Helens Fotvård</a>

        <nav
            class="hidden items-center gap-10 text-lg text-stone-600 md:flex"
            bind:this={navWrapper}>
            <!-- Tjänster dropdown trigger -->
            <div class="relative">
                <button
                    onclick={toggleServices}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    class="flex items-center gap-1 transition-colors hover:text-green-700 {isServiceActive()
                        ? 'font-semibold text-green-700'
                        : ''}">
                    Tjänster
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 transition-transform {servicesOpen ? 'rotate-180' : ''}"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {#if servicesOpen}
                    <ul
                        class="absolute top-full left-0 mt-2 w-52 rounded-lg border border-stone-100 bg-white shadow-md"
                        role="list">
                        {#each services as service}
                            <li>
                                <a
                                    href={'/tjanster/' + service.slug}
                                    onclick={closeServices}
                                    class="block px-4 py-3 text-base text-stone-700 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-stone-50 hover:text-green-700 {currentPath ===
                                    '/tjanster/' + service.slug
                                        ? 'bg-stone-50 font-semibold text-green-700'
                                        : ''}">
                                    {service.title}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <a
                href="#om-oss"
                class="transition-colors hover:text-green-700 {isActive('#om-oss')
                    ? 'font-semibold text-green-700'
                    : ''}">
                Om oss
            </a>
            <a
                href="#kontakt"
                class="transition-colors hover:text-green-700 {isActive('#kontakt')
                    ? 'font-semibold text-green-700'
                    : ''}">
                Kontakt
            </a>
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
            class="flex flex-col border-t border-stone-200 bg-white px-6 py-6 text-xl text-stone-700 md:hidden">
            <!-- Tjänster accordion -->
            <button
                onclick={() => (mobileServicesOpen = !mobileServicesOpen)}
                class="flex items-center justify-between py-3 transition-colors hover:text-green-700 {isServiceActive()
                    ? 'font-semibold text-green-700'
                    : ''}"
                aria-expanded={mobileServicesOpen}>
                Tjänster
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-transform {mobileServicesOpen ? 'rotate-180' : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {#if mobileServicesOpen}
                <div class="mb-2 flex flex-col border-l-2 border-stone-200 pl-4">
                    {#each services as service}
                        <a
                            href={'/tjanster/' + service.slug}
                            onclick={closeMenu}
                            class="py-2 text-lg transition-colors hover:text-green-700 {currentPath ===
                            '/tjanster/' + service.slug
                                ? 'font-semibold text-green-700'
                                : 'text-stone-600'}">
                            {service.title}
                        </a>
                    {/each}
                </div>
            {/if}

            <a
                href="#om-oss"
                onclick={closeMenu}
                class="py-3 transition-colors hover:text-green-700">
                Om oss
            </a>
            <a
                href="#kontakt"
                onclick={closeMenu}
                class="py-3 transition-colors hover:text-green-700">
                Kontakt
            </a>
            <a
                href="#kontakt"
                onclick={closeMenu}
                class="mt-2 rounded-lg bg-green-700 px-5 py-3 text-center font-medium text-white transition-colors hover:bg-green-800">
                Boka tid
            </a>
        </nav>
    {/if}
</header>
