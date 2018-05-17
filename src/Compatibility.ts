/// <reference path="polyfills/ie.ts" />


//declare var __extends;


module EZGUI.Compatibility {
    
    export var PIXIVersion = 2;

    if (PIXI.VERSION.indexOf('v3.') == 0 || PIXI.VERSION.indexOf('3.') == 0) PIXIVersion = 3;
    if (PIXI.VERSION.indexOf('v4.') == 0 || PIXI.VERSION.indexOf('4.') == 0) PIXIVersion = 4;
        
    export var isPhaser = (typeof Phaser != 'undefined');
    export var isPhaser24 = isPhaser && Phaser.VERSION.indexOf('2.4') == 0;
    export var isPhaser25 = isPhaser && Phaser.VERSION.indexOf('2.5') == 0;
    export var isPhaser26 = isPhaser && Phaser.VERSION.indexOf('2.6') == 0;
    export var isPhaser24plus = isPhaser24 || isPhaser25 || isPhaser26;


    export var BitmapText = PIXIVersion >= 3 ? (<any>PIXI).extras.BitmapText : (<any>PIXI).BitmapText;




    export class TilingSprite {
        constructor(texture: PIXI.Texture, width: number, height: number) {
        }
    }


    export class GUIContainer extends PIXI.Container {

    }

    if (PIXIVersion >= 3) {
        Compatibility['GUIContainer'] = <any>PIXI['Container'];
    }
    else {
        Compatibility['GUIContainer'] = <any>PIXI['DisplayObjectContainer'];
    }


    export class GUIDisplayObjectContainer extends GUIContainer {
        public phaserGroup;
        static globalPhaserGroup;
        public _listeners;
        constructor() {
            super();
            if (typeof Phaser != 'undefined') {
                var game = Phaser.GAMES[0];
                if (!GUIDisplayObjectContainer.globalPhaserGroup)
                    GUIDisplayObjectContainer.globalPhaserGroup = new Phaser.Group(game, game.stage, 'guigroup');

                this.phaserGroup = GUIDisplayObjectContainer.globalPhaserGroup.create(0, 0);//new Phaser.Group(Phaser.GAMES[0]);
                this.phaserGroup.addChild(this);
                this.phaserGroup.guiSprite = this;

                
            }
            
        }

    }

    //var dummy:any = (function (_super) {
    //    __extends(GUIDisplayObjectContainer, _super);
    //    function GUIDisplayObjectContainer() {
    //        _super.call(this, [Phaser.GAMES[0]]);
    //    }
    //    return GUIDisplayObjectContainer;
    //})(Phaser.Group);
    
    //Compatibility['GUIDisplayObjectContainer'] = dummy;


    export function createRenderTexture(width, height) {

        if (!EZGUI.tilingRenderer) {
            if (EZGUI.Compatibility.PIXIVersion >= 3) {
                EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
            }
            else {
                if (!isPhaser)
                    EZGUI.tilingRenderer = new PIXI.CanvasRenderer(game);
            }
        }

        var texture;
        if (EZGUI.Compatibility.PIXIVersion >= 4) {
            texture = (<any>PIXI.RenderTexture).create(width, height);//new PIXI.RenderTexture(EZGUI.tilingRenderer, width, height);
        }
        else if (EZGUI.Compatibility.PIXIVersion == 3) {
            texture = new (<any>PIXI).RenderTexture(EZGUI.tilingRenderer, width, height);
        }
        else {            
            texture = new (<any>PIXI).RenderTexture(width, height, EZGUI.tilingRenderer);
            
            
        }

        return texture;
    }


    /*
     * 
     * this function is used to fix Phaser 2.4 compatibility
     * it need to be attached to onLoadComplete of phaser's loader to copy loaded resources to PIXI.TextureCache
     */
    export function fixCache(resources) {

        if (!EZGUI.Compatibility.isPhaser24plus || !this._fileList) return;
        for (var i = 0; i < this._fileList.length; i++) {
            if (!resources || resources.length == 0 || resources.indexOf(this._fileList[i].key) >= 0) {
                
                var tx = new PIXI.Texture(new (<any>PIXI).BaseTexture(this._fileList[i].data));
                (<any>PIXI).TextureCache[this._fileList[i].key] = tx;
            }
        }
    }


    export function copyPointerEvents(obj) {
        if (EZGUI.Compatibility.PIXIVersion <= 3) {
            obj.mouseover = obj.pointerover;
            obj.mouseout = obj.pointerout;
            obj.mousedown = obj.pointerdown;
            obj.mouseup = obj.pointerup;
            obj.mousemove = obj.pointermove;
        }
    }
}



if (EZGUI.Compatibility.PIXIVersion >= 3) {

    //register EZGUI to the plugin Interface to get reference to the main renderer     
    function EZGUIPluginInterface(renderer) {
        
        EZGUI.renderer = renderer;
        EZGUI.tilingRenderer = renderer;
        
    }
    
    (<any>PIXI.CanvasRenderer).registerPlugin('EZGUI', EZGUIPluginInterface);
    (<any>PIXI.WebGLRenderer).registerPlugin('EZGUI', EZGUIPluginInterface);

    
    //(<any>PIXI['utils'])._saidHello = true;
    if (typeof PIXI.utils.skipHello === 'function') PIXI.utils.skipHello();
    //EZGUI.tilingRenderer = new PIXI.WebGLRenderer();
    //EZGUI.tilingRenderer = new PIXI.CanvasRenderer();
    EZGUI.Compatibility.TilingSprite = ((<any>PIXI).extras).TilingSprite;
    //(<any>PIXI['utils'])._saidHello = false;
}
else {

    //EZGUI.tilingRenderer = new PIXI.CanvasRenderer();

    EZGUI.Compatibility.TilingSprite = (<any>PIXI).TilingSprite;
}



EZGUI.Compatibility.TilingSprite.prototype['fixPhaser24'] = function () {
    if (EZGUI.Compatibility.isPhaser24plus) {
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
}




if ((<any>PIXI).EventTarget) {
    (<any>PIXI).EventTarget.mixin(EZGUI.Compatibility.GUIDisplayObjectContainer.prototype);
}
else {
    if (EZGUI.Compatibility.isPhaser) {
        var proto: any = EZGUI.Compatibility.GUIDisplayObjectContainer.prototype;

        proto.on = function (event, fct) {
            this._listeners = this._listeners || {};
            this._listeners[event] = this._listeners[event] || [];
            this._listeners[event].push(fct);
        }
        proto.off = function (event, fct?) {
            this._listeners = this._listeners || {};
            if (!fct) {
                this._listeners[event] = [];
            }
            else {
                //if (event in this._listeners === false || typeof this._listeners[event] != 'array') return;
                if (event in this._listeners === false || !(this._listeners[event] instanceof Array)) return;
                this._listeners[event].splice(this._listeners[event].indexOf(fct), 1);
            }
        }
        proto.emit = function (event, ...args: any[]) {
            
            

            this._listeners = this._listeners || {};
            if (event in this._listeners !== false) {
                for (var i = 0; i < this._listeners[event].length; i++) {
                    var fct = this._listeners[event][i];
                    fct.apply(this, args);

                    if (fct.__nbcalls__) {
                        fct.__nbcalls__--;
                        if (fct.__nbcalls__ <= 0) this.unbind(event, fct);
                    }
                }
            }

            

        }
    }
}