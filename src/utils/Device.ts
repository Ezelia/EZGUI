module EZGUI.Device {
    //Code taken from https://github.com/g13n/ua.js 


    var userAgent = (window.navigator && navigator.userAgent) || "";

    function detect(pattern) {
        
            return (pattern).test(userAgent);
        
    }

    /**
     * Return true if the browser is Chrome or compatible.
     *
     * @method isChrome
     */
    export var isChrome = detect(/webkit\W.*(chrome|chromium)\W/i);

    /**
     * Return true if the browser is Firefox.
     *
     * @method isFirefox
     */
    export var isFirefox = detect(/mozilla.*\Wfirefox\W/i);

    /**
     * Return true if the browser is using the Gecko engine.
     *
     * This is probably a better way to identify Firefox and other browsers
     * that use XulRunner.
     *
     * @method isGecko
     */
    export var isGecko = detect(/mozilla(?!.*webkit).*\Wgecko\W/i);

    /**
     * Return true if the browser is Internet Explorer.
     *
     * @method isIE
     */
    export var isIE = function () {
        if (navigator.appName === "Microsoft Internet Explorer") {
            return true;
        } else if (detect(/\bTrident\b/)) {
            return true;
        } else {
            return false;
        }
    };


    /**
     * Return true if the browser is running on Kindle.
     *
     * @method isKindle
     */
    export var isKindle = detect(/\W(kindle|silk)\W/i);

    /**
     * Return true if the browser is running on a mobile device.
     *
     * @method isMobile
     */
    export var isMobile = detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i);

    /**
     * Return true if we are running on Opera.
     *
     * @method isOpera
     */
    export var isOpera = detect(/opera.*\Wpresto\W|OPR/i);

    /**
     * Return true if the browser is Safari.
     *
     * @method isSafari
     */
    export var isSafari = detect(/webkit\W(?!.*chrome).*safari\W/i);

    /**
     * Return true if the browser is running on a tablet.
     *
     * One way to distinguish Android mobiles from tablets is that the
     * mobiles contain the string "mobile" in their UserAgent string.
     * If the word "Android" isn't followed by "mobile" then its a
     * tablet.
     *
     * @method isTablet
     */
    export var isTablet = detect(/(ipad|android(?!.*mobile)|tablet)/i);

    /**
     * Return true if the browser is running on a TV!
     *
     * @method isTV
     */
    export var isTV = detect(/googletv|sonydtv/i);

    /**
     * Return true if the browser is running on a WebKit browser.
     *
     * @method isWebKit
     */
    export var isWebKit = detect(/webkit\W/i);

    /**
     * Return true if the browser is running on an Android browser.
     *
     * @method isAndroid
     */
    export var isAndroid = detect(/android/i);

    /**
     * Return true if the browser is running on any iOS device.
     *
     * @method isIOS
     */
    export var isIOS = detect(/(ipad|iphone|ipod)/i);

    /**
     * Return true if the browser is running on an iPad.
     *
     * @method isIPad
     */
    export var isIPad = detect(/ipad/i);

    /**
     * Return true if the browser is running on an iPhone.
     *
     * @method isIPhone
     */
    export var isIPhone = detect(/iphone/i);

    /**
     * Return true if the browser is running on an iPod touch.
     *
     * @method isIPod
     */
    export var isIPod = detect(/ipod/i);


    export var isMobile = detect(/mobile/i) || isAndroid || isIOS;
    /**
     * Return the complete UserAgent string verbatim.
     *
     * @method whoami
     */
    export var whoami =  function () {
        return userAgent;
    }
}