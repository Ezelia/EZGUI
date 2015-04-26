/// <reference path="easing.ts" />
/// <reference path="interpolation.ts" />

/**
 * This is a part of Tween.js converted to TypeScript
 * 
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 */

module EZGUI {


    export class Tween {

        //#region Static part replacing TWEEN namespace from original tweenjs

        static _tweens = [];

        static getAll() {

            return this._tweens;

        }

        static removeAll() {

            this._tweens = [];

        }

        static add(tween) {

            this._tweens.push(tween);

        }

        static remove(tween) {

            var i = this._tweens.indexOf(tween);

            if (i !== -1) {

                this._tweens.splice(i, 1);

            }

        }

        static update(time?) {

            if (this._tweens.length === 0) return false;

            var i = 0;

            time = time !== undefined ? time : window.performance.now();

            while (i < this._tweens.length) {

                if (this._tweens[i].update(time)) {

                    i++;

                } else {

                    this._tweens.splice(i, 1);

                }

            }

            return true;

        }
        //#endregion


        //#region [private variables]
        private _object;
        private _valuesStart = {};
        private _valuesEnd = {};
        private _valuesStartRepeat = {};
        private _duration = 1000;
        private _repeat = 0;
        private _yoyo = false;
        private _isPlaying = false;
        private _reversed = false;
        private _delayTime = 0;
        private _startTime = null;
        private _easingFunction = EZGUI.Easing.Linear.None;
        private _interpolationFunction = EZGUI.Interpolation.Linear;
        private _chainedTweens: any = [];
        private _onStartCallback = null;
        private _onStartCallbackFired = false;
        private _onUpdateCallback = null;
        private _onCompleteCallback = null;
        private _onStopCallback = null;
        //#endregion


        constructor(object) {
            this._object = object;
            // Set all starting values present on the target object
            for (var field in object) {

                this._valuesStart[field] = (<any>parseFloat)(object[field], 10);

            }
        }

        public to(properties, duration) {

            if (duration !== undefined) {

                this._duration = duration;

            }

            this._valuesEnd = properties;

            return this;

        }

        public start(time?) {

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

        }

        public stop() {

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

        }

        public stopChainedTweens() {

            for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {

                this._chainedTweens[i].stop();

            }

        }

        public delay(amount) {

            this._delayTime = amount;
            return this;

        }

        public repeat(times) {

            this._repeat = times;
            return this;

        }

        public yoyo(yoyo) {

            this._yoyo = yoyo;
            return this;

        }


        public easing(easing) {

            this._easingFunction = easing;
            return this;

        }

        public interpolation(interpolation) {

            this._interpolationFunction = interpolation;
            return this;
        }


        public chain() {

            this._chainedTweens = arguments;
            return this;

        }

        public onStart(callback) {

            this._onStartCallback = callback;
            return this;

        }

        public onUpdate(callback) {

            this._onUpdateCallback = callback;
            return this;

        }

        public onComplete(callback) {

            this._onCompleteCallback = callback;
            return this;

        }

        public onStop(callback) {

            this._onStopCallback = callback;
            return this;

        }

        public update(time) {

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

                } else {

                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (typeof (end) === "string") {
                        end = start + (<any>parseFloat)(end, 10);
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

                    // reassign starting values, restart by making startTime = now
                    for (property in this._valuesStartRepeat) {

                        if (typeof (this._valuesEnd[property]) === "string") {
                            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + (<any>parseFloat)(this._valuesEnd[property], 10);
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

                } else {

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

        }



    }
}

