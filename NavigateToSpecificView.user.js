// ==UserScript==
// @name         Navigate to a specific view
// @namespace    Automate
// @version      0.1
// @description  Automatically clicks elements in a specified order to navigate to a specific view when the URL contains certain text
// @author       VMI
// @match        *://*/*
// @require      https://raw.githubusercontent.com/V-MI/BrowserScripts/refs/heads/main/Shared/CommonHelper.js
// @updateURL    https://raw.githubusercontent.com/V-MI/BrowserScripts/refs/heads/main/NavigateToSpecificView.user.js
// @downloadURL  https://raw.githubusercontent.com/V-MI/BrowserScripts/refs/heads/main/NavigateToSpecificView.user.js
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    function getNavigateStepsFromHash() {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(hash.indexOf("?") + 1));
        const navigateParam = params.get('navigateTo');
        return navigateParam ? navigateParam.split(',').map(decodeURIComponent) : [];
    }
    
    const navigateSteps = getNavigateStepsFromHash();
    if (navigateSteps.length === 0) return;

    for (const navigateStep of navigateSteps) {
        const element = await commonHelper.waitElementAsync('*', n => n.textContent.trim() === navigateStep && n.children.length === 0);
        element.click();
    }
})();
