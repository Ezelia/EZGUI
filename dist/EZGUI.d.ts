/// <reference path="../lib/pixi.d.ts" />
declare module EZGUI {
    var Easing: {
        Linear: {
            None: (k: any) => any;
        };
        Quadratic: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Cubic: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Quartic: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Quintic: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Sinusoidal: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Exponential: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Circular: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Elastic: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Back: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
        Bounce: {
            In: (k: any) => number;
            Out: (k: any) => number;
            InOut: (k: any) => number;
        };
    };
}
declare module EZGUI {
    var Interpolation: {
        Linear: (v: any, k: any) => any;
        Bezier: (v: any, k: any) => number;
        CatmullRom: (v: any, k: any) => any;
        Utils: {
            Linear: (p0: any, p1: any, t: any) => any;
            Bernstein: (n: any, i: any) => number;
            Factorial: (n: any) => number;
            CatmullRom: (p0: any, p1: any, p2: any, p3: any, t: any) => any;
        };
    };
}
/**
 * This is a part of Tween.js converted to TypeScript
 *
 * Tween.js - Licensed under the MIT license
 * https://github.com/sole/tween.js
 */
declare module EZGUI {
    class Tween {
        static _tweens: any[];
        static getAll(): any[];
        static removeAll(): void;
        static add(tween: any): void;
        static remove(tween: any): void;
        static update(time?: any): boolean;
        private _object;
        private _valuesStart;
        private _valuesEnd;
        private _valuesStartRepeat;
        private _duration;
        private _repeat;
        private _yoyo;
        private _isPlaying;
        private _reversed;
        private _delayTime;
        private _startTime;
        private _easingFunction;
        private _interpolationFunction;
        private _chainedTweens;
        private _onStartCallback;
        private _onStartCallbackFired;
        private _onUpdateCallback;
        private _onCompleteCallback;
        private _onStopCallback;
        constructor(object: any);
        to(properties: any, duration: any): Tween;
        start(time?: any): Tween;
        stop(): Tween;
        stopChainedTweens(): void;
        delay(amount: any): Tween;
        repeat(times: any): Tween;
        yoyo(yoyo: any): Tween;
        easing(easing: any): Tween;
        interpolation(interpolation: any): Tween;
        chain(): Tween;
        onStart(callback: any): Tween;
        onUpdate(callback: any): Tween;
        onComplete(callback: any): Tween;
        onStop(callback: any): Tween;
        update(time: any): boolean;
    }
}
declare module EZGUI.utils {
    class EventHandler {
        private _events;
        bind(event: any, fct: any): void;
        on(event: any, fct: any, nbcalls?: any): void;
        unbind(event: any, fct: any): void;
        unbindEvent(event: any): void;
        unbindAll(): void;
        trigger(event: any, ...args: any[]): void;
    }
}
declare module EZGUI.Compatibility {
    var PIXIVersion: number;
    var isPhaser: boolean;
    var BitmapText: any;
    class TilingSprite {
        constructor(texture: PIXI.Texture, width: number, height: number);
    }
    class GUIContainer extends PIXI.DisplayObjectContainer {
    }
    class GUIDisplayObjectContainer extends GUIContainer {
        protected phaserGroup: any;
        static phaserGroup: any;
        _listeners: any;
        constructor();
    }
    function createRenderTexture(width: any, height: any): any;
}
declare var Phaser: any;
declare module EZGUI {
    class Theme {
        themeConfig: any;
        static imageComponents: string[];
        static imageStates: string[];
        static imageVariants: string[];
        private _theme;
        private _default;
        private _listeners;
        ready: boolean;
        id: string;
        private url;
        private path;
        constructor(themeConfig: any);
        override(themeConfig: any): void;
        private fixLimits(target, source);
        private initThemeConfig(themeConfig);
        private parseResources();
        private parseComponents(theme);
        private normalizeResPath(str);
        static load(themes: any[], cb?: any): void;
        onReady(cb: any): void;
        private preload();
        private loadResources(resources, cb);
        private parseFont(resource, texture);
        getSkin(skinId: any): any;
        applySkin(settings: any): any;
    }
}
declare module EZGUI {
    var VERSION: string;
    var tilingRenderer: any;
    var dragging: any;
    var dsx: number;
    var dsy: number;
    var startDrag: {
        x: any;
        y: any;
        t: any;
    };
    var game: any;
    var themes: {};
    var components: {};
    var radioGroups: any;
    var EventsHelper: utils.EventHandler;
    /**
     * generic settings object
     * accepted parameters
     * crossOrigin : true/false
     */
    var settings: any;
    function registerComponents(cpt: any, id?: any): void;
    function create(settings: any, theme: any): any;
}
declare module EZGUI {
    class MultistateSprite extends PIXI.Sprite {
        stateTextures: any;
        constructor(texture: PIXI.Texture, states?: any);
        addState(id: any, texture: any): void;
        setState(state?: string): void;
    }
}
declare module EZGUI {
    class GUIObject extends EZGUI.Compatibility.GUIDisplayObjectContainer {
        guiID: string;
        Id: string;
        userData: any;
        container: PIXI.DisplayObjectContainer;
        guiParent: GUISprite;
        constructor();
        protected setupEvents(): void;
        originalAddChildAt(child: any, index: any): PIXI.DisplayObject;
        originalAddChild(child: any): PIXI.DisplayObject;
        addChild(child: any): PIXI.DisplayObject;
        removeChild(child: any): PIXI.DisplayObject;
        mouseInObj(event: any, guiSprite: any): boolean;
        canTrigger(event: any, guiSprite: any): boolean;
        on(event: any, fn: any, context?: any): void;
        off(event: any, fn?: any, context?: any): void;
        bindChildren(event: any, fn: any): void;
        bindChildrenOfType(_type: any, event: any, fn: any): void;
        unbindChildren(event: any, fn?: any): void;
        unbindChildrenOfType(_type: any, event: any, fn?: any): void;
        preUpdate(): void;
        update(): void;
        postUpdate(): void;
        destroy(): void;
    }
}
declare module EZGUI {
    class GUISprite extends GUIObject {
        _settings: any;
        themeId: any;
        guiID: string;
        userData: any;
        draggable: PIXI.DisplayObjectContainer;
        draghandle: any;
        dragConstraint: string;
        dragXInterval: number[];
        dragYInterval: number[];
        theme: Theme;
        protected textObj: any;
        protected rootSprite: any;
        settings: string;
        text: string;
        constructor(_settings: any, themeId: any);
        protected parseSettings(): void;
        setDraggable(val?: boolean): void;
        protected handleEvents(): void;
        protected draw(): void;
        protected sortChildren(): void;
        protected drawText(): void;
        createChild(childSettings: any, order?: any): any;
        setState(state?: string): void;
        animatePosTo(x: any, y: any, time?: number, easing?: (k: any) => any, callback?: any): Tween;
        animateSizeTo(w: any, h: any, time?: number, easing?: (k: any) => any, callback?: any): Tween;
        protected getFrameConfig(config: any, state: any): any;
        protected getComponentConfig(component: any, part: any, side: any, state: any): any;
        protected createThemeCorner(settings: any, part: any, side: any, state: any): PIXI.Sprite;
        protected createThemeSide(settings: any, side: any, state: any): PIXI.Sprite;
        protected createThemeBorder(settings: any, part: any, side: any, state: any): any;
        protected createThemeTilableBackground(settings: any, state: any): any;
        protected createThemeBackground(settings: any, state: any, leftSide: any, rightSide?: any): any;
        protected createThemeImage(settings: any, state: any, imagefield?: string): PIXI.Sprite;
        protected createVisuals(settings: any, state: any): any[];
    }
}
declare module EZGUI.Component {
    class Label extends GUISprite {
        _settings: any;
        themeId: any;
        constructor(_settings: any, themeId: any);
        protected setupEvents(): void;
        protected handleEvents(): void;
        protected draw(): void;
    }
}
declare module EZGUI.Component {
    class Slider extends GUISprite {
        _settings: any;
        themeId: any;
        value: number;
        private slide;
        private horizontalSlide;
        constructor(_settings: any, themeId: any);
        protected setupEvents(): void;
        protected drawText(): void;
        protected handleEvents(): void;
        protected draw(): void;
    }
}
declare module EZGUI.Component {
    class Layout extends GUISprite {
        _settings: any;
        themeId: any;
        guiMask: any;
        constructor(_settings: any, themeId: any);
        protected handleEvents(): void;
        protected draw(): void;
        createChild(childSettings: any, order?: any): any;
        addChildAt(child: any, index: any): PIXI.DisplayObject;
    }
}
declare module EZGUI.Component {
    class Window extends Layout {
        _settings: any;
        themeId: any;
        guiMask: any;
        private titleBar;
        constructor(_settings: any, themeId: any);
        protected draw(): void;
        protected handleEvents(): void;
        setDraggable(val?: boolean): void;
    }
}
declare module EZGUI.Kit {
    class MainScreen extends EZGUI.Component.Window {
        _settings: any;
        themeId: any;
        private buttonsEvents;
        constructor(_settings: any, themeId: any);
        protected parseSettings(): void;
        protected handleEvents(): void;
    }
}
declare module EZGUI.utils.ColorParser {
    function parseToPixiColor(str: any): any;
    function parseToRGB(str: any): any;
}
declare module EZGUI.Component {
    class Button extends GUISprite {
        _settings: any;
        themeId: any;
        constructor(_settings: any, themeId: any);
        protected handleEvents(): void;
    }
}
declare module EZGUI.Component {
    class Checkbox extends Button {
        _settings: any;
        themeId: any;
        protected _checked: boolean;
        protected _checkmark: any;
        checked: boolean;
        text: string;
        constructor(_settings: any, themeId: any);
        protected handleEvents(): void;
        protected draw(): void;
        protected drawText(): void;
    }
}
declare module EZGUI.Component {
    class Radio extends Checkbox {
        _settings: any;
        themeId: any;
        group: any;
        static groups: any;
        checked: boolean;
        constructor(_settings: any, themeId: any);
        private clearGroup();
        protected handleEvents(): void;
        protected draw(): void;
    }
}
declare module EZGUI.Component {
    class List extends Layout {
        _settings: any;
        themeId: any;
        private decelerationItv;
        private decelerationSpeed;
        private tween;
        private slotSize;
        private horizontalSlide;
        constructor(_settings: any, themeId: any);
        protected handleEvents(): void;
        private decelerateScroll(endPos);
        addChildAt(child: any, index: any): PIXI.DisplayObject;
        removeChild(child: any): PIXI.DisplayObject;
        slideBy(value: any, delay?: any): void;
        slideTo(value: any, delay?: any): void;
    }
}
declare module EZGUI {
    class MultistateTilingSprite extends EZGUI.Compatibility.TilingSprite {
        stateTextures: any;
        private currentState;
        constructor(texture: PIXI.Texture, width: number, height: number, states?: any);
        setState(state?: string): void;
    }
}
declare module EZGUI.utils {
    /**
     * check if the the point defined by x and y outside a visible gui element
     *
     */
    function isMasked(x: any, y: any, obj: any): any;
    function getAbsPos(obj: any, from?: any): any;
    function getClientXY(event: any): {
        x: any;
        y: any;
    };
    function getRealPos(event: any): {
        x: number;
        y: number;
    };
    function distance(x: any, y: any, x0: any, y0: any): number;
    function extendJSON(target: any, source: any): void;
    function loadJSON(url: any, cb: any, crossOrigin?: boolean): void;
    function loadXML(url: any, cb: any, crossOrigin?: boolean): void;
}
