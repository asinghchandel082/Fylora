export const initAnalytics = () => {
    let scriptsLoaded = false;
    const loadScripts = () => {
        if (scriptsLoaded) return;
        scriptsLoaded = true;

        // GTM
        (function (w: any, d: Document, s: string, l: string, i: string) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s) as HTMLScriptElement,
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            if (f.parentNode) {
                f.parentNode.insertBefore(j, f);
            }
        })(window, document, 'script', 'dataLayer', 'GTM-M84PH42S');

        // GA4
        var gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-GWNZEXXPCV";
        document.head.appendChild(gtagScript);

        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.gtag = function () { w.dataLayer.push(arguments); }
        w.gtag('js', new Date());
        w.gtag('config', 'G-GWNZEXXPCV');
    };

    // Use requestIdleCallback to ensure we don't block the main thread even after interaction
    const loadIdle = () => {
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadScripts, { timeout: 2000 });
        } else {
            setTimeout(loadScripts, 500);
        }
    };

    // Load strictly on deliberate user interaction, avoiding passive hover/touch bugs
    ['click', 'scroll'].forEach(e => {
        window.addEventListener(e, loadIdle, { passive: true, once: true });
    });
};
