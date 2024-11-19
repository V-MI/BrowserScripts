commonHelper = (function () {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function waitElementAsync(selector, predicate) {
        let result;
        while (!result) {
            const elements = Array.from(document.querySelectorAll(selector));
            if(elements.length > 0) {
                if(predicate){
                    result = elements.find(n => predicate(n));
                } else {
                    result = elements[0];
                }
            }
            await sleep(100);
        }
        return result;
    }

    async function waitPropertyAsync(object, propertyName) {
        let result;
        while (!result) {
            if(propertyName in object){
                result = true
            }
            await sleep(100);
        }
        return;
    }

    return {
        sleep,
        waitElementAsync,
        waitPropertyAsync,
    };
})();
