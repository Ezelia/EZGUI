module EZGUI {
    export var Interpolation = {

        Linear: function (v, k) {

            var m = v.length - 1, f = m * k, i = Math.floor(f), fn = EZGUI.Interpolation.Utils.Linear;

            if (k < 0) return fn(v[0], v[1], f);
            if (k > 1) return fn(v[m], v[m - 1], m - f);

            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

        },

        Bezier: function (v, k) {

            var b = 0, n = v.length - 1, pw = Math.pow, bn = EZGUI.Interpolation.Utils.Bernstein, i;

            for (i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }

            return b;

        },

        CatmullRom: function (v, k) {
            
            var m = v.length - 1, f = m * k, i = Math.floor(f), fn = EZGUI.Interpolation.Utils.CatmullRom;

            if (v[0] === v[m]) {

                if (k < 0) i = Math.floor(f = m * (1 + k));

                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

            } else {

                if (k < 0) return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                if (k > 1) return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

            }

        },

        Utils: {

            Linear: function (p0, p1, t) {

                return (p1 - p0) * t + p0;

            },

            Bernstein: function (n, i) {

                var fc = EZGUI.Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);

            },

            Factorial: (function () {

                var a = [1];

                return function (n) {

                    var s = 1, i;
                    if (a[n]) return a[n];
                    for (i = n; i > 1; i--) s *= i;
                    return a[n] = s;

                };

            })(),

            CatmullRom: function (p0, p1, p2, p3, t) {

                var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

            }

        }
    }
}
