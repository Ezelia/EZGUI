/// <reference path="tween/tween.ts" />
/// <reference path="utils/eventhandler.ts" />

/// <reference path="compatibility.ts" />

/// <reference path="theme.ts" />

module EZGUI {
    export var VERSION = '0.4.2 beta';
    //export var states = ['default', 'hover', 'down', 'checked'];
    export var tilingRenderer;
    
    export var dragging: any;
    export var dsx: number;
    export var dsy: number;
    export var startDrag = { x: null, y: null, t: null };
    export var focused: any;
    export var game;

    export var themes = {};
    export var components:any = {};
    export var radioGroups:any = [];

    export var EventsHelper = new utils.EventHandler();

    export var renderer;
    /**
     * generic settings object
     * accepted parameters
     * crossOrigin : true/false
     */
    export var settings: any = {
        crossOrigin: false
    };

    var _components = {};
    export function registerComponents(cpt, id?) {        
        id = id || cpt.name;
        _components[id] = cpt;
    }


    export function create(settings, theme) {


        var t = settings.component || 'default';
        
        

        var cptConstructor = _components[settings.component] || _components['default'];

        var component;
        if (cptConstructor) {
            component = new cptConstructor(settings, theme);            
        }
        
        return component;
    }


    function tween_animate() {
        requestAnimationFrame(tween_animate);        
        EZGUI.Tween.update();
    }
    tween_animate();


    function showHeader () {

        //use https://github.com/daniellmb/console.style ?


        var isChrome = (navigator.userAgent.indexOf("Chrome") != -1);
        var isFirefox = (navigator.userAgent.indexOf("Firefox") != -1);
        var isIE = (navigator.userAgent.indexOf("MSIE") != -1);

        if (isChrome) {

            //console.log('%cEZGUI', 'font-size:60px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');﻿

            console.log('%cEZ%cGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We %c❤%c HTML5]',
                'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb',
                'font-weight:bold;font-size:20px;color:#000;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb',
                'font-size:12px;font-weight:bold; color: #b33;',
                'font-size:12px;font-weight:bold; color: #000;',
                'font-size:12px;font-weight:bold; color: #fff;background:#f18050',
                'font-size:12px;font-weight:bold; color: #f00;background:#f18050',
                'font-size:12px;font-weight:bold; color: #fff;background:#f18050'
                );﻿
            return;
        }
        if (isFirefox) {

            console.log('%cEZGUI%c v' + EZGUI.VERSION + '%c | http://ezgui.ezelia.com  %c[We ❤ HTML5]',
                'font-weight:bold;font-size:20px;color:#b33;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb',
                'font-size:12px;font-weight:bold; color: #b33;',
                'font-size:12px;font-weight:bold; color: #000;',
                'font-size:12px;font-weight:bold; color: #fff;background:#f18050'
                );
            return;
        }        

        if (window['console']) {
            console.log(' EZGUI v' + EZGUI.VERSION + '   [We <3 HTML5] | http://ezgui.ezelia.com');
        }
        

    }

    showHeader();
}

