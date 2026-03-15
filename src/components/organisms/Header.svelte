<script lang="ts">
    import { services } from '../../data/services';
    import Button from '../atoms/Button.svelte';

    let menuOpen = $state(false);
    let servicesOpen = $state(false);
    let mobileServicesOpen = $state(false);
    let headerEl: HTMLElement;
    let navWrapper: HTMLElement;
    let currentPath = $state('');
    let activeSection = $state<string | null>(null);

    $effect(() => {
        currentPath = window.location.pathname;
    });

    $effect(() => {
        if (currentPath !== '/') return;

        const sectionIds = ['tjanster', 'om-oss', 'kontakt'] as const;
        const headerOffset = window.innerHeight * 0.4;

        function updateActiveSection() {
            let active: string | null = null;
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= headerOffset) {
                    active = id;
                }
            }
            activeSection = active;
        }

        window.addEventListener('scroll', updateActiveSection, { passive: true });
        updateActiveSection();

        return () => window.removeEventListener('scroll', updateActiveSection);
    });

    function isActive(href: string) {
        if (href.startsWith('/#')) {
            return currentPath === '/' && activeSection === href.slice(2);
        }
        return currentPath === href;
    }

    function isServiceActive() {
        return (
            currentPath.startsWith('/tjanster/') ||
            (currentPath === '/' && activeSection === 'tjanster')
        );
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

    $effect(() => {
        if (currentPath !== '/') return;

        function handleAnchorClick(e: MouseEvent) {
            const anchor = (e.target as HTMLElement).closest(
                'a[href="/"], a[href^="/#"]',
            ) as HTMLAnchorElement | null;
            if (!anchor) return;

            e.preventDefault();

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const href = anchor.getAttribute('href')!;

            if (href === '/') {
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                return;
            }

            const id = href.slice(2); // strip "/#"
            const el = document.getElementById(id);
            if (!el) return;

            const top = el.getBoundingClientRect().top + window.scrollY - headerEl.offsetHeight;
            window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }

        headerEl.addEventListener('click', handleAnchorClick);
        return () => headerEl.removeEventListener('click', handleAnchorClick);
    });

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

<header bind:this={headerEl} class="bg-surface-base/80 sticky top-0 z-50 backdrop-blur-md">
    <div class="mx-auto flex max-w-5xl items-center px-6 py-5">
        <!-- Logo -->
        <div class="flex-1">
            <a href="/" class="text-primary text-2xl font-semibold tracking-wide">Helens Fotvård</a>
        </div>

        <!-- Desktop nav — centered -->
        <nav
            class="hidden items-center gap-10 text-base text-stone-600 md:flex"
            bind:this={navWrapper}>
            <div class="relative">
                <button
                    onclick={toggleServices}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    class="hover:text-primary flex items-center gap-1 transition-colors duration-300 {isServiceActive()
                        ? 'text-primary font-semibold'
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
                        class="border-card-border absolute top-full left-0 mt-2 w-52 rounded-lg border bg-white shadow-md"
                        role="list">
                        {#each services as service}
                            <li>
                                <a
                                    href={'/tjanster/' + service.slug}
                                    onclick={closeServices}
                                    class="hover:bg-surface-muted hover:text-primary block px-4 py-3 text-sm text-stone-700 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg {currentPath ===
                                    '/tjanster/' + service.slug
                                        ? 'bg-surface-muted text-primary font-semibold'
                                        : ''}">
                                    {service.title}
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <a
                href="/#om-oss"
                class="hover:text-primary transition-colors duration-300 {isActive('/#om-oss')
                    ? 'text-primary font-semibold'
                    : ''}">
                Om oss
            </a>
            <a
                href="/#kontakt"
                class="hover:text-primary transition-colors duration-300 {isActive('/#kontakt')
                    ? 'text-primary font-semibold'
                    : ''}">
                Kontakt
            </a>
        </nav>

        <!-- CTA — right -->
        <div class="hidden flex-1 justify-end md:flex">
            <Button href="/#kontakt" size="sm" variant="outline">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Boka tid
            </Button>
        </div>

        <!-- Mobile hamburger -->
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
            class="flex flex-col border-t border-stone-100 bg-white/95 px-6 py-6 text-xl text-stone-700 md:hidden">
            <button
                onclick={() => (mobileServicesOpen = !mobileServicesOpen)}
                class="hover:text-primary flex items-center justify-between py-3 transition-colors duration-300 {isServiceActive()
                    ? 'text-primary font-semibold'
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
                            class="hover:text-primary py-2 text-lg transition-colors duration-300 {currentPath ===
                            '/tjanster/' + service.slug
                                ? 'text-primary font-semibold'
                                : 'text-stone-600'}">
                            {service.title}
                        </a>
                    {/each}
                </div>
            {/if}

            <a
                href="/#om-oss"
                onclick={closeMenu}
                class="hover:text-primary py-3 transition-colors duration-300 {isActive('/#om-oss')
                    ? 'text-primary font-semibold'
                    : ''}">
                Om oss
            </a>
            <a
                href="/#kontakt"
                onclick={closeMenu}
                class="hover:text-primary py-3 transition-colors duration-300 {isActive('/#kontakt')
                    ? 'text-primary font-semibold'
                    : ''}">
                Kontakt
            </a>
            <a
                href="/#kontakt"
                onclick={closeMenu}
                class="border-primary text-primary hover:bg-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-center font-medium transition-colors duration-300 hover:text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Boka tid
            </a>
        </nav>
    {/if}
</header>
