<script lang="ts">
    import { onMount } from 'svelte';
    import { Cookie } from 'lucide-svelte';

    let bannerVisible = $state(false);
    let iconVisible = $state(false);
    let acceptBtn: HTMLButtonElement;
    let iconBtn: HTMLButtonElement;
    const GTM_ID = import.meta.env.PUBLIC_GTM_ID;

    function loadGTM(id: string) {
        const script = document.createElement('script');
        script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
        document.head.appendChild(script);
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
    }

    onMount(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted') {
            if (GTM_ID) loadGTM(GTM_ID);
            iconVisible = true;
        } else if (consent === 'declined') {
            iconVisible = true;
        } else {
            bannerVisible = true;
        }
    });

    $effect(() => {
        if (bannerVisible && acceptBtn) acceptBtn.focus();
    });

    function accept() {
        localStorage.setItem('cookie-consent', 'accepted');
        if (GTM_ID) loadGTM(GTM_ID);
        bannerVisible = false;
        iconVisible = true;
        setTimeout(() => iconBtn?.focus(), 0);
    }

    function decline() {
        localStorage.setItem('cookie-consent', 'declined');
        bannerVisible = false;
        iconVisible = true;
        setTimeout(() => iconBtn?.focus(), 0);
    }

    function openSettings() {
        bannerVisible = true;
        iconVisible = false;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (!bannerVisible) return;
        if (e.key === 'Escape') {
            decline();
            return;
        }
        if (e.key === 'Tab') {
            const focusable = [acceptBtn, document.getElementById('cookie-decline-btn')].filter(
                Boolean
            ) as HTMLElement[];
            if (focusable.length < 2) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if bannerVisible}
    <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-heading"
        aria-describedby="cookie-consent-description"
        class="border-card-border bg-card fixed right-0 bottom-0 left-0 z-50 border-t shadow-lg">
        <div class="mx-auto max-w-5xl px-6 py-4">
            <p id="cookie-consent-heading" class="text-text-heading mb-1 font-semibold">
                Vi använder cookies
            </p>
            <p id="cookie-consent-description" class="text-text-body mb-4 text-sm">
                Vi använder cookies för att analysera hur sajten används och för att förbättra din
                upplevelse. Du väljer själv om du vill tillåta detta.
            </p>
            <div class="flex gap-3">
                <button
                    bind:this={acceptBtn}
                    onclick={accept}
                    class="bg-primary hover:bg-primary-dark focus-visible:outline-primary rounded-md px-4 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2">
                    Acceptera
                </button>
                <button
                    id="cookie-decline-btn"
                    onclick={decline}
                    class="border-card-border text-text-body hover:bg-surface-muted focus-visible:outline-primary rounded-md border px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2">
                    Avvisa
                </button>
            </div>
        </div>
    </div>
{/if}

{#if iconVisible}
    <button
        bind:this={iconBtn}
        type="button"
        onclick={openSettings}
        aria-label="Hantera cookieinställningar"
        class="border-card-border bg-card hover:bg-surface-muted focus-visible:outline-primary fixed bottom-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-md focus-visible:outline-2 focus-visible:outline-offset-2">
        <Cookie class="text-text-body h-5 w-5" aria-hidden="true" />
    </button>
{/if}
