<script lang="ts">
    import { services } from '../../data/services';
    import { prefetch } from 'astro:prefetch';
    import Button from '../atoms/Button.svelte';
    import ChevronDown from '@lucide/svelte/icons/chevron-down';
    import Phone from '@lucide/svelte/icons/phone';
    import X from '@lucide/svelte/icons/x';
    import Menu from '@lucide/svelte/icons/menu';
    import Calendar from '@lucide/svelte/icons/calendar';

    let menuOpen = $state(false);
    let servicesOpen = $state(false);
    let mobileServicesOpen = $state(false);
    let headerEl: HTMLElement;
    let navWrapper: HTMLElement;
    let currentPath = $state('');
    let activeSection = $state<string | null>(null);

    let bookingUrl = import.meta.env.PUBLIC_BOOKING_URL;

    $effect(() => {
        function normalizePath(path: string) {
            return path.replace(/\/$/, '') || '/';
        }

        currentPath = normalizePath(window.location.pathname);

        function onSwap() {
            currentPath = normalizePath(window.location.pathname);
        }

        document.addEventListener('astro:after-swap', onSwap);
        return () => document.removeEventListener('astro:after-swap', onSwap);
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
                'a[href="/"], a[href^="/#"]'
            ) as HTMLAnchorElement | null;
            if (!anchor) return;

            e.preventDefault();

            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;
            const href = anchor.getAttribute('href')!;

            if (href === '/') {
                history.pushState(null, '', '/');
                window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                return;
            }

            const id = href.slice(2); // strip "/#"
            const el = document.getElementById(id);
            if (!el) return;

            history.pushState(null, '', href);
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

<header bind:this={headerEl} class="bg-primary/80 sticky top-0 z-50 backdrop-blur-md">
    <div class="mx-auto flex max-w-5xl items-center px-6 py-5">
        <!-- Logo -->
        <div class="flex-1">
            <a href="/" class="text-2xl font-semibold tracking-wide text-white">Helens Fotvård</a>
        </div>

        <!-- Desktop nav — centered -->
        <nav
            class="hidden items-center gap-10 text-base text-white/90 md:flex"
            bind:this={navWrapper}>
            <div class="relative">
                <button
                    onclick={toggleServices}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    class="flex cursor-pointer items-center gap-1 transition-colors duration-300 hover:text-white {isServiceActive()
                        ? 'font-semibold text-white'
                        : ''}">
                    Tjänster
                    <ChevronDown
                        class="h-4 w-4 transition-transform {servicesOpen ? 'rotate-180' : ''}"
                        aria-hidden="true" />
                </button>

                {#if servicesOpen}
                    <ul
                        class="border-card-border absolute top-full left-0 mt-2 w-52 rounded-lg border bg-white shadow-md"
                        role="list">
                        {#each services as service}
                            <li>
                                <a
                                    href={'/tjanster/' + service.slug}
                                    onmouseenter={(e) =>
                                        prefetch((e.currentTarget as HTMLAnchorElement).href)}
                                    onfocus={(e) =>
                                        prefetch((e.currentTarget as HTMLAnchorElement).href)}
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
                class="transition-colors duration-300 hover:text-white {isActive('/#om-oss')
                    ? 'font-semibold text-white'
                    : ''}">
                Om oss
            </a>
            <a
                href="/#kontakt"
                class="transition-colors duration-300 hover:text-white {isActive('/#kontakt')
                    ? 'font-semibold text-white'
                    : ''}">
                Kontakt
            </a>
        </nav>

        <!-- CTA — right -->
        <div class="hidden flex-1 justify-end md:flex">
            <Button href={bookingUrl} size="sm" variant="white">
                <Calendar class="h-4 w-4" aria-hidden="true" />
                Boka tid
            </Button>
        </div>

        <!-- Mobile hamburger -->
        <button
            class="hover:bg-primary-dark rounded-md p-2 text-white transition-colors md:hidden"
            onclick={toggleMenu}
            aria-label="Öppna meny"
            aria-expanded={menuOpen}>
            {#if menuOpen}
                <X class="h-7 w-7" aria-hidden="true" />
            {:else}
                <Menu class="h-7 w-7" aria-hidden="true" />
            {/if}
        </button>
    </div>

    {#if menuOpen}
        <nav
            class="bg-primary-dark flex flex-col border-t border-white/20 px-6 py-6 text-xl text-white md:hidden">
            <button
                onclick={() => (mobileServicesOpen = !mobileServicesOpen)}
                class="flex items-center justify-between py-3 transition-colors duration-300 hover:text-white {isServiceActive()
                    ? 'font-semibold text-white'
                    : ''}"
                aria-expanded={mobileServicesOpen}>
                Tjänster
                <ChevronDown
                    class="h-5 w-5 transition-transform {mobileServicesOpen ? 'rotate-180' : ''}"
                    aria-hidden="true" />
            </button>

            {#if mobileServicesOpen}
                <div class="mb-2 flex flex-col border-l-2 border-white/20 pl-4">
                    {#each services as service}
                        <a
                            href={'/tjanster/' + service.slug}
                            onmouseenter={(e) =>
                                prefetch((e.currentTarget as HTMLAnchorElement).href)}
                            onfocus={(e) => prefetch((e.currentTarget as HTMLAnchorElement).href)}
                            onclick={closeMenu}
                            class="py-2 text-lg transition-colors duration-300 hover:text-white {currentPath ===
                            '/tjanster/' + service.slug
                                ? 'font-semibold text-white'
                                : 'text-white/80'}">
                            {service.title}
                        </a>
                    {/each}
                </div>
            {/if}

            <a
                href="/#om-oss"
                onclick={closeMenu}
                class="py-3 transition-colors duration-300 hover:text-white {isActive('/#om-oss')
                    ? 'font-semibold text-white'
                    : ''}">
                Om oss
            </a>
            <a
                href="/#kontakt"
                onclick={closeMenu}
                class="py-3 transition-colors duration-300 hover:text-white {isActive('/#kontakt')
                    ? 'font-semibold text-white'
                    : ''}">
                Kontakt
            </a>
            <a
                href={bookingUrl}
                onclick={closeMenu}
                class="hover:text-primary mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white px-5 py-3 text-center font-medium text-white transition-colors duration-300 hover:bg-white">
                <Phone class="h-4 w-4" aria-hidden="true" />
                Boka tid
            </a>
        </nav>
    {/if}
</header>
