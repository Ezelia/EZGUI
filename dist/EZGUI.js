var EZGUI;
(function (EZGUI) {
    EZGUI.Easing = {
        Linear: {
            None: function (k) {
                return k;
            }
        },
        Quadratic: {
            In: function (k) {
                return k * k;
            },
            Out: function (k) {
                return k * (2 - k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k;
                return -0.5 * (--k * (k - 2) - 1);
            }
        },
        Cubic: {
            In: function (k) {
                return k * k * k;
            },
            Out: function (k) {
                return --k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k;
                return 0.5 * ((k -= 2) * k * k + 2);
            }
        },
        Quartic: {
            In: function (k) {
                return k * k * k * k;
            },
            Out: function (k) {
                return 1 - (--k * k * k * k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k * k;
                return -0.5 * ((k -= 2) * k * k * k - 2);
            }
        },
        Quintic: {
            In: function (k) {
                return k * k * k * k * k;
            },
            Out: function (k) {
                return --k * k * k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return 0.5 * k * k * k * k * k;
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            }
        },
        Sinusoidal: {
            In: function (k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            Out: function (k) {
                return Math.sin(k * Math.PI / 2);
            },
            InOut: function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
        },
        Exponential: {
            In: function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },
            Out: function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },
            InOut: function (k) {
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if ((k *= 2) < 1)
                    return 0.5 * Math.pow(1024, k - 1);
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            }
        },
        Circular: {
            In: function (k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            Out: function (k) {
                return Math.sqrt(1 - (--k * k));
            },
            InOut: function (k) {
                if ((k *= 2) < 1)
                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            }
        },
        Elastic: {
            In: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            },
            Out: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
            },
            InOut: function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0)
                    return 0;
                if (k === 1)
                    return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                if ((k *= 2) < 1)
                    return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
            }
        },
        Back: {
            In: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            Out: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            InOut: function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1)
                    return 0.5 * (k * k * ((s + 1) * k - s));
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            }
        },
        Bounce: {
            In: function (k) {
                return 1 - EZGUI.Easing.Bounce.Out(1 - k);
            },
            Out: function (k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                }
                else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                }
                else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                }
                else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            },
            InOut: function (k) {
                if (k < 0.5)
                    return EZGUI.Easing.Bounce.In(k * 2) * 0.5;
                return EZGUI.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            }
        }
    };
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    EZGUI.Interpolation = {
        Linear: function (v, k) {
            var m = v.length - 1, f = m * k, i = Math.floor(f), fn = EZGUI.Interpolation.Utils.Linear;
            if (k < 0)
                return fn(v[0], v[1], f);
            if (k > 1)
                return fn(v[m], v[m - 1], m - f);
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
                if (k < 0)
                    i = Math.floor(f = m * (1 + k));
                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            }
            else {
                if (k < 0)
                    return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                if (k > 1)
                    return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
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
                    if (a[n])
                        return a[n];
                    for (i = n; i > 1; i--)
                        s *= i;
                    return a[n] = s;
                };
            })(),
            CatmullRom: function (p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            }
        }
    };
})(EZGUI || (EZGUI = {}));
/// <reference path="easing.ts" />
/// <reference path="interpolation.ts" />
/**
 * This is a part of Tween.js converted to TypeScript
 *
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 */
var EZGUI;
(function (EZGUI) {
    var Tween = (function () {
        //#endregion
        function Tween(object) {
            this._valuesStart = {};
            this._valuesEnd = {};
            this._valuesStartRepeat = {};
            this._duration = 1000;
            this._repeat = 0;
            this._yoyo = false;
            this._isPlaying = false;
            this._reversed = false;
            this._delayTime = 0;
            this._startTime = null;
            this._easingFunction = EZGUI.Easing.Linear.None;
            this._interpolationFunction = EZGUI.Interpolation.Linear;
            this._chainedTweens = [];
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
            this._onCompleteCallback = null;
            this._onStopCallback = null;
            this._object = object;
            for (var field in object) {
                this._valuesStart[field] = parseFloat(object[field], 10);
            }
        }
        Tween.getAll = function () {
            return this._tweens;
        };
        Tween.removeAll = function () {
            this._tweens = [];
        };
        Tween.add = function (tween) {
            this._tweens.push(tween);
        };
        Tween.remove = function (tween) {
            var i = this._tweens.indexOf(tween);
            if (i !== -1) {
                this._tweens.splice(i, 1);
            }
        };
        Tween.update = function (time) {
            if (this._tweens.length === 0)
                return false;
            var i = 0;
            time = time !== undefined ? time : window.performance.now();
            while (i < this._tweens.length) {
                if (this._tweens[i].update(time)) {
                    i++;
                }
                else {
                    this._tweens.splice(i, 1);
                }
            }
            return true;
        };
        Tween.prototype.to = function (properties, duration) {
            if (duration !== undefined) {
                this._duration = duration;
            }
            this._valuesEnd = properties;
            return this;
        };
        Tween.prototype.start = function (time) {
            Tween.add(this);
            this._isPlaying = true;
            this._onStartCallbackFired = false;
            this._startTime = time !== undefined ? time : window.performance.now();
            this._startTime += this._delayTime;
            for (var property in this._valuesEnd) {
                // check if an Array was provided as property value
                if (this._valuesEnd[property] instanceof Array) {
                    if (this._valuesEnd[property].length === 0) {
                        continue;
                    }
                    // create a local copy of the Array with the start value at the front
                    this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
                }
                this._valuesStart[property] = this._object[property];
                if ((this._valuesStart[property] instanceof Array) === false) {
                    this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
            }
            return this;
        };
        Tween.prototype.stop = function () {
            if (!this._isPlaying) {
                return this;
            }
            Tween.remove(this);
            this._isPlaying = false;
            if (this._onStopCallback !== null) {
                this._onStopCallback.call(this._object);
            }
            this.stopChainedTweens();
            return this;
        };
        Tween.prototype.stopChainedTweens = function () {
            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                this._chainedTweens[i].stop();
            }
        };
        Tween.prototype.delay = function (amount) {
            this._delayTime = amount;
            return this;
        };
        Tween.prototype.repeat = function (times) {
            this._repeat = times;
            return this;
        };
        Tween.prototype.yoyo = function (yoyo) {
            this._yoyo = yoyo;
            return this;
        };
        Tween.prototype.easing = function (easing) {
            this._easingFunction = easing;
            return this;
        };
        Tween.prototype.interpolation = function (interpolation) {
            this._interpolationFunction = interpolation;
            return this;
        };
        Tween.prototype.chain = function () {
            this._chainedTweens = arguments;
            return this;
        };
        Tween.prototype.onStart = function (callback) {
            this._onStartCallback = callback;
            return this;
        };
        Tween.prototype.onUpdate = function (callback) {
            this._onUpdateCallback = callback;
            return this;
        };
        Tween.prototype.onComplete = function (callback) {
            this._onCompleteCallback = callback;
            return this;
        };
        Tween.prototype.onStop = function (callback) {
            this._onStopCallback = callback;
            return this;
        };
        Tween.prototype.update = function (time) {
            var property;
            if (time < this._startTime) {
                return true;
            }
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback !== null) {
                    this._onStartCallback.call(this._object);
                }
                this._onStartCallbackFired = true;
            }
            var elapsed = (time - this._startTime) / this._duration;
            elapsed = elapsed > 1 ? 1 : elapsed;
            var value = this._easingFunction(elapsed);
            for (property in this._valuesEnd) {
                var start = this._valuesStart[property] || 0;
                var end = this._valuesEnd[property];
                if (end instanceof Array) {
                    this._object[property] = this._interpolationFunction(end, value);
                }
                else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (typeof (end) === "string") {
                        end = start + parseFloat(end, 10);
                    }
                    // protect against non numeric properties.
                    if (typeof (end) === "number") {
                        this._object[property] = start + (end - start) * value;
                    }
                }
            }
            if (this._onUpdateCallback !== null) {
                this._onUpdateCallback.call(this._object, value);
            }
            if (elapsed == 1) {
                if (this._repeat > 0) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }
                    for (property in this._valuesStartRepeat) {
                        if (typeof (this._valuesEnd[property]) === "string") {
                            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property], 10);
                        }
                        if (this._yoyo) {
                            var tmp = this._valuesStartRepeat[property];
                            this._valuesStartRepeat[property] = this._valuesEnd[property];
                            this._valuesEnd[property] = tmp;
                        }
                        this._valuesStart[property] = this._valuesStartRepeat[property];
                    }
                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }
                    this._startTime = time + this._delayTime;
                    return true;
                }
                else {
                    if (this._onCompleteCallback !== null) {
                        this._onCompleteCallback.call(this._object);
                    }
                    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                        this._chainedTweens[i].start(time);
                    }
                    return false;
                }
            }
            return true;
        };
        //#region Static part replacing TWEEN namespace from original tweenjs
        Tween._tweens = [];
        return Tween;
    })();
    EZGUI.Tween = Tween;
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        var EventHandler = (function () {
            function EventHandler() {
            }
            EventHandler.prototype.bind = function (event, fct) {
                this._events = this._events || {};
                this._events[event] = this._events[event] || [];
                this._events[event].push(fct);
            };
            //same as bind
            EventHandler.prototype.on = function (event, fct, nbcalls) {
                this._events = this._events || {};
                this._events[event] = this._events[event] || [];
                if (nbcalls)
                    fct.__nbcalls__ = nbcalls;
                this._events[event].push(fct);
            };
            //unbind(event, fct) {
            //    this._events = this._events || {};
            //    //if (event in this._events === false) return;
            //    if (event in this._events === false || typeof this._events[event] != 'array') return;
            //    this._events[event].splice(this._events[event].indexOf(fct), 1);
            //}
            EventHandler.prototype.unbind = function (event, fct) {
                this._events = this._events || {};
                if (event in this._events === false || !this._events[event] || !(this._events[event] instanceof Array))
                    return;
                this._events[event].splice(this._events[event].indexOf(fct), 1);
            };
            EventHandler.prototype.unbindEvent = function (event) {
                this._events = this._events || {};
                this._events[event] = [];
            };
            EventHandler.prototype.unbindAll = function () {
                this._events = this._events || {};
                for (var event in this._events)
                    this._events[event] = false;
            };
            EventHandler.prototype.trigger = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this._events = this._events || {};
                if (event in this._events !== false) {
                    for (var i = 0; i < this._events[event].length; i++) {
                        var fct = this._events[event][i];
                        fct.apply(this, args);
                        if (fct.__nbcalls__) {
                            fct.__nbcalls__--;
                            if (fct.__nbcalls__ <= 0)
                                this.unbind(event, fct);
                        }
                    }
                }
            };
            return EventHandler;
        })();
        utils.EventHandler = EventHandler;
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
/**
* Hack in support for Function.name for browsers that don't support it.
* IE, I'm looking at you.
**/
if (Function.prototype['name'] === undefined && Object.defineProperty !== undefined) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function () {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = (funcNameRegex).exec((this).toString());
            return (results && results.length > 1) ? results[1].trim() : "";
        },
        set: function (value) {
        }
    });
}
/// <reference path="polyfills/ie.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//declare var __extends;
var EZGUI;
(function (EZGUI) {
    var Compatibility;
    (function (Compatibility) {
        Compatibility.PIXIVersion = (PIXI.VERSION.indexOf('v3.') == 0 || PIXI.VERSION.indexOf('3.') == 0) ? 3 : 2;
        Compatibility.isPhaser = (typeof Phaser != 'undefined');
        Compatibility.isPhaser24 = Compatibility.isPhaser && Phaser.VERSION.indexOf('2.4') == 0;
        Compatibility.BitmapText = Compatibility.PIXIVersion >= 3 ? PIXI.extras.BitmapText : PIXI.BitmapText;
        var TilingSprite = (function () {
            function TilingSprite(texture, width, height) {
            }
            return TilingSprite;
        })();
        Compatibility.TilingSprite = TilingSprite;
        var GUIContainer = (function (_super) {
            __extends(GUIContainer, _super);
            function GUIContainer() {
                _super.apply(this, arguments);
            }
            return GUIContainer;
        })(PIXI.DisplayObjectContainer);
        Compatibility.GUIContainer = GUIContainer;
        if (Compatibility.PIXIVersion == 3) {
            Compatibility['GUIContainer'] = PIXI['Container'];
        }
        else {
            Compatibility['GUIContainer'] = PIXI['DisplayObjectContainer'];
        }
        var GUIDisplayObjectContainer = (function (_super) {
            __extends(GUIDisplayObjectContainer, _super);
            function GUIDisplayObjectContainer() {
                _super.call(this);
                if (typeof Phaser != 'undefined') {
                    var game = Phaser.GAMES[0];
                    if (!GUIDisplayObjectContainer.globalPhaserGroup)
                        GUIDisplayObjectContainer.globalPhaserGroup = new Phaser.Group(game, game.stage, 'guigroup');
                    this.phaserGroup = GUIDisplayObjectContainer.globalPhaserGroup.create(0, 0); //new Phaser.Group(Phaser.GAMES[0]);
                    this.phaserGroup.addChild(this);
                    this.phaserGroup.guiSprite = this;
                }
            }
            return GUIDisplayObjectContainer;
        })(GUIContainer);
        Compatibility.GUIDisplayObjectContainer = GUIDisplayObjectContainer;
        //var dummy:any = (function (_super) {
        //    __extends(GUIDisplayObjectContainer, _super);
        //    function GUIDisplayObjectContainer() {
        //        _super.call(this, [Phaser.GAMES[0]]);
        //    }
        //    return GUIDisplayObjectContainer;
        //})(Phaser.Group);
        //Compatibility['GUIDisplayObjectContainer'] = dummy;
        function createRenderTexture(width, height) {
            var texture;
            if (EZGUI.Compatibility.PIXIVersion == 3) {
                texture = new PIXI.RenderTexture(EZGUI.tilingRenderer, width, height);
            }
            else {
                texture = new PIXI.RenderTexture(width, height, EZGUI.tilingRenderer);
            }
            return texture;
        }
        Compatibility.createRenderTexture = createRenderTexture;
        /*
         *
         * this function is used to fix Phaser 2.4 compatibility
         * it need to be attached to onLoadComplete of phaser's loader to copy loaded resources to PIXI.TextureCache
         */
        function fixCache(resources) {
            if (!EZGUI.Compatibility.isPhaser24 || !this._fileList)
                return;
            for (var i = 0; i < this._fileList.length; i++) {
                if (!resources || resources.length == 0 || resources.indexOf(this._fileList[i].key) >= 0) {
                    var tx = new PIXI.Texture(new PIXI.BaseTexture(this._fileList[i].data));
                    PIXI.TextureCache[this._fileList[i].key] = tx;
                }
            }
        }
        Compatibility.fixCache = fixCache;
    })(Compatibility = EZGUI.Compatibility || (EZGUI.Compatibility = {}));
})(EZGUI || (EZGUI = {}));
if (EZGUI.Compatibility.PIXIVersion == 3) {
    PIXI['utils']._saidHello = true;
    //EZGUI.tilingRenderer = new PIXI.WebGLRenderer();
    EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
    EZGUI.Compatibility.TilingSprite = (PIXI.extras).TilingSprite;
    PIXI['utils']._saidHello = false;
}
else {
    EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
    EZGUI.Compatibility.TilingSprite = PIXI.TilingSprite;
}
EZGUI.Compatibility.TilingSprite.prototype['fixPhaser24'] = function () {
    if (EZGUI.Compatibility.isPhaser24) {
        var ltexture = this.originalTexture || this.texture;
        var frame = ltexture.frame;
        var targetWidth, targetHeight;
        //  Check that the frame is the same size as the base texture.
        var isFrame = frame.width !== ltexture.baseTexture.width || frame.height !== ltexture.baseTexture.height;
        this._frame = {};
        if (ltexture.trim) {
            this._frame.spriteSourceSizeX = ltexture.trim.width;
            this._frame.spriteSourceSizeY = ltexture.trim.height;
        }
        else {
            this._frame.sourceSizeW = frame.width;
            this._frame.sourceSizeH = frame.height;
        }
    }
};
if (PIXI.EventTarget) {
    PIXI.EventTarget.mixin(EZGUI.Compatibility.GUIDisplayObjectContainer.prototype);
}
else {
    if (EZGUI.Compatibility.isPhaser) {
        var proto = EZGUI.Compatibility.GUIDisplayObjectContainer.prototype;
        proto.on = function (event, fct) {
            this._listeners = this._listeners || {};
            this._listeners[event] = this._listeners[event] || [];
            this._listeners[event].push(fct);
        };
        proto.off = function (event, fct) {
            this._listeners = this._listeners || {};
            if (!fct) {
                this._listeners[event] = [];
            }
            else {
                if (event in this._listeners === false || typeof this._listeners[event] != 'array')
                    return;
                this._listeners[event].splice(this._listeners[event].indexOf(fct), 1);
            }
        };
        proto.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._listeners = this._listeners || {};
            if (event in this._listeners !== false) {
                for (var i = 0; i < this._listeners[event].length; i++) {
                    var fct = this._listeners[event][i];
                    fct.apply(this, args);
                    if (fct.__nbcalls__) {
                        fct.__nbcalls__--;
                        if (fct.__nbcalls__ <= 0)
                            this.unbind(event, fct);
                    }
                }
            }
        };
    }
}
/// <reference path="ezgui.ts" />
var EZGUI;
(function (EZGUI) {
    var Theme = (function () {
        function Theme(themeConfig) {
            this.themeConfig = themeConfig;
            this._listeners = [];
            this.ready = false;
            this.url = '';
            var _this = this;
            if (typeof themeConfig == 'string') {
                _this.url = themeConfig;
                EZGUI.utils.loadJSON(_this.url, function (themeConfig) {
                    _this.themeConfig = themeConfig;
                    _this.initThemeConfig(themeConfig);
                });
            }
            else {
                this.initThemeConfig(themeConfig);
            }
        }
        Theme.prototype.override = function (themeConfig) {
            var _theme = JSON.parse(JSON.stringify(themeConfig));
            for (var t in _theme) {
                if (t == 'default')
                    continue;
                var skin = _theme[t];
                EZGUI.utils.extendJSON(skin, this._default);
            }
            this.parseComponents(_theme);
            for (var t in _theme) {
                if (t == 'default')
                    continue;
                var skin = _theme[t];
                this._theme[t] = skin;
            }
        };
        Theme.prototype.fixLimits = function (target, source) {
            if (typeof source == 'object') {
                if (target.width != undefined && source.maxWidth)
                    target.width = Math.min(target.width, source.maxWidth);
                if (target.height != undefined && source.maxHeight)
                    target.height = Math.min(target.height, source.maxHeight);
                for (var i in source) {
                    var src = source[i];
                    if (typeof target[i] == 'object') {
                        this.fixLimits(target[i], source[i]);
                    }
                }
            }
        };
        Theme.prototype.initThemeConfig = function (themeConfig) {
            this._theme = JSON.parse(JSON.stringify(themeConfig));
            this.id = this._theme.__config__ ? this._theme.__config__.name : undefined;
            this._default = this._theme['default'];
            for (var t in this._theme) {
                if (t == 'default')
                    continue;
                var skin = this._theme[t];
                /*
                for (var i in this._default) {
                    if (!skin[i]) skin[i] = JSON.parse(JSON.stringify(this._default[i]));
                }
                */
                EZGUI.utils.extendJSON(skin, this._default);
            }
            this.path = this.url.substring(0, this.url.lastIndexOf('/') + 1);
            this.parseComponents(this._theme);
            this.preload();
        };
        Theme.prototype.parseResources = function () {
            var themeResources = this._theme.__config__.resources;
            var resources = [];
            if (!themeResources || themeResources.length <= 0)
                return resources;
            var resToLoad = 0;
            for (var i = 0; i < themeResources.length; i++) {
                var res = themeResources[i];
                if (res.indexOf('http://') == 0 || res.indexOf('https://') == 0 || res.indexOf('file://') == 0 || res.indexOf('/') == 0)
                    continue;
                //TODO : use a path normalizer here
                if (res.indexOf('./') == 0)
                    res = res.substring(2);
                if (PIXI.loader && PIXI.loader.resources[resources[i]]) {
                }
                else {
                    resources.push(this.path + res);
                }
            }
            return resources;
        };
        Theme.prototype.parseComponents = function (theme) {
            for (var i in theme) {
                if (i == '__config__')
                    continue;
                var item = theme[i];
                for (var c = 0; c < Theme.imageComponents.length; c++) {
                    var cc = Theme.imageComponents[c];
                    for (var v = 0; v < Theme.imageVariants.length; v++) {
                        var vv = Theme.imageVariants[v];
                        if (vv != '')
                            cc = cc + '-' + vv;
                        if (item[cc] == undefined)
                            continue;
                        if (typeof item[cc] == 'string') {
                            var str = item[cc];
                            item[cc] = this.normalizeResPath(str);
                        }
                        else {
                            for (var s = 0; s < Theme.imageStates.length; s++) {
                                var st = Theme.imageStates[s];
                                var str = item[cc][st];
                                if (str) {
                                    item[cc][st] = this.normalizeResPath(str);
                                }
                            }
                        }
                    }
                }
            }
        };
        Theme.prototype.normalizeResPath = function (str) {
            if (str.indexOf('./') != 0)
                return str;
            str = str.substring(2);
            return this.path + str;
        };
        Theme.load = function (themes, cb) {
            if (cb === void 0) { cb = null; }
            var remaining = 0;
            for (var i = 0; i < themes.length; i++) {
                remaining++;
                var theme = new Theme(themes[i]);
                theme.onReady(function () {
                    remaining--;
                    if (remaining <= 0 && typeof cb == 'function') {
                        cb();
                    }
                });
            }
        };
        //experimental Theme transparent preload
        Theme.prototype.onReady = function (cb) {
            if (typeof cb != 'function')
                return;
            if (this.ready)
                cb();
            this._listeners.push(cb);
        };
        Theme.prototype.preload = function () {
            var _this = this;
            var onAssetsLoaded = function () {
                _this.ready = true;
                EZGUI.themes[_this.id] = _this;
                var cb;
                while (cb = _this._listeners.pop())
                    cb();
            };
            if (this._theme.__config__ && this._theme.__config__.resources) {
                var resources = this.parseResources();
                if (resources.length == 0) {
                    onAssetsLoaded();
                }
                else {
                    //console.log('Theme preloading ', resources);
                    //utils.loadJSON(_this.url, function (themeConfig) {
                    //    _this.themeConfig = themeConfig;
                    //    _this.initThemeConfig(themeConfig);
                    //});
                    _this.loadResources(resources, onAssetsLoaded);
                }
            }
            else {
                onAssetsLoaded();
            }
        };
        Theme.prototype.loadResources = function (resources, cb) {
            var _this = this;
            var images = [];
            var atlases = [];
            var fonts = [];
            var atlasData = {};
            var fontData = {};
            var resToLoad = 0;
            var cacheAtlas = function () {
                for (var i in atlasData) {
                    var atlasJson = atlasData[i];
                    var imgUrl = _this.path + atlasJson.meta.image;
                    var baseTx = PIXI.utils ? PIXI.utils.TextureCache[imgUrl].baseTexture : PIXI.TextureCache[imgUrl].baseTexture;
                    for (var f in atlasJson.frames) {
                        var frame = atlasJson.frames[f].frame;
                        var texture = new PIXI.Texture(baseTx, {
                            x: frame.x,
                            y: frame.y,
                            width: frame.w,
                            height: frame.h
                        });
                        if (PIXI.utils) {
                            PIXI.utils.TextureCache[f] = texture;
                        }
                        else {
                            PIXI.TextureCache[f] = texture;
                        }
                    }
                }
                for (var i in fontData) {
                    var font = fontData[i];
                    _this.parseFont(font, PIXI.Texture.fromFrame(font.textureId));
                }
                cb();
            };
            //var phaser24cache = function (loader) {
            //    if (!loader._fileList) return;
            //    //console.log(loader._fileList);
            //    for (var i = 0; i < loader._fileList.length; i++) {
            //        var tx = new (<any>PIXI).Texture(new (<any>PIXI).BaseTexture(loader._fileList[i].data));
            //        //tx._frame = { test: 1 };
            //        //console.log('Caching : ', loader._fileList[i].key);
            //        PIXI.TextureCache[loader._fileList[i].key] = tx;
            //        //console.log(tx);
            //    }
            //}
            var loadImages = function () {
                var crossOrigin = (EZGUI.settings.crossOrigin == true);
                if (typeof Phaser != 'undefined') {
                    //console.log('Phaser loader');
                    var loader = new Phaser.Loader(Phaser.GAMES[0]);
                    loader.crossOrigin = crossOrigin;
                    for (var i = 0; i < images.length; i++) {
                        loader.image(images[i], images[i]);
                    }
                    loader.onLoadComplete.add(function () {
                        //loader.onLoadComplete.add(EZGUI.Compatibility.fixCache, loader);
                        EZGUI.Compatibility.fixCache.apply(loader);
                        //phaser24cache(loader);
                        cacheAtlas();
                    });
                    loader.start();
                    return;
                }
                if (PIXI.loader) {
                    for (var i = 0; i < images.length; i++) {
                        PIXI.loader.add({ url: images[i], crossOrigin: crossOrigin });
                    }
                    //(<any>PIXI).loader.add(images);
                    PIXI.loader.load(cacheAtlas);
                }
                else {
                    var loader = new PIXI.AssetLoader(images, crossOrigin);
                    loader.onComplete = cacheAtlas;
                    loader.load();
                }
            };
            for (var i = 0; i < resources.length; i++) {
                var res = resources[i];
                if (res.indexOf('.json') > 0) {
                    atlases.push(res);
                    continue;
                }
                if (res.indexOf('.xml') > 0 || res.indexOf('.fnt') > 0) {
                    fonts.push(res);
                    continue;
                }
                images.push(res);
            }
            if (atlases.length > 0) {
                for (var i = 0; i < atlases.length; i++) {
                    var font = atlases[i];
                    resToLoad++;
                    (function (atlasUrl) {
                        EZGUI.utils.loadJSON(atlasUrl, function (atlasjson) {
                            images.push(_this.path + atlasjson.meta.image);
                            resToLoad--;
                            atlasData[atlasUrl] = atlasjson;
                            if (resToLoad <= 0) {
                                //console.log('Atlas loaded ', images);
                                loadImages();
                            }
                        });
                    })(font);
                }
            }
            if (fonts.length > 0) {
                for (var i = 0; i < fonts.length; i++) {
                    var font = fonts[i];
                    resToLoad++;
                    (function (atlasUrl) {
                        EZGUI.utils.loadXML(atlasUrl, function (xmlfont) {
                            var img = xmlfont.getElementsByTagName('page')[0].getAttribute('file');
                            var path = atlasUrl.substring(0, atlasUrl.lastIndexOf('\\') + atlasUrl.lastIndexOf('/') + 2);
                            var src = path + img;
                            //console.log('Fake font load = ', src);
                            images.push(src);
                            resToLoad--;
                            fontData[atlasUrl] = {
                                data: xmlfont,
                                textureId: src
                            };
                            if (resToLoad <= 0) {
                                //console.log('Fonts loaded ', images);
                                loadImages();
                            }
                        });
                    })(font);
                }
            }
            if (atlases.length <= 0 && fonts.length <= 0) {
                loadImages();
            }
        };
        Theme.prototype.parseFont = function (resource, texture) {
            var data = {};
            var info = resource.data.getElementsByTagName('info')[0];
            var common = resource.data.getElementsByTagName('common')[0];
            data.font = info.getAttribute('face');
            data.size = parseInt(info.getAttribute('size'), 10);
            data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
            data.chars = {};
            var Rectangle;
            var BitmapText;
            if (EZGUI.Compatibility.PIXIVersion == 3) {
                Rectangle = PIXI.math.Rectangle;
                BitmapText = PIXI.extras.BitmapText;
            }
            else {
                Rectangle = PIXI.Rectangle;
                BitmapText = PIXI.BitmapText;
            }
            //parse letters
            var letters = resource.data.getElementsByTagName('char');
            for (var i = 0; i < letters.length; i++) {
                var charCode = parseInt(letters[i].getAttribute('id'), 10);
                var textureRect = new Rectangle(parseInt(letters[i].getAttribute('x'), 10) + texture.frame.x, parseInt(letters[i].getAttribute('y'), 10) + texture.frame.y, parseInt(letters[i].getAttribute('width'), 10), parseInt(letters[i].getAttribute('height'), 10));
                data.chars[charCode] = {
                    xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                    yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
                    xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
                    kerning: {},
                    texture: new PIXI.Texture(texture.baseTexture, textureRect)
                };
            }
            //parse kernings
            var kernings = resource.data.getElementsByTagName('kerning');
            for (i = 0; i < kernings.length; i++) {
                var first = parseInt(kernings[i].getAttribute('first'), 10);
                var second = parseInt(kernings[i].getAttribute('second'), 10);
                var amount = parseInt(kernings[i].getAttribute('amount'), 10);
                data.chars[second].kerning[first] = amount;
            }
            //resource.bitmapFont = data;
            // I'm leaving this as a temporary fix so we can test the bitmap fonts in v3
            // but it's very likely to change
            BitmapText.fonts[data.font] = data;
        };
        Theme.prototype.getSkin = function (skinId) {
            var skin = this._theme[skinId] || this._theme['default'];
            return skin;
        };
        Theme.prototype.applySkin = function (settings) {
            var skinId = settings['skin'] || settings['component'];
            var skin = this._theme[skinId] || this._theme['default'];
            EZGUI.utils.extendJSON(settings, skin);
            this.fixLimits(settings, skin);
            return settings;
        };
        Theme.imageComponents = ['bg', 'corner', 'line', 'side', 'image', 'checkmark'];
        Theme.imageStates = ['default', 'hover', 'down', 'checked'];
        Theme.imageVariants = ['', 't', 'r', 'b', 'l', 'left', 'right', 'tl', 'tr', 'bl', 'br'];
        return Theme;
    })();
    EZGUI.Theme = Theme;
})(EZGUI || (EZGUI = {}));
/// <reference path="tween/tween.ts" />
/// <reference path="utils/eventhandler.ts" />
/// <reference path="compatibility.ts" />
/// <reference path="theme.ts" />
var EZGUI;
(function (EZGUI) {
    EZGUI.VERSION = '0.3.0 beta';
    //export var states = ['default', 'hover', 'down', 'checked'];
    EZGUI.tilingRenderer;
    EZGUI.dragging;
    EZGUI.dsx;
    EZGUI.dsy;
    EZGUI.startDrag = { x: null, y: null, t: null };
    EZGUI.focused;
    EZGUI.game;
    EZGUI.themes = {};
    EZGUI.components = {};
    EZGUI.radioGroups = [];
    EZGUI.EventsHelper = new EZGUI.utils.EventHandler();
    /**
     * generic settings object
     * accepted parameters
     * crossOrigin : true/false
     */
    EZGUI.settings = {
        crossOrigin: false
    };
    var _components = {};
    function registerComponents(cpt, id) {
        id = id || cpt.name;
        _components[id] = cpt;
    }
    EZGUI.registerComponents = registerComponents;
    function create(settings, theme) {
        var t = settings.component || 'default';
        var cptConstructor = _components[settings.component] || _components['default'];
        var component;
        if (cptConstructor) {
            component = new cptConstructor(settings, theme);
        }
        return component;
    }
    EZGUI.create = create;
    function tween_animate() {
        requestAnimationFrame(tween_animate);
        EZGUI.Tween.update();
    }
    tween_animate();
    function showHeader() {
        //use https://github.com/daniellmb/console.style ?
        var isChrome = (navigator.userAgent.indexOf("Chrome") != -1);
        var isFirefox = (navigator.userAgent.indexOf("Firefox") != -1);
        var isIE = (navigator.userAgent.indexOf("MSIE") != -1);
        if (isChrome) {
            //console.log('%cEZGUI', 'font-size:60px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿
            console.log('%cEZ%cGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We %c❤%c HTML5]', 'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-weight:bold;font-size:20px;color:#000;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-size:12px;font-weight:bold; color: #b33;', 'font-size:12px;font-weight:bold; color: #000;', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050', 'font-size:12px;font-weight:bold; color: #f00;background:#f18050', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050');
            return;
        }
        if (isFirefox) {
            console.log('%cEZGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We ❤ HTML5]', 'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb', 'font-size:12px;font-weight:bold; color: #b33;', 'font-size:12px;font-weight:bold; color: #000;', 'font-size:12px;font-weight:bold; color: #fff;background:#f18050');
            return;
        }
        if (window['console']) {
            console.log(' EZGUI v' + EZGUI.VERSION + '   [We <3 HTML5] | http://ezgui.ezelia.com');
        }
    }
    showHeader();
})(EZGUI || (EZGUI = {}));
/// <reference path="ezgui.ts" />
var EZGUI;
(function (EZGUI) {
    var MultistateSprite = (function (_super) {
        __extends(MultistateSprite, _super);
        function MultistateSprite(texture, states) {
            _super.call(this, texture);
            this.stateTextures = {};
            this.stateTextures['default'] = texture;
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture) {
                        this.stateTextures[s] = tx;
                    }
                }
            }
        }
        MultistateSprite.prototype.addState = function (id, texture) {
            this.stateTextures[id] = texture;
        };
        MultistateSprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            var sprite = this;
            if (!sprite.stateTextures[state])
                return;
            if (sprite.texture) {
                sprite.texture = sprite.stateTextures[state];
            }
            else {
                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];
            }
            if (sprite._tilingTexture)
                sprite._tilingTexture = sprite.stateTextures[state];
        };
        return MultistateSprite;
    })(PIXI.Sprite);
    EZGUI.MultistateSprite = MultistateSprite;
})(EZGUI || (EZGUI = {}));
/// <reference path="ezgui.ts" />
/// <reference path="../lib/pixi.d.ts" />
/// <reference path="multistatesprite.ts" />
/// <reference path="compatibility.ts" />
var EZGUI;
(function (EZGUI) {
    var GUIObject = (function (_super) {
        __extends(GUIObject, _super);
        function GUIObject() {
            _super.call(this);
            this.container = new EZGUI.Compatibility.GUIContainer();
            this.addChild(this.container);
        }
        Object.defineProperty(GUIObject.prototype, "Id", {
            get: function () {
                return this.guiID;
            },
            set: function (val) {
                this.guiID = val;
            },
            enumerable: true,
            configurable: true
        });
        GUIObject.prototype.setupEvents = function () {
            var _this = this;
            //var _this:any = this;
            _this.interactive = true;
            _this.mouseover = function (event) {
                //console.log('mouseover ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                //console.log('hover ', guiObj.guiID);
                _this._over = true;
                //guiObj.setState('hover');
                _this.emit('ezgui:mouseover', event, _this);
            };
            _this.mouseout = function (event) {
                //console.log('mouseout ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;
                _this._over = false;
                //guiObj.setState('out');
                _this.emit('ezgui:mouseout', event, _this);
            };
            //handle drag stuff
            _this.mousedown = _this.touchstart = function (event) {
                //console.log('mousedown ', _this.guiID);
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var pos = EZGUI.utils.getRealPos(event);
                EZGUI.startDrag.x = pos.x;
                EZGUI.startDrag.y = pos.y;
                EZGUI.startDrag.t = Date.now();
                var data = event.data || event;
                _this.emit('ezgui:mousedown', event, _this);
                //event.stopped = true;
            };
            _this.mouseup = _this.mouseupoutside = _this.touchend = _this.touchendoutside = function (event) {
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var data = event.data || event;
                _this.emit('ezgui:mouseup', event, _this);
                var pos = EZGUI.utils.getRealPos(event);
                if (EZGUI.utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                    _this.emit('ezgui:click', event, _this);
                    if (EZGUI.focused && _this != EZGUI.focused && EZGUI.focused.emit)
                        EZGUI.focused.emit('ezgui:blur');
                    EZGUI.focused = _this;
                    EZGUI.focused.emit('ezgui:focus');
                    event.stopped = true;
                }
            };
            _this.mousemove = _this.touchmove = function (event) {
                if (_this._over) {
                    if (_this.canTrigger(event, _this)) {
                        _this._over = false;
                        _this.mouseover(event);
                    }
                    else {
                        _this.mouseout(event);
                    }
                }
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var data = event.data || event;
                _this.emit('ezgui:mousemove', event, _this);
            };
            _this.click = _this.tap = function (event) {
                //console.log('click', _this.guiID);
                //var pos = utils.getRealPos(event);
                //if (utils.distance(pos.x, pos.y, _this.startDrag.x, _this.startDrag.y) > 4) return;
                //if (guiObj.canTrigger(event, guiObj)) guiObj.emit('ezgui:click', event);
            };
            if (_this.phaserGroup) {
                _this.phaserGroup.inputEnabled = true;
                _this.phaserGroup.events.onInputOver.add(function (target, event) {
                    _this._over = true;
                    //console.log('ezgui:mouseover', event);
                    _this.emit('ezgui:mouseover', event, _this);
                }, this);
                _this.phaserGroup.events.onInputOut.add(function (target, event) {
                    _this._over = false;
                    _this.emit('ezgui:mouseout', event, _this);
                    //console.log('ezgui:mouseout', event);
                }, this);
                _this.phaserGroup.events.onInputDown.add(function (target, event) {
                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }
                    var pos = EZGUI.utils.getRealPos(event);
                    EZGUI.startDrag.x = pos.x;
                    EZGUI.startDrag.y = pos.y;
                    EZGUI.startDrag.t = Date.now();
                    _this.emit('ezgui:mousedown', event, _this);
                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mousedown', event, _this);
                    }
                    //    
                    //console.log('ezgui:mousedown', event);
                }, this);
                _this.phaserGroup.events.onInputUp.add(function (target, event) {
                    //if (!_this.canTrigger(event, _this)) {
                    //    return;
                    //}
                    //_this.emit('ezgui:mouseup', event);
                    _this.emit('ezgui:mouseup', event, _this);
                    var pos = EZGUI.utils.getRealPos(event);
                    if (EZGUI.utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                        _this.emit('ezgui:click', event, _this);
                        if (EZGUI.focused && _this != EZGUI.focused && EZGUI.focused.emit)
                            EZGUI.focused.emit('ezgui:blur');
                        EZGUI.focused = _this;
                        EZGUI.focused.emit('ezgui:focus');
                    }
                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mouseup', event, _this);
                    }
                }, this);
                //Phaser.GAMES[0].input.moveCallback = function (pointer, x, y) {
                //    console.log(pointer, x, y);
                //}
                Phaser.GAMES[0].input.mouse.mouseMoveCallback = function (event) {
                    if (_this._over) {
                        if (_this.canTrigger(event, _this)) {
                            _this._over = true;
                            _this.emit('ezgui:mouseover', event, _this);
                        }
                        else {
                            _this._over = false;
                            _this.emit('ezgui:mouseout', event, _this);
                        }
                    }
                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }
                    var data = event.data || event;
                    _this.emit('ezgui:mousemove', event, _this);
                };
            }
        };
        GUIObject.prototype.originalAddChildAt = function (child, index) {
            return _super.prototype.addChildAt.call(this, child, index);
        };
        GUIObject.prototype.originalAddChild = function (child) {
            return this.originalAddChildAt(child, this.children.length);
        };
        GUIObject.prototype.addChild = function (child) {
            if (child instanceof EZGUI.GUISprite) {
                //return this.container.addChild(child);
                child.guiParent = this;
                if (child.phaserGroup)
                    return this.container.addChild(child.phaserGroup);
                else
                    return this.container.addChild(child);
            }
            else {
                return _super.prototype.addChild.call(this, child);
            }
        };
        GUIObject.prototype.removeChild = function (child) {
            if (child instanceof EZGUI.GUISprite) {
                child.guiParent = null;
                if (child.phaserGroup)
                    return this.container.removeChild(child.phaserGroup);
                else
                    return this.container.removeChild(child);
            }
            else {
                return _super.prototype.removeChild.call(this, child);
            }
        };
        GUIObject.prototype.mouseInObj = function (event, guiSprite) {
            var data = event.data || event;
            var clientpos = EZGUI.utils.getClientXY(event);
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;
            var absPos = EZGUI.utils.getAbsPos(guiSprite);
            if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height)
                return false;
            return true;
        };
        GUIObject.prototype.canTrigger = function (event, guiSprite) {
            var data = event.data || event;
            var clientpos = EZGUI.utils.getClientXY(event);
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            if (!origEvt.target.getBoundingClientRect)
                return false;
            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;
            //var absPos = utils.getAbsPos(guiSprite);
            //if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height) return false;
            //check if click is in visible zone
            var masked = EZGUI.utils.isMasked(px, py, guiSprite);
            return !masked;
        };
        GUIObject.prototype.on = function (event, fn, context) {
            return _super.prototype.on.call(this, 'ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        };
        GUIObject.prototype.off = function (event, fn, context) {
            if (EZGUI.Compatibility.PIXIVersion == 2) {
                if (fn == null && context == null) {
                    this._listeners['ezgui:' + event] = [];
                    return;
                }
            }
            return _super.prototype.off.call(this, 'ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        };
        GUIObject.prototype.bindChildren = function (event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                child.on(event, fn);
            }
        };
        GUIObject.prototype.bindChildrenOfType = function (_type, event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                if (child instanceof _type)
                    child.on(event, fn);
            }
        };
        GUIObject.prototype.unbindChildren = function (event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                child.off(event, fn);
            }
        };
        GUIObject.prototype.unbindChildrenOfType = function (_type, event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child = this.container.children[i];
                if (child.guiSprite)
                    child = child.guiSprite;
                if (child instanceof _type)
                    child.off(event, fn);
            }
        };
        GUIObject.prototype.preUpdate = function () {
        };
        GUIObject.prototype.update = function () {
        };
        GUIObject.prototype.postUpdate = function () {
        };
        GUIObject.prototype.destroy = function () {
            if (this.phaserGroup) {
                this.phaserGroup.destroy();
            }
            if (this.parent && this.parent.removeChild)
                this.parent.removeChild(this);
            delete EZGUI.components[this.guiID];
        };
        return GUIObject;
    })(EZGUI.Compatibility.GUIDisplayObjectContainer);
    EZGUI.GUIObject = GUIObject;
    EZGUI.registerComponents(EZGUI.GUISprite, 'default');
})(EZGUI || (EZGUI = {}));
/// <reference path="guiobject.ts" />
var EZGUI;
(function (EZGUI) {
    var GUISprite = (function (_super) {
        __extends(GUISprite, _super);
        //private savedSettings;
        function GUISprite(settings, themeId) {
            _super.call(this);
            this.settings = settings;
            this.themeId = themeId;
            this.dragXInterval = [-Infinity, +Infinity];
            this.dragYInterval = [-Infinity, +Infinity];
            //this.container = new Compatibility.GUIContainer();
            //this.addChild(this.container);
            this.userData = settings.userData;
            if (themeId instanceof EZGUI.Theme)
                this.theme = themeId;
            else
                this.theme = EZGUI.themes[themeId];
            if (!this.theme || !this.theme.ready) {
                console.error('[EZGUI ERROR]', 'Theme is not ready, nothing to display');
                this.theme = new EZGUI.Theme({});
            }
            //this.savedSettings = JSON.parse(JSON.stringify(_settings));
            //this._settings = this.theme.applySkin(_settings);
            //this.parseSettings();
            //this.draw();
            //this.drawText();
            //this.setupEvents();
            //this.handleEvents();
            this.rebuild();
        }
        Object.defineProperty(GUISprite.prototype, "text", {
            //get settings(): string {
            //    return this._settings;
            //}
            get: function () {
                if (this.textObj)
                    return this.textObj.text;
            },
            set: function (val) {
                if (this.textObj) {
                    if (EZGUI.Compatibility.PIXIVersion == 3) {
                        this.textObj.text = val;
                    }
                    else {
                        this.textObj.setText(val);
                    }
                    if (this._settings.anchor) {
                        this.textObj.position.x = 0;
                        this.textObj.position.y = 0;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            //fake anchor for bitmap font
                            this.textObj.position.x -= this.textObj.width / 2;
                            this.textObj.position.y -= this.textObj.height / 2;
                        }
                    }
                    else {
                        this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                        this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GUISprite.prototype.erase = function () {
            this.container.children.length = 0; //clear all children
            this.children.length = 0;
            this.rootSprite = undefined;
        };
        GUISprite.prototype.rebuild = function () {
            this.erase();
            var _settings = JSON.parse(JSON.stringify(this.settings));
            this._settings = this.theme.applySkin(_settings);
            this.parseSettings();
            this.draw();
            this.drawText();
            this.setupEvents();
            this.handleEvents();
        };
        GUISprite.prototype.parsePercentageValue = function (str) {
            if (typeof str != 'string')
                return NaN;
            var val = NaN;
            var percentToken = str.split('%');
            if (percentToken.length == 2 && percentToken[1] == '') {
                val = parseFloat(percentToken[0]);
            }
            return val;
        };
        GUISprite.prototype.parseSettings = function () {
        };
        GUISprite.prototype.prepareChildSettings = function (settings) {
            var padTop = this._settings['padding-top'] || this._settings.padding || 0;
            var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
            var padBottom = this._settings['padding-bottom'] || this._settings.padding || 0;
            var padRight = this._settings['padding-right'] || this._settings.padding || 0;
            var padX = padRight + padLeft;
            var padY = padTop + padBottom;
            //var _psettings = this._settings;
            var _settings = JSON.parse(JSON.stringify(settings));
            if (_settings) {
                //support percentage values for width and height
                if (typeof _settings.width == 'string') {
                    var p = this.parsePercentageValue(_settings.width);
                    if (p != NaN)
                        _settings.width = (this.width - padX) * p / 100;
                }
                if (typeof _settings.height == 'string') {
                    var p = this.parsePercentageValue(_settings.height);
                    if (p != NaN)
                        _settings.height = (this.height - padY) * p / 100;
                }
                if (typeof _settings.position == 'object') {
                    if (typeof _settings.position.x == 'string') {
                        var px = this.parsePercentageValue(_settings.position.x);
                        if (px != NaN)
                            _settings.position.x = (this.width - padX) * px / 100;
                    }
                    if (typeof _settings.position.y == 'string') {
                        var py = this.parsePercentageValue(_settings.position.y);
                        if (py != NaN)
                            _settings.position.y = (this.height - padY) * py / 100;
                    }
                }
            }
            return _settings;
        };
        GUISprite.prototype.setDraggable = function (val) {
            if (val === void 0) { val = true; }
            if (val)
                this.draggable = this;
            else
                this.draggable = undefined;
        };
        GUISprite.prototype.handleEvents = function () {
            var _this = this;
            //var _this = this;
            this.draghandle = _this;
            if (_this._settings.draggable == true) {
                this.draggable = _this;
            }
            if (_this._settings.draggable == 'container') {
                this.draggable = _this.container;
            }
            if (_this._settings.dragX === false) {
                this.dragConstraint = 'y';
            }
            if (_this._settings.dragY === false) {
                this.dragConstraint = 'x';
            }
            //guiObj.on('mouseover', function () {
            //    guiObj.setState('hover');
            //});
            //guiObj.on('mouseout', function () {
            //    //EZGUI.dragging = null;
            //    guiObj.setState('out');
            //});
            //handle drag stuff
            _this.on('mousedown', function (event) {
                if (_this.draggable) {
                    if (_this.mouseInObj(event, _this.draghandle)) {
                        //if PIXI 2 use event else use event.data
                        var data = event.data || event;
                        //guiObj.alpha = 0.9;
                        EZGUI.dragging = _this;
                        //console.log('set dragging', EZGUI.dragging.guiID);
                        var pos = EZGUI.utils.getRealPos(event);
                        EZGUI.dsx = pos.x;
                        EZGUI.dsy = pos.y;
                        EZGUI.startDrag.x = pos.x;
                        EZGUI.startDrag.y = pos.y;
                    }
                }
                //only work in PIXI 3 ?
                //guiObj.setState('click');
            });
            _this.on('mouseup', function (event) {
                //guiObj.alpha = 1
                EZGUI.dragging = null;
                _this.setState('default');
            });
            _this.on('mousemove', function (event) {
                if (EZGUI.dragging) {
                    var dg = _this.draggable ? _this.draggable.guiID : '';
                }
                var PhaserDrag = typeof Phaser != 'undefined' && EZGUI.dragging;
                if (_this.draggable && EZGUI.dragging == _this || PhaserDrag) {
                    var pos = EZGUI.utils.getRealPos(event);
                    var dragObg = EZGUI.dragging;
                    var draggable = EZGUI.dragging.draggable;
                    var dpos = EZGUI.utils.getAbsPos(draggable);
                    if (dragObg.dragConstraint != 'y') {
                        var nextPos = draggable.position.x + pos.x - EZGUI.dsx;
                        if (nextPos >= dragObg.dragXInterval[0] && nextPos <= dragObg.dragXInterval[1])
                            draggable.position.x = nextPos;
                    }
                    if (dragObg.dragConstraint != 'x') {
                        var nextPos = draggable.position.y + pos.y - EZGUI.dsy;
                        if (nextPos >= dragObg.dragYInterval[0] && nextPos <= dragObg.dragYInterval[1])
                            draggable.position.y = nextPos;
                    }
                    EZGUI.dsx = pos.x;
                    EZGUI.dsy = pos.y;
                }
            });
        };
        /**
         * Main draw function
         */
        GUISprite.prototype.draw = function () {
            var settings = this._settings;
            if (settings) {
                this.guiID = settings.id;
                //add reference to component
                if (this.guiID)
                    EZGUI.components[this.guiID] = this;
                for (var s = 0; s < EZGUI.Theme.imageStates.length; s++) {
                    var stateId = EZGUI.Theme.imageStates[s];
                    var container = new EZGUI.Compatibility.GUIContainer();
                    var controls = this.createVisuals(settings, stateId);
                    for (var i = 0; i < controls.length; i++) {
                        container.addChild(controls[i]);
                    }
                    var texture = EZGUI.Compatibility.createRenderTexture(settings.width, settings.height);
                    texture.render(container);
                    if (!this.rootSprite) {
                        this.rootSprite = new EZGUI.MultistateSprite(texture);
                        this.addChild(this.rootSprite);
                    }
                    else {
                        this.rootSprite.addState(stateId, texture);
                    }
                }
                var padding = settings.padding || 0;
                if (settings.position) {
                    this.position.x = settings.position.x;
                    this.position.y = settings.position.y;
                }
                else {
                    this.position.x = 0;
                    this.position.y = 0;
                }
                //this.container = new Compatibility.GUIContainer();
                //this.addChild(this.container);
                if (settings.children) {
                    for (var i = 0; i < settings.children.length; i++) {
                        var btnObj = this.prepareChildSettings(settings.children[i]); // JSON.parse(JSON.stringify(settings.children[i]));
                        var child = this.createChild(btnObj, i);
                        if (!child)
                            continue;
                        //if (child.phaserGroup) this.container.addChild(child.phaserGroup);
                        //else this.container.addChild(child);
                        //force call original addChild to prevent conflict with local addchild
                        _super.prototype.addChild.call(this, child);
                        child.guiParent = this;
                    }
                }
                if (this._settings.anchor) {
                    this.rootSprite.anchor.x = this._settings.anchor.x;
                    this.rootSprite.anchor.y = this._settings.anchor.y;
                    this.container.position.x -= this.rootSprite.width * this._settings.anchor.x;
                    this.container.position.y -= this.rootSprite.height * this._settings.anchor.y;
                    this.position.x += this.rootSprite.width * this._settings.anchor.x;
                    this.position.y += this.rootSprite.height * this._settings.anchor.y;
                }
                //tint color
                if (this._settings.color) {
                    var pixiColor = EZGUI.utils.ColorParser.parseToPixiColor(this._settings.color);
                    if (pixiColor >= 0) {
                        this.rootSprite.tint = pixiColor;
                    }
                }
                //move container to top
                this.addChild(this.container);
                this.sortChildren();
            }
        };
        GUISprite.prototype.sortChildren = function () {
            if (!this.container)
                return;
            var comparator = function (a, b) {
                if (a.guiSprite)
                    a = a.guiSprite;
                if (b.guiSprite)
                    b = b.guiSprite;
                a._settings.z = a._settings.z || 0;
                b._settings.z = b._settings.z || 0;
                return a._settings.z - b._settings.z;
            };
            this.container.children.sort(comparator);
        };
        /**
         * Text draw function
         * shared by all components
         */
        GUISprite.prototype.drawText = function () {
            if (this._settings && this._settings.text != undefined && this.rootSprite) {
                //var settings = this.theme.applySkin(this._settings);
                var settings = this._settings;
                if (EZGUI.Compatibility.BitmapText.fonts && EZGUI.Compatibility.BitmapText.fonts[settings.font.family]) {
                    this.textObj = new EZGUI.Compatibility.BitmapText(this._settings.text, { font: settings.font.size + ' ' + settings.font.family });
                    var pixiColor = EZGUI.utils.ColorParser.parseToPixiColor(settings.font.color);
                    if (pixiColor >= 0) {
                        this.textObj.tint = pixiColor;
                        this.textObj.dirty = true;
                    }
                }
                else {
                    var style = { font: settings.font.size + ' ' + settings.font.family, fill: settings.font.color };
                    for (var s in settings.font) {
                        if (!style[s])
                            style[s] = settings.font[s];
                    }
                    this.textObj = new PIXI.Text(this._settings.text, style);
                }
                //text.height = this.height;
                this.textObj.position.x = 0; //(this._settings.width - this.textObj.width) / 2;
                this.textObj.position.y = 0; //(this._settings.height - this.textObj.height) / 2;
                if (this._settings.anchor) {
                    this.textObj.position.x = 0;
                    this.textObj.position.y = 0;
                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = this._settings.anchor.x;
                        this.textObj.anchor.y = this._settings.anchor.y;
                    }
                    else {
                        //fake anchor for bitmap font
                        this.textObj.position.x -= this.textObj.width / 2;
                        this.textObj.position.y -= this.textObj.height / 2;
                    }
                }
                else {
                    this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                    this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = 0;
                        this.textObj.anchor.y = 0;
                    }
                }
                this.rootSprite.addChild(this.textObj);
            }
        };
        GUISprite.prototype.createChild = function (childSettings, order) {
            if (!childSettings)
                return null;
            var i = order;
            var pos = childSettings.position;
            if (typeof pos == 'string') {
                var parts = pos.split(' ');
                var pos1 = parts[0];
                var pos2 = parts[1];
                //normalize pos
                if (parts[0] == parts[1]) {
                    pos2 = undefined;
                }
                if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                    pos1 = 'center';
                    pos2 = 'undefined';
                }
                if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                    pos1 = parts[1];
                    pos2 = parts[0];
                }
                if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                    pos2 = pos1;
                    pos1 = 'left';
                }
                var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                childSettings.position = { x: 0, y: 0 };
                if (pos1 == 'center') {
                    //childSettings.anchor = { x: 0.5, y: 0.5 };
                    childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                    childSettings.position.y = (this._settings.height - childSettings.height + padTop) / 2;
                }
                switch (pos1) {
                    case 'center':
                        childSettings.position.y = (this._settings.height - childSettings.height + padTop) / 2;
                        if (pos2 === undefined)
                            childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                        break;
                    case 'bottom':
                        childSettings.position.y = this._settings.height - childSettings.height - this._settings.padding;
                        break;
                }
                switch (pos2) {
                    case 'center':
                        childSettings.position.x = (this._settings.width - childSettings.width) / 2;
                        break;
                    case 'right':
                        childSettings.position.x = this._settings.width - childSettings.width - this._settings.padding;
                        break;
                }
            }
            var child = EZGUI.create(childSettings, this.theme);
            return child;
        };
        /**
         *
         */
        GUISprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child instanceof EZGUI.MultistateSprite) {
                    child.setState(state);
                }
            }
        };
        GUISprite.prototype.animatePosTo = function (x, y, time, easing, callback) {
            if (time === void 0) { time = 1000; }
            if (easing === void 0) { easing = EZGUI.Easing.Linear.None; }
            easing = easing || EZGUI.Easing.Linear.None;
            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this.position).to({ x: x, y: y }, time).easing(easing).onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this.position).to({ x: x, y: y }, time).easing(easing);
            }
            tween.start();
            return tween;
        };
        GUISprite.prototype.animateSizeTo = function (w, h, time, easing, callback) {
            if (time === void 0) { time = 1000; }
            if (easing === void 0) { easing = EZGUI.Easing.Linear.None; }
            easing = easing || EZGUI.Easing.Linear.None;
            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this).to({ width: w, height: h }, time).easing(easing).onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this).to({ width: w, height: h }, time).easing(easing);
            }
            tween.start();
            return tween;
        };
        /**
         *
         */
        GUISprite.prototype.getFrameConfig = function (config, state) {
            var cfg = JSON.parse(JSON.stringify(config)); //if (cfg.texture instanceof PIXI.Texture) return cfg;
            if (typeof cfg == 'string') {
                cfg = { default: cfg };
            }
            var src = cfg[state] == null ? cfg['default'] : cfg[state];
            var texture;
            if (src.trim() != '')
                texture = PIXI.Texture.fromFrame(src);
            cfg.texture = texture;
            return cfg;
        };
        GUISprite.prototype.getComponentConfig = function (component, part, side, state) {
            //var ctype = this.theme[type] || this.theme['default'];
            var skin = this.theme.getSkin(component);
            if (!skin)
                return;
            var scale = (skin.scale == undefined) ? 1 : skin.scale;
            var rotation = 0;
            //get configuration, if explicit configuration is defined then use it otherwise use theme config
            //var hasSide = this.settings[component + '-' + side] || ctype[component + '-' + side];
            var cfg = this._settings[part + '-' + side] || skin[part + '-' + side] || this._settings[part] || skin[part];
            if (!cfg)
                return;
            if (skin[part] && !skin[part + '-' + side]) {
                switch (side) {
                    case 'tr':
                    case 'r':
                        rotation = 90 * Math.PI / 180;
                        break;
                    case 'bl':
                    case 'l':
                        rotation = -90 * Math.PI / 180;
                        break;
                    case 'br':
                    case 'b':
                        rotation = 180 * Math.PI / 180;
                        break;
                }
            }
            cfg = this.getFrameConfig(cfg, state);
            cfg.rotation = cfg.rotation != undefined ? cfg.rotation : rotation;
            cfg.scale = cfg.scale != undefined ? cfg.scale : scale;
            var bgPadding = this._settings['bgPadding'] != undefined ? this._settings['bgPadding'] : skin['bgPadding'];
            cfg.bgPadding = bgPadding != undefined ? bgPadding : 0;
            //cfg.hoverTexture = cfg.hover ? PIXI.Texture.fromFrame(cfg.hover) : cfg.texture;
            return cfg;
        };
        GUISprite.prototype.createThemeCorner = function (settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);
            if (!cfg || !cfg.texture)
                return;
            //var ctype = this.theme[type] || this.theme['default'];
            //var skin = this.theme.getSkin(component);
            var skin = settings;
            var hasSide = this._settings[part + '-' + side] || skin[part + '-' + side];
            //var sprite = new MultistateSprite(cfg.texture, cfg.textures);
            var sprite = new PIXI.Sprite(cfg.texture);
            sprite.rotation = cfg.rotation;
            sprite.scale.x = cfg.scale;
            sprite.scale.y = cfg.scale;
            switch (side) {
                case 'tl':
                    sprite.position.x = 0;
                    sprite.position.y = 0;
                    break;
                case 'tr':
                    sprite.position.x = settings.width;
                    sprite.position.y = 0;
                    break;
                case 'bl':
                    sprite.position.x = 0;
                    sprite.position.y = settings.height;
                    break;
                case 'br':
                    sprite.position.x = settings.width;
                    sprite.position.y = settings.height;
                    break;
            }
            //needed for specific corner sides : corner-tl corner-tr corner-bl corner-br
            if (hasSide) {
                if (sprite.position.y != 0)
                    sprite.anchor.y = 1;
                if (sprite.position.x != 0)
                    sprite.anchor.x = 1;
            }
            return sprite;
        };
        GUISprite.prototype.createThemeSide = function (settings, side, state) {
            var component = settings.component;
            var cfg = this.getComponentConfig(component, side, '', state);
            if (!cfg || !cfg.texture)
                return;
            //var sprite = new MultistateSprite(cfg.texture, cfg.textures);
            var sprite = new PIXI.Sprite(cfg.texture);
            //sprite.rotation = cfg.rotation;
            sprite.scale.x = cfg.scale;
            sprite.scale.y = cfg.scale;
            sprite.height = settings.height;
            switch (side) {
                case 'left':
                    sprite.position.x = 0;
                    sprite.position.y = 0;
                    break;
                case 'right':
                    sprite.position.x = settings.width;
                    sprite.position.y = 0;
                    break;
            }
            return sprite;
        };
        GUISprite.prototype.createThemeBorder = function (settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);
            if (!cfg || !cfg.texture)
                return;
            var tlCornerCfg = this.getComponentConfig(component, 'corner', 'tl', state);
            var blCornerCfg = this.getComponentConfig(component, 'corner', 'bl', state);
            if (!tlCornerCfg || !tlCornerCfg.texture)
                return;
            if (!blCornerCfg || !blCornerCfg.texture)
                return;
            //var ctype = this.theme[type] || this.theme['default'];
            //var ctype = this.theme.getSkin(component);
            var ctype = settings;
            var hasSide = this._settings[part + '-' + side] || ctype[part + '-' + side];
            var cwidth, cheight;
            var twidth, theight;
            switch (side) {
                case 't':
                case 'b':
                    cwidth = tlCornerCfg.texture.width * tlCornerCfg.scale;
                    cheight = blCornerCfg.texture.height * blCornerCfg.scale;
                    twidth = (settings.width - (cwidth * 2)) * 1 / cfg.scale;
                    theight = cfg.texture.height;
                    break;
                case 'r':
                case 'l':
                    cwidth = tlCornerCfg.texture.height * tlCornerCfg.scale;
                    twidth = (settings.height - (cwidth * 2)) * 1 / cfg.scale;
                    theight = cfg.texture.height;
                    if (hasSide) {
                        cheight = tlCornerCfg.texture.width * tlCornerCfg.scale;
                        twidth = tlCornerCfg.texture.width;
                        theight = (settings.height - (cwidth * 2)) * 1 / cfg.scale;
                    }
                    break;
            }
            //var cwidth = cornerCfg.texture.width * cornerCfg.scale;
            //var line: any = new MultistateTilingSprite(cfg.texture, twidth, theight, cfg.textures);
            var line = new EZGUI.Compatibility.TilingSprite(cfg.texture, twidth, theight);
            //phaser 2.4 compatibility /////////////////////////////////
            line.fixPhaser24();
            switch (side) {
                case 't':
                    line.position.x = cwidth;
                    line.position.y = 0;
                    break;
                case 'r':
                    line.position.y = cwidth;
                    if (!hasSide) {
                        line.position.x = settings.width - cwidth;
                        line.anchor.x = 0;
                        line.anchor.y = 1;
                    }
                    else {
                        line.position.x = settings.width;
                        line.anchor.x = 1;
                        line.anchor.y = 0;
                    }
                    break;
                case 'b':
                    line.position.x = cwidth;
                    if (!hasSide) {
                        line.position.y = settings.height - cwidth;
                        line.anchor.x = 1;
                        line.anchor.y = 1;
                    }
                    else {
                        line.position.y = settings.height - cheight;
                    }
                    break;
                case 'l':
                    line.position.y = cwidth;
                    if (!hasSide) {
                        line.anchor.x = 1;
                        line.anchor.y = 0;
                    }
                    else {
                        line.anchor.x = 0;
                        line.anchor.y = 0;
                    }
                    break;
            }
            line.scale.x = cfg.scale;
            line.scale.y = cfg.scale;
            line.rotation = cfg.rotation; //180 * Math.PI / 180;
            return line;
        };
        GUISprite.prototype.createThemeTilableBackground = function (settings, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);
            if (!cfg || !cfg.texture)
                return;
            //cfg.bgPadding = 0;
            //var bg: any = new MultistateTilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2, cfg.textures);
            var bg = new EZGUI.Compatibility.TilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2);
            //phaser 2.4 compatibility /////////////////////////////////
            bg.fixPhaser24();
            ////////////////////////////////////////////////////////////
            bg.position.x = cfg.bgPadding;
            bg.position.y = cfg.bgPadding;
            if (settings.bgTiling) {
                if (settings.bgTiling == "x") {
                    bg.tileScale.y = (settings.height - cfg.bgPadding * 2) / cfg.texture.height;
                }
                if (settings.bgTiling == "y") {
                    bg.tileScale.x = (settings.width - cfg.bgPadding * 2) / cfg.texture.width;
                }
            }
            return bg;
        };
        GUISprite.prototype.createThemeBackground = function (settings, state, leftSide, rightSide) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);
            if (!cfg || !cfg.texture)
                return;
            //cfg.bgPadding = 0;
            //var bg: any = new MultistateSprite(cfg.texture, cfg.textures);
            var bg = new PIXI.Sprite(cfg.texture);
            bg.position.x = leftSide.width;
            bg.position.y = 0;
            bg.scale.x = cfg.scale;
            bg.scale.y = cfg.scale;
            bg.width = settings.width - leftSide.width;
            bg.height = settings.height;
            return bg;
        };
        GUISprite.prototype.createThemeImage = function (settings, state, imagefield) {
            if (imagefield === void 0) { imagefield = 'image'; }
            var component = settings.skin || settings.component || 'default';
            //var ctype = this.theme[type] || this.theme['default'];
            var ctype = settings; //this.theme.getSkin(component);
            if (ctype[imagefield]) {
                var cfg = this.getFrameConfig(ctype[imagefield], state);
                //var img = new MultistateSprite(cfg.texture, cfg.textures);
                var img = new PIXI.Sprite(cfg.texture);
                img.width = settings.width;
                img.height = settings.height;
                return img;
            }
            return null;
        };
        GUISprite.prototype.createVisuals = function (settings, state) {
            if (settings.transparent === true)
                return [];
            //priority to image
            var img = this.createThemeImage(settings, state);
            if (img != null)
                return [img];
            var controls = [];
            var leftSide = this.createThemeSide(settings, 'left', state);
            var rightSide = this.createThemeSide(settings, 'right', state);
            var bg = this.createThemeTilableBackground(settings, state);
            if (bg)
                controls.push(bg);
            //if (!leftSide && !rightSide) {
            //    var bg = this.createThemeTilableBackground(settings, state);
            //    if (bg) controls.push(bg);
            //}
            //else {
            //    var bg = this.createThemeBackground(settings, state, leftSide);
            //    if (bg) controls.push(bg);
            //}
            if (leftSide) {
                controls.push(leftSide);
            }
            else {
                var tl = this.createThemeCorner(settings, 'corner', 'tl', state);
                if (tl)
                    controls.push(tl);
                var bl = this.createThemeCorner(settings, 'corner', 'bl', state);
                if (bl)
                    controls.push(bl);
                var lineLeft = this.createThemeBorder(settings, 'line', 'l', state);
                if (lineLeft)
                    controls.push(lineLeft);
            }
            if (rightSide) {
                controls.push(rightSide);
            }
            else {
                var tr = this.createThemeCorner(settings, 'corner', 'tr', state);
                if (tr)
                    controls.push(tr);
                var br = this.createThemeCorner(settings, 'corner', 'br', state);
                if (br)
                    controls.push(br);
                var lineRight = this.createThemeBorder(settings, 'line', 'r', state);
                if (lineRight)
                    controls.push(lineRight);
            }
            if (!leftSide && !rightSide) {
                var lineTop = this.createThemeBorder(settings, 'line', 't', state);
                if (lineTop)
                    controls.push(lineTop);
                var lineBottom = this.createThemeBorder(settings, 'line', 'b', state);
                if (lineBottom)
                    controls.push(lineBottom);
            }
            return controls;
        };
        return GUISprite;
    })(EZGUI.GUIObject);
    EZGUI.GUISprite = GUISprite;
    EZGUI.registerComponents(GUISprite, 'default');
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Input = (function (_super) {
            __extends(Input, _super);
            function Input(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Object.defineProperty(Input.prototype, "text", {
                get: function () {
                    if (this.domInput)
                        return this.domInput.value;
                    if (this.textObj)
                        return this.textObj.text;
                },
                set: function (val) {
                    if (this.domInput) {
                        var cpos = this.getCaretPosition();
                        this.domInput.value = val;
                        this.setCaretPosition(cpos);
                        this.setTextWithCaret(val);
                    }
                    if (this.textObj) {
                        this.textObj.text = val;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Input.prototype.setTextWithCaret = function (val, event) {
                if (event === void 0) { event = null; }
                if (this.textObj) {
                    if (EZGUI.Compatibility.PIXIVersion == 3) {
                        this.textObj.text = val;
                    }
                    else {
                        this.textObj.setText(val);
                    }
                    if (this._settings.anchor) {
                        this.textObj.position.x = 0;
                        this.textObj.position.y = 0;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            //fake anchor for bitmap font
                            this.textObj.position.x -= this.textObj.width / 2;
                            this.textObj.position.y -= this.textObj.height / 2;
                        }
                    }
                    else {
                        this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                        this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                        if (this.textObj.anchor) {
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                }
                //var cpos = this.getCaretPosition();
                //console.log('setting value ', val, cpos, val.substr(0, cpos - 1), val.substr(cpos));
                //this.domInput.value = val.substr(0, cpos - 1) + val.substr(cpos);
                this.textObj.position.x = 5;
                if (event)
                    this.emit('ezgui:change', event, this);
            };
            Input.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this.guiMask = { width: 0, height: 0 };
                var settings = this._settings;
                if (settings) {
                    var padding = settings.padding || 0;
                    var myMask = new PIXI.Graphics();
                    myMask.beginFill();
                    myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                    myMask.endFill();
                    this.addChild(myMask);
                    if (this._settings.anchor) {
                        myMask.position.x = this.container.position.x + padding;
                        myMask.position.y = this.container.position.y + padding;
                    }
                    this.container.mask = myMask;
                    this.guiMask.x = padding;
                    this.guiMask.y = padding;
                    this.guiMask.width = settings.width - padding * 2;
                    this.guiMask.height = settings.height - padding * 2;
                }
                //move container back to the top
                this.addChild(this.container);
            };
            Input.prototype.drawText = function () {
                this._settings.text = this._settings.text || '';
                _super.prototype.drawText.call(this);
                this.textObj.position.x = 5;
                this.container.addChild(this.textObj);
                //this.textObj
            };
            Input.prototype.setupEvents = function () {
                _super.prototype.setupEvents.call(this);
                if (!EZGUI.Device.isMobile && document && document.createElement) {
                    this.domInput = document.createElement("input");
                    this.domInput.id = this.guiID + "_input";
                    this.domInput.style.position = 'absolute';
                    this.domInput.style.top = '-100px';
                    this.domInput.value = '';
                    document.body.appendChild(this.domInput);
                    var _this = this;
                    this.domInput.addEventListener('input', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                        _this.setTextWithCaret(str, true);
                    });
                    this.domInput.addEventListener('keydown', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    });
                    this.domInput.addEventListener('keyup', function (event) {
                        var cpos = _this.getCaretPosition();
                        var str = _this.domInput.value;
                        _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    });
                }
            };
            Input.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                if (EZGUI.Device.isMobile) {
                    guiObj.on('click', function (event) {
                        _this.setTextWithCaret(prompt('', _this.text), event);
                    });
                    return;
                }
                guiObj.on('focus', function () {
                    if (_this.focused)
                        return;
                    _this.focused = true;
                    if (!_this.domInput)
                        return;
                    _this.domInput.value = _this.text;
                    _this.setCaretPosition(_this.domInput.value.length);
                    var cpos = _this.getCaretPosition();
                    var str = _this.domInput.value;
                    _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    _this.domInput.focus();
                });
                guiObj.on('blur', function () {
                    if (!_this.focused)
                        return;
                    _this.focused = false;
                    if (!_this.domInput)
                        return;
                    _this.setTextWithCaret(_this.domInput.value);
                    //_this.text = _this.text.substr(0, _this.text.length - 1);
                    _this.domInput.blur();
                });
            };
            Input.prototype.getCaretPosition = function () {
                var ctrl = this.domInput;
                if (!ctrl)
                    return 0;
                var CaretPos = 0;
                // IE Support
                if (document.selection) {
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                }
                else if (ctrl.selectionStart || ctrl.selectionStart == '0')
                    CaretPos = ctrl.selectionStart;
                return (CaretPos);
            };
            Input.prototype.setCaretPosition = function (pos) {
                var ctrl = this.domInput;
                if (!ctrl)
                    return 0;
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            };
            return Input;
        })(EZGUI.GUISprite);
        Component.Input = Input;
        EZGUI.registerComponents(Input, 'Input');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Label.prototype.setupEvents = function () {
                //clear events
            };
            Label.prototype.handleEvents = function () {
                //clear event handlers
            };
            Label.prototype.drawText = function () {
                this._settings.text = this._settings.text || '';
                _super.prototype.drawText.call(this);
            };
            Label.prototype.draw = function () {
                var settings = this._settings;
                if (settings) {
                    this.guiID = settings.id;
                    if (this.guiID)
                        EZGUI.components[this.guiID] = this;
                    this.position.x = settings.position.x;
                    this.position.y = settings.position.y;
                    this.rootSprite = new EZGUI.Compatibility.GUIContainer();
                    this.addChild(this.rootSprite);
                }
            };
            return Label;
        })(EZGUI.GUISprite);
        Component.Label = Label;
        EZGUI.registerComponents(Label, 'Label');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Slider = (function (_super) {
            __extends(Slider, _super);
            function Slider(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Object.defineProperty(Slider.prototype, "value", {
                get: function () {
                    if (this.horizontalSlide) {
                        return this.slide.position.x / (this.width - this.slide.width);
                    }
                    else {
                        return 1 + this.slide.position.y / (this.slide.height - this.height);
                    }
                },
                set: function (val) {
                    val = Math.max(0, val);
                    val = Math.min(val, 1);
                    if (this.horizontalSlide) {
                        this.slide.position.x = val * (this.width - this.slide.width);
                    }
                    else {
                        this.slide.position.y = (val - 1) * (this.slide.height - this.height);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Slider.prototype.setupEvents = function () {
                _super.prototype.setupEvents.call(this);
                var guiObj = this;
                var _this = this;
            };
            Slider.prototype.drawText = function () {
                //prevent text drawing
            };
            Slider.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                if (EZGUI.Compatibility.isPhaser) {
                    guiObj.on('mousemove', function () {
                    });
                    guiObj.on('mousedown', function (event, any) {
                        if (_this.canTrigger(event, _this.slide)) {
                            _this.slide.emit('ezgui:mousedown', event);
                        }
                    });
                    guiObj.on('mouseup', function () {
                        if (_this.canTrigger(event, _this.slide)) {
                            _this.slide.emit('ezgui:mouseup', event);
                        }
                    });
                    guiObj.on('mouseover', function () {
                    });
                    guiObj.on('mouseout', function () {
                    });
                }
                this.slide.on('mousemove', function () {
                    if (EZGUI.dragging == _this.slide) {
                        _this.emit('ezgui:value', _this.value);
                    }
                });
            };
            Slider.prototype.draw = function () {
                _super.prototype.draw.call(this);
                var cfg = this._settings.slide;
                cfg.component = 'Button';
                cfg.skin = 'Slide';
                cfg.position = { x: 0, y: 0 };
                cfg.draggable = true;
                //{ id: 'slide1', component: 'Button', position: { x: 0, y: 0 }, width: 30, height: this.height, draggable: true };
                var dir = this._settings.dir;
                if (this._settings.height > this._settings.width)
                    this._settings.dir = 'v';
                else
                    this._settings.dir = 'h';
                if (this._settings.dir == 'v') {
                    cfg.dragX = false;
                    this.horizontalSlide = false;
                }
                else {
                    cfg.dragY = false;
                    this.horizontalSlide = true;
                }
                this.slide = EZGUI.create(cfg, this.theme);
                this.slide.dragXInterval = [0, this.width - this.slide.width];
                this.slide.dragYInterval = [0, this.height - this.slide.height];
                this.value = 0;
                this.container.addChild(this.slide);
            };
            return Slider;
        })(EZGUI.GUISprite);
        Component.Slider = Slider;
        EZGUI.registerComponents(Slider, 'Slider');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Tabs = (function (_super) {
            __extends(Tabs, _super);
            function Tabs(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Tabs.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                if (this.tabsBar) {
                    for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                        //remove default buttons events
                        _this.tabsBar.container.children[i]._events = {};
                    }
                    this.tabsBar.bindChildren('click', function (e, tab) {
                        //console.log('clicked ', tab);
                        _this.activate(tab.userData.id);
                        for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                            _this.tabsBar.container.children[i].setState('default');
                        }
                        tab.setState('down');
                    });
                }
            };
            Tabs.prototype.draw = function () {
                //tabs should not have layout positionning
                delete this._settings.layout;
                var tabsH = this._settings.tabHeight || 50;
                this._settings['padding-top'] = tabsH;
                var tabsCfg = {
                    component: 'Window',
                    transparent: true,
                    padding: 0,
                    position: { x: 0, y: 0 },
                    width: this._settings.width,
                    height: tabsH,
                    layout: [this._settings.children.length, 1],
                    children: [
                    ]
                };
                for (var i = 0; i < this._settings.children.length; i++) {
                    var child = { text: this._settings.children[i].title || '', userData: { id: i }, component: 'Button', position: { x: 0, y: 0 }, width: ~~(this._settings.width / this._settings.children.length), height: tabsH };
                    tabsCfg.children.push(child);
                }
                this.tabsBar = EZGUI.create(tabsCfg, this.themeId);
                //this._settings.children.unshift(tabs);
                _super.prototype.draw.call(this);
                this.addChild(this.tabsBar);
            };
            Tabs.prototype.createChild = function (childSettings, order) {
                var child = _super.prototype.createChild.call(this, childSettings, order);
                if (!this.activeChild)
                    this.activeChild = child;
                if (childSettings.active) {
                    this.activeChild.visible = false;
                    this.activeChild = child;
                    this.activeChild.visible = true;
                    if (this.tabsBar)
                        this.tabsBar.container.children[order].setState('down');
                }
                else {
                    child.visible = false;
                    if (this.tabsBar)
                        this.tabsBar.container.children[order].setState('default');
                }
                return child;
            };
            Tabs.prototype.activate = function (idx) {
                if (this.container.children[idx]) {
                    this.activeChild.visible = false;
                    this.activeChild = this.container.children[idx];
                    this.activeChild.visible = true;
                    if (this.tabsBar) {
                        for (var i = 0; i < this.tabsBar.container.children.length; i++) {
                            this.tabsBar.container.children[i].setState('default');
                        }
                        this.tabsBar.container.children[idx].setState('down');
                    }
                }
            };
            return Tabs;
        })(EZGUI.GUISprite);
        Component.Tabs = Tabs;
        EZGUI.registerComponents(Tabs, 'Tabs');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var Device;
    (function (Device) {
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
        Device.isChrome = detect(/webkit\W.*(chrome|chromium)\W/i);
        /**
         * Return true if the browser is Firefox.
         *
         * @method isFirefox
         */
        Device.isFirefox = detect(/mozilla.*\Wfirefox\W/i);
        /**
         * Return true if the browser is using the Gecko engine.
         *
         * This is probably a better way to identify Firefox and other browsers
         * that use XulRunner.
         *
         * @method isGecko
         */
        Device.isGecko = detect(/mozilla(?!.*webkit).*\Wgecko\W/i);
        /**
         * Return true if the browser is Internet Explorer.
         *
         * @method isIE
         */
        Device.isIE = function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true;
            }
            else if (detect(/\bTrident\b/)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Return true if the browser is running on Kindle.
         *
         * @method isKindle
         */
        Device.isKindle = detect(/\W(kindle|silk)\W/i);
        /**
         * Return true if the browser is running on a mobile device.
         *
         * @method isMobile
         */
        Device.isMobile = detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i);
        /**
         * Return true if we are running on Opera.
         *
         * @method isOpera
         */
        Device.isOpera = detect(/opera.*\Wpresto\W|OPR/i);
        /**
         * Return true if the browser is Safari.
         *
         * @method isSafari
         */
        Device.isSafari = detect(/webkit\W(?!.*chrome).*safari\W/i);
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
        Device.isTablet = detect(/(ipad|android(?!.*mobile)|tablet)/i);
        /**
         * Return true if the browser is running on a TV!
         *
         * @method isTV
         */
        Device.isTV = detect(/googletv|sonydtv/i);
        /**
         * Return true if the browser is running on a WebKit browser.
         *
         * @method isWebKit
         */
        Device.isWebKit = detect(/webkit\W/i);
        /**
         * Return true if the browser is running on an Android browser.
         *
         * @method isAndroid
         */
        Device.isAndroid = detect(/android/i);
        /**
         * Return true if the browser is running on any iOS device.
         *
         * @method isIOS
         */
        Device.isIOS = detect(/(ipad|iphone|ipod)/i);
        /**
         * Return true if the browser is running on an iPad.
         *
         * @method isIPad
         */
        Device.isIPad = detect(/ipad/i);
        /**
         * Return true if the browser is running on an iPhone.
         *
         * @method isIPhone
         */
        Device.isIPhone = detect(/iphone/i);
        /**
         * Return true if the browser is running on an iPod touch.
         *
         * @method isIPod
         */
        Device.isIPod = detect(/ipod/i);
        Device.isMobile = detect(/mobile/i) || Device.isAndroid || Device.isIOS;
        /**
         * Return the complete UserAgent string verbatim.
         *
         * @method whoami
         */
        Device.whoami = function () {
            return userAgent;
        };
    })(Device = EZGUI.Device || (EZGUI.Device = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Layout = (function (_super) {
            __extends(Layout, _super);
            function Layout(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Layout.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
            };
            Layout.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this.guiMask = { width: 0, height: 0 };
                var settings = this._settings;
                if (settings) {
                    var padding = settings.padding || 0;
                    if (this._settings.mask !== false) {
                        var myMask = new PIXI.Graphics();
                        myMask.beginFill();
                        myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                        myMask.endFill();
                        this.addChild(myMask);
                        if (this._settings.anchor) {
                            myMask.position.x = this.container.position.x + padding;
                            myMask.position.y = this.container.position.y + padding;
                        }
                        this.container.mask = myMask;
                    }
                    this.guiMask.x = padding;
                    this.guiMask.y = padding;
                    this.guiMask.width = settings.width - padding * 2;
                    this.guiMask.height = settings.height - padding * 2;
                }
                //move container back to the top
                this.addChild(this.container);
            };
            Layout.prototype.createChild = function (childSettings, order) {
                if (!childSettings)
                    return null;
                var i = order;
                //console.log('adding ', i);
                var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                var swidth = this._settings.width - padLeft;
                var sheight = this._settings.height - padTop;
                var dx = padLeft;
                var dy = padTop;
                var lx = 1;
                var ly = 1;
                if (this._settings.layout != undefined) {
                    lx = this._settings.layout[0];
                    ly = this._settings.layout[1];
                    var x, y;
                    //horizontal layout 
                    if (ly == null) {
                        x = i;
                        y = 0;
                    }
                    else if (lx == null) {
                        x = 0;
                        y = i;
                    }
                    else {
                        var adjust = Math.floor(i / (lx * ly));
                        if (this._settings.dragY === false) {
                            dx += adjust * swidth;
                            dy -= adjust * sheight;
                        }
                        else if (this._settings.dragX === false) {
                        }
                        x = i % lx;
                        y = Math.floor(i / lx);
                    }
                    ly = ly || 1;
                    lx = lx || 1;
                    dx += x * (swidth / lx);
                    dy += y * (sheight / ly);
                }
                var pos = childSettings.position;
                if (typeof pos == 'string') {
                    var parts = pos.split(' ');
                    var pos1 = parts[0];
                    var pos2 = parts[1];
                    //normalize pos
                    if (parts[0] == parts[1]) {
                        pos2 = undefined;
                    }
                    if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                        pos1 = 'center';
                        pos2 = 'undefined';
                    }
                    if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                        pos1 = parts[1];
                        pos2 = parts[0];
                    }
                    if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                        pos2 = pos1;
                        pos1 = 'left';
                    }
                    childSettings.position = { x: dx, y: dy };
                    switch (pos1) {
                        case 'center':
                            childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                            if (pos2 === undefined)
                                childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'bottom':
                            childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                            break;
                    }
                    switch (pos2) {
                        case 'center':
                            childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'right':
                            childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                            break;
                    }
                }
                else {
                    childSettings.position.x = dx + childSettings.position.x;
                    childSettings.position.y = dy + childSettings.position.y;
                }
                //console.log(' >> ', dx.toFixed(2), dy.toFixed(2), childSettings.position.x.toFixed(2), childSettings.position.y.toFixed(2));
                var child = EZGUI.create(childSettings, this.theme);
                return child;
            };
            Layout.prototype.addChild = function (child) {
                if (child instanceof EZGUI.GUISprite) {
                    return this.addChildAt(child, this.container.children.length);
                }
                else {
                    return _super.prototype.addChild.call(this, child);
                }
            };
            Layout.prototype.addChildAt = function (child, index) {
                if (child instanceof EZGUI.GUISprite) {
                    var i = index;
                    //console.log('adding ', i);
                    var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                    var padLeft = this._settings['padding-left'] || this._settings.padding || 0;
                    var swidth = this._settings.width - padLeft;
                    var sheight = this._settings.height - padTop;
                    var dx = padLeft;
                    var dy = padTop;
                    var lx = 1;
                    var ly = 1;
                    if (this._settings.layout != undefined) {
                        lx = this._settings.layout[0];
                        ly = this._settings.layout[1];
                        var x, y;
                        //horizontal layout 
                        if (ly == null) {
                            x = i;
                            y = 0;
                        }
                        else if (lx == null) {
                            x = 0;
                            y = i;
                        }
                        else {
                            var adjust = Math.floor(i / (lx * ly));
                            if (this._settings.dragY === false) {
                                dx += adjust * swidth;
                                dy -= adjust * sheight;
                            }
                            else if (this._settings.dragX === false) {
                            }
                            x = i % lx;
                            y = Math.floor(i / lx);
                        }
                        ly = ly || 1;
                        lx = lx || 1;
                        dx += x * (swidth / lx);
                        dy += y * (sheight / ly);
                    }
                    var childSettings = child._settings;
                    var pos = childSettings.position;
                    if (typeof pos == 'string') {
                        var parts = pos.split(' ');
                        var pos1 = parts[0];
                        var pos2 = parts[1];
                        //normalize pos
                        if (parts[0] == parts[1]) {
                            pos2 = undefined;
                        }
                        if ((parts[0] == 'top' && parts[2] == 'bottom') || (parts[0] == 'bottom' && parts[2] == 'top') || (parts[0] == 'left' && parts[2] == 'right') || (parts[0] == 'right' && parts[2] == 'left')) {
                            pos1 = 'center';
                            pos2 = 'undefined';
                        }
                        if ((parts[0] == 'left' || parts[0] == 'right') && (parts[1] == 'top' || parts[1] == 'bottom')) {
                            pos1 = parts[1];
                            pos2 = parts[0];
                        }
                        if ((pos1 == 'left' || pos1 == 'right') && pos2 === undefined) {
                            pos2 = pos1;
                            pos1 = 'left';
                        }
                        childSettings.position = { x: dx, y: dy };
                        switch (pos1) {
                            case 'center':
                                childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                                if (pos2 === undefined)
                                    childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                                break;
                            case 'bottom':
                                childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                                break;
                        }
                        switch (pos2) {
                            case 'center':
                                childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                                break;
                            case 'right':
                                childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                                break;
                        }
                    }
                    else {
                        childSettings.position.x = dx + childSettings.position.x;
                        childSettings.position.y = dy + childSettings.position.y;
                    }
                    child.position.x = childSettings.position.x;
                    child.position.y = childSettings.position.y;
                    child.guiParent = this;
                    if (child.phaserGroup)
                        return this.container.addChild(child.phaserGroup);
                    else
                        return this.container.addChild(child);
                }
                else {
                    //return Compatibility.GUIDisplayObjectContainer.prototype.addChild.call(this, child, index);
                    return _super.prototype.addChildAt.call(this, child, index);
                }
            };
            return Layout;
        })(EZGUI.GUISprite);
        Component.Layout = Layout;
        EZGUI.registerComponents(Layout, 'Layout');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="layout.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Window = (function (_super) {
            __extends(Window, _super);
            function Window(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Window.prototype.draw = function () {
                var headerCfg = this._settings.header;
                if (headerCfg) {
                    headerCfg.height = headerCfg.height || 0;
                    headerCfg.skin = headerCfg.skin || 'Header';
                    this._settings['padding-top'] = headerCfg.height;
                }
                _super.prototype.draw.call(this);
                if (headerCfg) {
                    //this.position.y += headerCfg.height;
                    if (headerCfg.width == undefined)
                        headerCfg.width = this._settings.width;
                    this.titleBar = new EZGUI.GUISprite(headerCfg, this.theme);
                    //this.titleBar.position.y -= headerCfg.height - this.settings.padding*2;
                    this.originalAddChild(this.titleBar);
                }
            };
            Window.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                if (this._settings.draggable) {
                    //if (this.titleBar) this.draghandle = this.titleBar;
                    //else this.draghandle = this;
                    //this.draggable = this;
                    this.setDraggable(true);
                }
            };
            Window.prototype.setDraggable = function (val) {
                if (val === void 0) { val = true; }
                if (val) {
                    this.draggable = this;
                    if (this.titleBar)
                        this.draghandle = this.titleBar;
                    else
                        this.draghandle = this;
                }
                else {
                    this.draggable = undefined;
                    this.draghandle = undefined;
                }
            };
            return Window;
        })(Component.Layout);
        Component.Window = Window;
        EZGUI.registerComponents(Window, 'Window');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../components/window.ts" />
var EZGUI;
(function (EZGUI) {
    var Kit;
    (function (Kit) {
        var MainScreen = (function (_super) {
            __extends(MainScreen, _super);
            function MainScreen(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                //this.parseSettings();
            }
            MainScreen.prototype.parseSettings = function () {
                var txCache = EZGUI.Compatibility.PIXIVersion >= 3 ? PIXI.utils.TextureCache : PIXI.TextureCache;
                //parse logo
                if (this._settings.logo) {
                    if (typeof this._settings.logo == 'string') {
                        if (txCache[this._settings.logo]) {
                            var tx = txCache[this._settings.logo];
                            var px = (this._settings.width - tx.width) / 2;
                            this._settings.header = { position: { x: px, y: 0 }, image: this._settings.logo, height: tx.height, width: tx.width };
                        }
                    }
                    else {
                        this._settings.header = this._settings.logo;
                    }
                }
                //parse buttons
                if (this._settings.buttons && this._settings.buttons.length > 0) {
                    this.buttonsEvents = {};
                    var children = [];
                    var maxHeight = 1;
                    for (var i = 0; i < this._settings.buttons.length; i++) {
                        var btn = this._settings.buttons[i];
                        if (btn) {
                            btn.component = 'Button';
                            btn.id = this._settings.id + '-btn-' + i;
                            btn.position = btn.position || 'center';
                            if (maxHeight < btn.height)
                                maxHeight = btn.height;
                            if (btn.event) {
                                this.buttonsEvents[btn.id] = btn.event;
                            }
                        }
                        children.push(btn);
                    }
                    var yParts = Math.floor((this._settings.height - this._settings.header.height) / (maxHeight * 1.1));
                    this._settings.layout = [1, yParts];
                    this._settings.children = children;
                }
                this._settings = this.theme.applySkin(this._settings);
            };
            MainScreen.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                this.bindChildren('click', function (event, btn) {
                    if (_this.buttonsEvents && _this.buttonsEvents[btn.Id]) {
                        _this.emit('ezgui:' + _this.buttonsEvents[btn.Id], event, btn);
                    }
                });
            };
            return MainScreen;
        })(EZGUI.Component.Window);
        Kit.MainScreen = MainScreen;
        EZGUI.registerComponents(MainScreen, 'MainScreen');
    })(Kit = EZGUI.Kit || (EZGUI.Kit = {}));
})(EZGUI || (EZGUI = {}));
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// http://www.w3.org/TR/css3-color/
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        var ColorParser;
        (function (ColorParser) {
            var kCSSColorTable = {
                "transparent": [0, 0, 0, 0],
                "aliceblue": [240, 248, 255, 1],
                "antiquewhite": [250, 235, 215, 1],
                "aqua": [0, 255, 255, 1],
                "aquamarine": [127, 255, 212, 1],
                "azure": [240, 255, 255, 1],
                "beige": [245, 245, 220, 1],
                "bisque": [255, 228, 196, 1],
                "black": [0, 0, 0, 1],
                "blanchedalmond": [255, 235, 205, 1],
                "blue": [0, 0, 255, 1],
                "blueviolet": [138, 43, 226, 1],
                "brown": [165, 42, 42, 1],
                "burlywood": [222, 184, 135, 1],
                "cadetblue": [95, 158, 160, 1],
                "chartreuse": [127, 255, 0, 1],
                "chocolate": [210, 105, 30, 1],
                "coral": [255, 127, 80, 1],
                "cornflowerblue": [100, 149, 237, 1],
                "cornsilk": [255, 248, 220, 1],
                "crimson": [220, 20, 60, 1],
                "cyan": [0, 255, 255, 1],
                "darkblue": [0, 0, 139, 1],
                "darkcyan": [0, 139, 139, 1],
                "darkgoldenrod": [184, 134, 11, 1],
                "darkgray": [169, 169, 169, 1],
                "darkgreen": [0, 100, 0, 1],
                "darkgrey": [169, 169, 169, 1],
                "darkkhaki": [189, 183, 107, 1],
                "darkmagenta": [139, 0, 139, 1],
                "darkolivegreen": [85, 107, 47, 1],
                "darkorange": [255, 140, 0, 1],
                "darkorchid": [153, 50, 204, 1],
                "darkred": [139, 0, 0, 1],
                "darksalmon": [233, 150, 122, 1],
                "darkseagreen": [143, 188, 143, 1],
                "darkslateblue": [72, 61, 139, 1],
                "darkslategray": [47, 79, 79, 1],
                "darkslategrey": [47, 79, 79, 1],
                "darkturquoise": [0, 206, 209, 1],
                "darkviolet": [148, 0, 211, 1],
                "deeppink": [255, 20, 147, 1],
                "deepskyblue": [0, 191, 255, 1],
                "dimgray": [105, 105, 105, 1],
                "dimgrey": [105, 105, 105, 1],
                "dodgerblue": [30, 144, 255, 1],
                "firebrick": [178, 34, 34, 1],
                "floralwhite": [255, 250, 240, 1],
                "forestgreen": [34, 139, 34, 1],
                "fuchsia": [255, 0, 255, 1],
                "gainsboro": [220, 220, 220, 1],
                "ghostwhite": [248, 248, 255, 1],
                "gold": [255, 215, 0, 1],
                "goldenrod": [218, 165, 32, 1],
                "gray": [128, 128, 128, 1],
                "green": [0, 128, 0, 1],
                "greenyellow": [173, 255, 47, 1],
                "grey": [128, 128, 128, 1],
                "honeydew": [240, 255, 240, 1],
                "hotpink": [255, 105, 180, 1],
                "indianred": [205, 92, 92, 1],
                "indigo": [75, 0, 130, 1],
                "ivory": [255, 255, 240, 1],
                "khaki": [240, 230, 140, 1],
                "lavender": [230, 230, 250, 1],
                "lavenderblush": [255, 240, 245, 1],
                "lawngreen": [124, 252, 0, 1],
                "lemonchiffon": [255, 250, 205, 1],
                "lightblue": [173, 216, 230, 1],
                "lightcoral": [240, 128, 128, 1],
                "lightcyan": [224, 255, 255, 1],
                "lightgoldenrodyellow": [250, 250, 210, 1],
                "lightgray": [211, 211, 211, 1],
                "lightgreen": [144, 238, 144, 1],
                "lightgrey": [211, 211, 211, 1],
                "lightpink": [255, 182, 193, 1],
                "lightsalmon": [255, 160, 122, 1],
                "lightseagreen": [32, 178, 170, 1],
                "lightskyblue": [135, 206, 250, 1],
                "lightslategray": [119, 136, 153, 1],
                "lightslategrey": [119, 136, 153, 1],
                "lightsteelblue": [176, 196, 222, 1],
                "lightyellow": [255, 255, 224, 1],
                "lime": [0, 255, 0, 1],
                "limegreen": [50, 205, 50, 1],
                "linen": [250, 240, 230, 1],
                "magenta": [255, 0, 255, 1],
                "maroon": [128, 0, 0, 1],
                "mediumaquamarine": [102, 205, 170, 1],
                "mediumblue": [0, 0, 205, 1],
                "mediumorchid": [186, 85, 211, 1],
                "mediumpurple": [147, 112, 219, 1],
                "mediumseagreen": [60, 179, 113, 1],
                "mediumslateblue": [123, 104, 238, 1],
                "mediumspringgreen": [0, 250, 154, 1],
                "mediumturquoise": [72, 209, 204, 1],
                "mediumvioletred": [199, 21, 133, 1],
                "midnightblue": [25, 25, 112, 1],
                "mintcream": [245, 255, 250, 1],
                "mistyrose": [255, 228, 225, 1],
                "moccasin": [255, 228, 181, 1],
                "navajowhite": [255, 222, 173, 1],
                "navy": [0, 0, 128, 1],
                "oldlace": [253, 245, 230, 1],
                "olive": [128, 128, 0, 1],
                "olivedrab": [107, 142, 35, 1],
                "orange": [255, 165, 0, 1],
                "orangered": [255, 69, 0, 1],
                "orchid": [218, 112, 214, 1],
                "palegoldenrod": [238, 232, 170, 1],
                "palegreen": [152, 251, 152, 1],
                "paleturquoise": [175, 238, 238, 1],
                "palevioletred": [219, 112, 147, 1],
                "papayawhip": [255, 239, 213, 1],
                "peachpuff": [255, 218, 185, 1],
                "peru": [205, 133, 63, 1],
                "pink": [255, 192, 203, 1],
                "plum": [221, 160, 221, 1],
                "powderblue": [176, 224, 230, 1],
                "purple": [128, 0, 128, 1],
                "red": [255, 0, 0, 1],
                "rosybrown": [188, 143, 143, 1],
                "royalblue": [65, 105, 225, 1],
                "saddlebrown": [139, 69, 19, 1],
                "salmon": [250, 128, 114, 1],
                "sandybrown": [244, 164, 96, 1],
                "seagreen": [46, 139, 87, 1],
                "seashell": [255, 245, 238, 1],
                "sienna": [160, 82, 45, 1],
                "silver": [192, 192, 192, 1],
                "skyblue": [135, 206, 235, 1],
                "slateblue": [106, 90, 205, 1],
                "slategray": [112, 128, 144, 1],
                "slategrey": [112, 128, 144, 1],
                "snow": [255, 250, 250, 1],
                "springgreen": [0, 255, 127, 1],
                "steelblue": [70, 130, 180, 1],
                "tan": [210, 180, 140, 1],
                "teal": [0, 128, 128, 1],
                "thistle": [216, 191, 216, 1],
                "tomato": [255, 99, 71, 1],
                "turquoise": [64, 224, 208, 1],
                "violet": [238, 130, 238, 1],
                "wheat": [245, 222, 179, 1],
                "white": [255, 255, 255, 1],
                "whitesmoke": [245, 245, 245, 1],
                "yellow": [255, 255, 0, 1],
                "yellowgreen": [154, 205, 50, 1]
            };
            function clamp_css_byte(i) {
                i = Math.round(i); // Seems to be what Chrome does (vs truncation).
                return i < 0 ? 0 : i > 255 ? 255 : i;
            }
            function clamp_css_float(f) {
                return f < 0 ? 0 : f > 1 ? 1 : f;
            }
            function parse_css_int(str) {
                if (str[str.length - 1] === '%')
                    return clamp_css_byte(parseFloat(str) / 100 * 255);
                return clamp_css_byte(parseInt(str));
            }
            function parse_css_float(str) {
                if (str[str.length - 1] === '%')
                    return clamp_css_float(parseFloat(str) / 100);
                return clamp_css_float(parseFloat(str));
            }
            function css_hue_to_rgb(m1, m2, h) {
                if (h < 0)
                    h += 1;
                else if (h > 1)
                    h -= 1;
                if (h * 6 < 1)
                    return m1 + (m2 - m1) * h * 6;
                if (h * 2 < 1)
                    return m2;
                if (h * 3 < 2)
                    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
                return m1;
            }
            function parseToPixiColor(str) {
                var rgb = parseToRGB(str);
                if (!rgb)
                    return -1;
                var intRGB = rgb[0];
                intRGB = (intRGB << 8) + rgb[1];
                intRGB = (intRGB << 8) + rgb[2];
                return intRGB;
            }
            ColorParser.parseToPixiColor = parseToPixiColor;
            function parseToRGB(str) {
                // Remove all whitespace, not compliant, but should just be more accepting.
                var str = str.replace(/ /g, '').toLowerCase();
                // Color keywords (and transparent) lookup.
                if (str in kCSSColorTable)
                    return kCSSColorTable[str].slice(); // dup.
                // #abc and #abc123 syntax.
                if (str[0] === '#') {
                    if (str.length === 4) {
                        var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
                        if (!(iv >= 0 && iv <= 0xfff))
                            return null; // Covers NaN.
                        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8), (iv & 0xf0) | ((iv & 0xf0) >> 4), (iv & 0xf) | ((iv & 0xf) << 4), 1];
                    }
                    else if (str.length === 7) {
                        var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
                        if (!(iv >= 0 && iv <= 0xffffff))
                            return null; // Covers NaN.
                        return [(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1];
                    }
                    return null;
                }
                var op = str.indexOf('('), ep = str.indexOf(')');
                if (op !== -1 && ep + 1 === str.length) {
                    var fname = str.substr(0, op);
                    var params = str.substr(op + 1, ep - (op + 1)).split(',');
                    var alpha = 1; // To allow case fallthrough.
                    switch (fname) {
                        case 'rgba':
                            if (params.length !== 4)
                                return null;
                            alpha = parse_css_float(params.pop());
                        case 'rgb':
                            if (params.length !== 3)
                                return null;
                            return [parse_css_int(params[0]), parse_css_int(params[1]), parse_css_int(params[2]), alpha];
                        case 'hsla':
                            if (params.length !== 4)
                                return null;
                            alpha = parse_css_float(params.pop());
                        case 'hsl':
                            if (params.length !== 3)
                                return null;
                            var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360; // 0 .. 1
                            // NOTE(deanm): According to the CSS spec s/l should only be
                            // percentages, but we don't bother and let float or percentage.
                            var s = parse_css_float(params[1]);
                            var l = parse_css_float(params[2]);
                            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                            var m1 = l * 2 - m2;
                            return [clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255), alpha];
                        default:
                            return null;
                    }
                }
                return null;
            }
            ColorParser.parseToRGB = parseToRGB;
        })(ColorParser = utils.ColorParser || (utils.ColorParser = {}));
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                if (settings.text)
                    this.text = settings.text;
            }
            Button.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                var isDown = false;
                //guiObj.on('mousemove', function () {
                //});
                guiObj.on('mousedown', function () {
                    isDown = true;
                    //console.log('down', _this.guiID);
                    guiObj.setState('down');
                });
                guiObj.on('mouseup', function () {
                    isDown = false;
                    //console.log('up', _this.guiID);
                    guiObj.setState('default');
                });
                guiObj.on('mouseover', function () {
                    //console.log('hover', _this.guiID);
                    if (!isDown)
                        guiObj.setState('hover');
                });
                guiObj.on('mouseout', function () {
                    //console.log('out', _this.guiID);
                    //EZGUI.dragging = null;
                    //temporary workaround for phaser
                    if (!EZGUI.Compatibility.isPhaser) {
                        isDown = false;
                        guiObj.setState('default');
                    }
                });
            };
            return Button;
        })(EZGUI.GUISprite);
        Component.Button = Button;
        EZGUI.registerComponents(Button, 'Button');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="../guisprite.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Checkbox = (function (_super) {
            __extends(Checkbox, _super);
            function Checkbox(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
            }
            Object.defineProperty(Checkbox.prototype, "checked", {
                //Getter & setter for check state
                get: function () {
                    return this._checked;
                },
                set: function (chk) {
                    if (chk) {
                        this.setState('checked');
                        if (this._checkmark)
                            this._checkmark.visible = true;
                    }
                    else {
                        this.setState('default');
                        if (this._checkmark)
                            this._checkmark.visible = false;
                    }
                    this._checked = chk;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Checkbox.prototype, "text", {
                //Getter & setter for text vakue which need to be placed on the right
                get: function () {
                    if (this.textObj)
                        return this.textObj.text;
                },
                set: function (val) {
                    if (this.textObj) {
                        this.textObj.text = val;
                        if (this._settings.anchor) {
                            this.textObj.position.x = 0;
                            this.textObj.position.y = 0;
                            this.textObj.anchor.x = this._settings.anchor.x;
                            this.textObj.anchor.y = this._settings.anchor.y;
                        }
                        else {
                            this.textObj.position.x = this._settings.width;
                            this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                            this.textObj.anchor.x = 0;
                            this.textObj.anchor.y = 0;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Checkbox.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var guiObj = this;
                var _this = this;
                var _this = this;
                var guiObj = this;
                guiObj.on('mouseover', function (event) {
                    //guiObj.alpha = 0.7;
                });
                //clear parent event
                guiObj.off('mouseout');
                guiObj.on('mouseout', function () {
                    //prevent state clear
                    //if (_this.checked) {
                    //    _this.setState('checked');
                    //}
                    //guiObj.alpha = 1;
                });
                guiObj.on('click', function () {
                    _this.checked = !_this.checked;
                });
            };
            Checkbox.prototype.draw = function () {
                _super.prototype.draw.call(this);
                this._checkmark = this.createThemeImage(this._settings, 'default', 'checkmark');
                if (this._checkmark != null) {
                    this.addChild(this._checkmark);
                    this._checkmark.visible = false;
                    this._checkmark.width = this._settings.width;
                    this._checkmark.height = this._settings.height;
                    if (this._settings.anchor) {
                        this._checkmark.anchor.x = this._settings.anchor.x;
                        this._checkmark.anchor.y = this._settings.anchor.y;
                    }
                }
            };
            Checkbox.prototype.drawText = function () {
                _super.prototype.drawText.call(this);
                if (this.textObj) {
                    this.textObj.position.x = this._settings.width;
                    this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                }
            };
            return Checkbox;
        })(Component.Button);
        Component.Checkbox = Checkbox;
        EZGUI.registerComponents(Checkbox, 'Checkbox');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
/// <reference path="checkbox.ts" />
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var Radio = (function (_super) {
            __extends(Radio, _super);
            function Radio(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                this.group = null;
                this.group = settings.group;
                if (!EZGUI.radioGroups[this.group])
                    EZGUI.radioGroups[this.group] = [];
                EZGUI.radioGroups[this.group].push(this);
                if (this._settings.checked === true)
                    this.checked = true;
            }
            Object.defineProperty(Radio, "groups", {
                //static groups: any = {};
                //static selectedFrom: any = {};
                get: function () {
                    return EZGUI.radioGroups;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Radio.prototype, "checked", {
                get: function () {
                    return this._checked;
                },
                set: function (chk) {
                    if (chk) {
                        this.clearGroup();
                        this.setState('checked');
                        if (this._checkmark)
                            this._checkmark.visible = true;
                    }
                    else {
                        this.setState('default');
                        if (this._checkmark)
                            this._checkmark.visible = false;
                    }
                    this._checked = chk;
                    EZGUI.radioGroups[this.group].selected = this;
                },
                enumerable: true,
                configurable: true
            });
            Radio.prototype.clearGroup = function () {
                if (!EZGUI.radioGroups[this.group])
                    return;
                for (var i = 0; i < EZGUI.radioGroups[this.group].length; i++) {
                    EZGUI.radioGroups[this.group][i].checked = false;
                }
            };
            Radio.prototype.handleEvents = function () {
                _super.prototype.handleEvents.call(this);
                var _this = this;
                //clear default action
                _this.off('click');
                _this.on('click', function (event) {
                    _this.checked = true;
                    _this.emit('ezgui:checked', event, _this);
                });
            };
            Radio.prototype.draw = function () {
                _super.prototype.draw.call(this);
            };
            return Radio;
        })(Component.Checkbox);
        Component.Radio = Radio;
        EZGUI.registerComponents(Radio, 'Radio');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var Component;
    (function (Component) {
        var List = (function (_super) {
            __extends(List, _super);
            function List(settings, themeId) {
                _super.call(this, settings, themeId);
                this.settings = settings;
                this.themeId = themeId;
                //this.draghandle = this.uichildren['sbtn1'];
            }
            List.prototype.handleEvents = function () {
                var _this = this;
                var ssize;
                this.draggable = this.container;
                if (_this._settings.dragY === false || (this._settings.layout && this._settings.layout[1] == null)) {
                    this.dragConstraint = 'x';
                    this.horizontalSlide = true;
                    this.slotSize = (this._settings.width / this._settings.layout[0]);
                }
                if (_this._settings.dragX === false || (this._settings.layout && this._settings.layout[0] == null)) {
                    this.dragConstraint = 'y';
                    this.horizontalSlide = false;
                    this.slotSize = (this._settings.height / this._settings.layout[1]);
                }
                if (this._settings.layout && this._settings.layout[0] != null && this._settings.layout[1] != null) {
                    if (_this._settings.dragY === false) {
                        this.slotSize = this.slotSize / this._settings.layout[1];
                    }
                    if (_this._settings.dragX === false) {
                        this.slotSize = this.slotSize / this._settings.layout[0];
                    }
                }
                //console.log(' >>>> ', this.draggable.width, this._settings.width);
                ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                this.dragXInterval[1] = this._settings.width * 0.2;
                this.dragYInterval[0] = -ssize + this._settings.height * 0.5;
                this.dragYInterval[1] = this._settings.height * 0.2;
                _super.prototype.handleEvents.call(this);
                _this.on('mousedown', function (event) {
                    if (_this.decelerationItv) {
                        clearInterval(_this.decelerationItv);
                        _this.decelerationItv = null;
                    }
                    for (var i = 0; i < _this.container.children.length; i++) {
                        var child = _this.container.children[i];
                        if (!(child instanceof EZGUI.GUISprite))
                            continue;
                        if (!child.mouseInObj(event, child))
                            continue;
                        if (!child.canTrigger(event, child))
                            continue;
                        child.emit('ezgui:mousedown', event);
                    }
                });
                _this.on('mouseup', function (event) {
                    if (_this.decelerationItv)
                        return;
                    var endPos = EZGUI.utils.getRealPos(event);
                    //console.log('slide end ', EZGUI.startDrag.x, EZGUI.startDrag.x, endPos);
                    _this.decelerateScroll(endPos);
                });
            };
            List.prototype.decelerateScroll = function (endPos) {
                var _this = this;
                var sign = 0;
                if (_this.dragConstraint != 'y') {
                    sign = Math.sign(endPos.x - EZGUI.startDrag.x);
                }
                if (_this.dragConstraint != 'x') {
                    sign = Math.sign(endPos.y - EZGUI.startDrag.y);
                }
                var x1 = EZGUI.startDrag.x;
                var y1 = EZGUI.startDrag.y;
                var x2 = endPos.x;
                var y2 = endPos.y;
                var distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                var time = Date.now() - EZGUI.startDrag.t;
                var speed = distance / time;
                var timeConstant = 10;
                var amplitude = sign * speed * 150;
                var step = 0;
                var initialPosX = _this.draggable.position.x;
                var initialPosY = _this.draggable.position.y;
                var posX = 0;
                var posY = 0;
                if (_this.decelerationItv)
                    clearInterval(_this.decelerationItv);
                _this.decelerationItv = setInterval(function () {
                    //console.log('.');
                    var delta = amplitude / timeConstant;
                    if (_this.dragConstraint != 'y') {
                        posX += delta;
                        var nextPos = initialPosX + posX;
                        if (nextPos >= _this.dragXInterval[0] && nextPos <= _this.dragXInterval[1])
                            _this.draggable.position.x = nextPos;
                        else
                            clearInterval(_this.decelerationItv);
                    }
                    if (_this.dragConstraint != 'x') {
                        posY += delta;
                        var nextPos = initialPosY + posY;
                        if (nextPos >= _this.dragYInterval[0] && nextPos <= _this.dragYInterval[1])
                            _this.draggable.position.y = nextPos;
                        else
                            clearInterval(_this.decelerationItv);
                    }
                    amplitude -= delta;
                    step += 1;
                    if (step > 6 * timeConstant) {
                        clearInterval(_this.decelerationItv);
                        _this.decelerationItv = null;
                    }
                }, 16);
            };
            List.prototype.addChildAt = function (child, index) {
                var result = _super.prototype.addChildAt.call(this, child, index);
                if (result instanceof EZGUI.GUISprite) {
                    var ssize = this.slotSize * this.container.children.length;
                    this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                    this.dragXInterval[1] = this._settings.width * 0.2;
                    this.dragYInterval[0] = -ssize + this._settings.height * 0.9;
                    this.dragYInterval[1] = this._settings.height * 0.1;
                }
                return result;
            };
            List.prototype.removeChild = function (child) {
                var result = _super.prototype.removeChild.call(this, child);
                if (child instanceof EZGUI.GUISprite) {
                    var ssize = this.slotSize * this.container.children.length;
                    this.dragXInterval[0] = -ssize + this._settings.width * 0.5;
                    this.dragXInterval[1] = this._settings.width * 0.2;
                    this.dragYInterval[0] = -ssize + this._settings.height * 0.9;
                    this.dragYInterval[1] = this._settings.height * 0.1;
                    this.draggable.position.x = 0;
                    this.draggable.position.y = 0;
                }
                return result;
            };
            List.prototype.slideBy = function (value, delay) {
                delay = delay || Math.abs(value) * 5;
                var _this = this;
                if (_this.dragConstraint != 'y') {
                    var nextPos = _this.draggable.position.x + value;
                    nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragXInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ x: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
                if (_this.dragConstraint != 'x') {
                    var nextPos = _this.draggable.position.y + value;
                    nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragYInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ y: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
            };
            List.prototype.slideTo = function (value, delay) {
                var _this = this;
                if (_this.dragConstraint != 'y') {
                    var nextPos = value;
                    delay = delay || Math.abs(value - _this.draggable.position.x) * 5;
                    nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragXInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ x: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
                if (_this.dragConstraint != 'x') {
                    var nextPos = value;
                    delay = delay || Math.abs(value - _this.draggable.position.y) * 5;
                    nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                    nextPos = Math.min(nextPos, _this.dragYInterval[1]);
                    if (_this.tween)
                        _this.tween.stop();
                    _this.tween = new EZGUI.Tween(_this.container.position).to({ y: nextPos }, delay).easing(EZGUI.Easing.Cubic.Out);
                    _this.tween.start();
                }
            };
            return List;
        })(Component.Layout);
        Component.List = List;
        EZGUI.registerComponents(List, 'List');
    })(Component = EZGUI.Component || (EZGUI.Component = {}));
})(EZGUI || (EZGUI = {}));
var EZGUI;
(function (EZGUI) {
    var MultistateTilingSprite = (function (_super) {
        __extends(MultistateTilingSprite, _super);
        function MultistateTilingSprite(texture, width, height, states) {
            _super.call(this, texture, width, height);
            this.stateTextures = {};
            this.currentState = 'default';
            this.stateTextures['default'] = texture;
            var _this = this;
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture && !this.stateTextures[s]) {
                        //var mtx:any = new MultistateTilingSprite(tx, width, height);
                        this.stateTextures[s] = tx;
                    }
                }
            }
        }
        MultistateTilingSprite.prototype.setState = function (state) {
            if (state === void 0) { state = 'default'; }
            var sprite = this;
            if (!sprite.stateTextures[state] || state == this.currentState)
                return;
            if (sprite.texture == sprite.stateTextures[state])
                return;
            if (sprite.texture) {
                sprite.texture = sprite.stateTextures[state];
            }
            else {
                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];
            }
            if (sprite.tilingTexture)
                sprite.tilingTexture = sprite.stateTextures[state];
            if (sprite._tilingTexture)
                sprite._tilingTexture = sprite.stateTextures[state];
            if (EZGUI.Compatibility.PIXIVersion == 2) {
            }
        };
        return MultistateTilingSprite;
    })(EZGUI.Compatibility.TilingSprite);
    EZGUI.MultistateTilingSprite = MultistateTilingSprite;
})(EZGUI || (EZGUI = {}));
(function (root) {
    if ('performance' in root === false) {
        root.performance = {};
    }
    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });
    if ('now' in root.performance === false) {
        var offset = root.performance.timing && root.performance.timing.navigationStart ? performance.timing.navigationStart : Date.now();
        root.performance.now = function () {
            return Date.now() - offset;
        };
    }
})(this);
var EZGUI;
(function (EZGUI) {
    var utils;
    (function (utils) {
        /**
         * check if the the point defined by x and y outside a visible gui element
         *
         */
        function isMasked(x, y, obj) {
            var parent = obj.parent;
            if (parent == null)
                return false;
            if (!parent.worldTransform || !parent.guiMask)
                return isMasked(x, y, parent);
            var wratio = 1;
            var hratio = 1;
            if (EZGUI.Compatibility.isPhaser) {
                wratio = Phaser.GAMES[0].scale.width / Phaser.GAMES[0].width;
                hratio = Phaser.GAMES[0].scale.height / Phaser.GAMES[0].height;
            }
            var tx = (parent.worldTransform.tx + parent.guiMask.x) * wratio;
            var ty = (parent.worldTransform.ty + parent.guiMask.y) * hratio;
            var w = parent.guiMask.width * wratio;
            var h = parent.guiMask.height * hratio;
            if (x < tx || y < ty || x > tx + w || y > ty + h)
                return true;
            return isMasked(x, y, parent);
        }
        utils.isMasked = isMasked;
        function getAbsPos(obj, from) {
            if (from === void 0) { from = null; }
            //if (EZGUI.Compatibility.PIXIVersion == 3) {
            if (from == null)
                from = { x: 0, y: 0 };
            from.x += obj.position.x;
            from.y += obj.position.y;
            if (obj.parent != null)
                return getAbsPos(obj.parent, from);
            return from;
            //}
            //else {
            //return { x: obj.worldTransform.tx, y: obj.worldTransform.ty };
            //}
        }
        utils.getAbsPos = getAbsPos;
        function getClientXY(event) {
            var data = event.data || event;
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            return { x: origEvt.clientX, y: origEvt.clientY };
        }
        utils.getClientXY = getClientXY;
        function getRealPos(event) {
            var data = event.data || event;
            var origEvt = event;
            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent)
                    origEvt = data.originalEvent;
            }
            var bcr = origEvt.target.getBoundingClientRect();
            var px = origEvt.clientX - bcr.left;
            var py = origEvt.clientY - bcr.top;
            return { x: px, y: py };
        }
        utils.getRealPos = getRealPos;
        function distance(x, y, x0, y0) {
            return Math.sqrt((x -= x0) * x + (y -= y0) * y);
        }
        utils.distance = distance;
        ;
        function extendJSON(target, source) {
            if (typeof source == 'object') {
                for (var i in source) {
                    var src = source[i];
                    if (target[i] == '') {
                        continue;
                    }
                    if (target[i]) {
                        extendJSON(target[i], source[i]);
                    }
                    else {
                        target[i] = JSON.parse(JSON.stringify(source[i]));
                    }
                }
            }
        }
        utils.extendJSON = extendJSON;
        function loadJSON(url, cb, crossOrigin) {
            if (crossOrigin === void 0) { crossOrigin = true; }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var jsonContent = JSON.parse(xmlhttp.responseText);
                    cb(jsonContent);
                }
            };
            xmlhttp.open("GET", url, crossOrigin);
            xmlhttp.send();
        }
        utils.loadJSON = loadJSON;
        function loadXML(url, cb, crossOrigin) {
            if (crossOrigin === void 0) { crossOrigin = true; }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var xmlDoc;
                    if (window['DOMParser']) {
                        var parser = new DOMParser();
                        xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                    }
                    else {
                        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlhttp.responseText);
                    }
                    cb(xmlDoc);
                }
            };
            xmlhttp.open("GET", url, crossOrigin);
            xmlhttp.send();
        }
        utils.loadXML = loadXML;
    })(utils = EZGUI.utils || (EZGUI.utils = {}));
})(EZGUI || (EZGUI = {}));
//# sourceMappingURL=EZGUI.js.map