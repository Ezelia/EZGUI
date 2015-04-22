(function (root) {

    if ('performance' in root === false) {
        root.performance = {};
    }

    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });

    if ('now' in root.performance === false) {
        var offset = root.performance.timing && root.performance.timing.navigationStart ? performance.timing.navigationStart
            : Date.now();

        root.performance.now = function () {
            return Date.now() - offset;
        };
    }

})(this);