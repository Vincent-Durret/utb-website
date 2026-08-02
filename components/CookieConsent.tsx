import Script from "next/script";

/**
 * Bannière cookies RGPD via tarteaucitron.js
 * Les fichiers sont servis depuis /public/tarteaucitron (copiés au postinstall).
 *
 * Pour brancher un service (ex. GA4), décommentez / ajoutez dans le script d'init :
 *   tarteaucitron.user.gtagUa = "G-XXXXXXXX";
 *   (tarteaucitron.job = tarteaucitron.job || []).push("gtag");
 */
export default function CookieConsent() {
  return (
    <>
      <Script
        src="/tarteaucitron/tarteaucitron.js"
        strategy="beforeInteractive"
      />
      <Script id="tarteaucitron-init" strategy="afterInteractive">
        {`
          window.tarteaucitronForceLanguage = "fr";
          tarteaucitron.init({
            privacyUrl: "/mentions-legales",
            bodyPosition: "bottom",
            hashtag: "#tarteaucitron",
            cookieName: "tarteaucitron",
            orientation: "left",
            groupServices: false,
            showDetailsOnClick: true,
            serviceDefaultState: "wait",
            showAlertSmall: false,
            cookieslist: false,
            showIcon: true,
            iconPosition: "BottomLeft",
            adblocker: false,
            DenyAllCta: true,
            AcceptAllCta: true,
            highPrivacy: true,
            alwaysNeedConsent: false,
            handleBrowserDNTRequest: false,
            removeCredit: true,
            moreInfoLink: true,
            useExternalCss: false,
            useExternalJs: false,
            readmoreLink: "/mentions-legales",
            mandatory: true,
            mandatoryCta: true,
            googleConsentMode: true,
            closePopup: false,
          });
        `}
      </Script>
    </>
  );
}
