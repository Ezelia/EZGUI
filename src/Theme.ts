/// <reference path="ezgui.ts" />

declare var Phaser;
module EZGUI {
    export class Theme {
        static imageComponents = ['bg', 'corner', 'line', 'side', 'image'];
        static imageStates = ['default', 'hover', 'down', 'checked'];
        static imageVariants = ['', 't', 'r', 'b', 'l', 'left', 'right', 'tl', 'tr', 'bl', 'br'];

        private _theme;

        private _default;
        private _listeners = [];

        public ready = false;
        public id: string;

        private url = '';
        private path;

     
        constructor(public themeConfig) {
            var _this = this;
            if (typeof themeConfig == 'string') { //is this an url ?
                _this.url = themeConfig;
                utils.loadJSON(_this.url, function (themeConfig) {
                    _this.themeConfig = themeConfig;
                    _this.initThemeConfig(themeConfig);
                });
            }
            else {

                this.initThemeConfig(themeConfig);
            }


        }

        private fixLimits (target, source) {
            if (typeof source == 'object') {
                if (target.width != undefined && source.maxWidth) target.width = Math.min(target.width, source.maxWidth);
                if (target.height != undefined && source.maxHeight) target.height = Math.min(target.height, source.maxHeight);                        

                for (var i in source) {
                    var src = source[i];
                    if (typeof target[i] == 'object') {
                        this.fixLimits(target[i], source[i]);
                    }
                }
            }

        }
        private initThemeConfig(themeConfig) {
            this._theme = JSON.parse(JSON.stringify(themeConfig));


            this.id = this._theme.__config__ ? this._theme.__config__.name : undefined;
            this._default = this._theme['default'];

            for (var t in this._theme) {
                if (t == 'default') continue;

                var skin = this._theme[t];
                /*
                for (var i in this._default) {
                    if (!skin[i]) skin[i] = JSON.parse(JSON.stringify(this._default[i]));
                }
                */
                utils.extendJSON(skin, this._default);
                

            }
            this.path = this.url.substring(0, this.url.lastIndexOf('/') + 1);

            
            this.parseComponents();
            this.preload();
            
        }

        
        private parseResources() {
            var themeResources = this._theme.__config__.resources;

            
            var resources = [];

            if (!themeResources || themeResources.length <= 0) return resources;

            var resToLoad = 0;

            
            for (var i = 0; i < themeResources.length; i++) {
                var res = themeResources[i];

                if (res.indexOf('http://') == 0 || res.indexOf('https://') == 0 || res.indexOf('file://') == 0 || res.indexOf('/') == 0) continue;
                    
                //TODO : use a path normalizer here
                if (res.indexOf('./') == 0) res = res.substring(2);

                
                if ((<any>PIXI).loader && (<any>PIXI).loader.resources[resources[i]]) {
                    //
                }
                else {
                    resources.push(this.path + res);
                }
            }

            return resources;
        }

        private parseComponents() {
            
            for (var i in this._theme) {
                if (i == '__config__') continue;

                var item = this._theme[i];

                for (var c = 0; c < Theme.imageComponents.length; c++) {
                    var cc = Theme.imageComponents[c];
                    for (var v = 0; v < Theme.imageVariants.length; v++) {
                        var vv = Theme.imageVariants[v];
                        if (vv != '') cc = cc + '-' + vv;




                        if (item[cc] == undefined) continue;

                        if (typeof item[cc] == 'string') {
                            var str = item[cc];
                            item[cc] = this.normalizeResPath(str);
                        }

                        else {

                            for (var s = 0; s < Theme.imageStates.length; s++) {
                                var st = Theme.imageStates[s];
                                var str = item[cc + '-' + st];
                                if (str) {
                                    item[cc + '-' + st] = this.normalizeResPath(str);
                                }

                            }
                        }





                    }
                }

            }
        }


        private normalizeResPath(str) {

            if (str.indexOf('./') != 0) return str;

            str = str.substring(2);
            return this.path + str;
        }



        static load(themes: any[], cb:any=null) {

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


        }
        //experimental Theme transparent preload
        public onReady(cb) {
            if (typeof cb != 'function') return;

            if (this.ready) cb();
            this._listeners.push(cb);
        }
        private preload() {
            var _this = this;
            var onAssetsLoaded = function () {
                _this.ready = true;


                EZGUI.themes[_this.id] = _this;
                var cb;
                while (cb = _this._listeners.pop()) cb();
                
            }
            if (this._theme.__config__ && this._theme.__config__.resources) {


                var resources = this.parseResources();

                if (resources.length == 0) {
                    onAssetsLoaded();
                }
                else {
                    console.log('Theme preloading ', resources);

                    
                    //utils.loadJSON(_this.url, function (themeConfig) {
                    //    _this.themeConfig = themeConfig;
                    //    _this.initThemeConfig(themeConfig);
                    //});
                    _this.loadResources(resources, onAssetsLoaded);
                    //if ((<any>PIXI).loader) {
                    //    (<any>PIXI).loader.add(resources);
                    //    (<any>PIXI).loader.load(onAssetsLoaded);
                    //}
                    //else {

                    //    var loader: any = new PIXI.AssetLoader(resources, false);
                    //    loader.onComplete = onAssetsLoaded;
                    //    loader.load();
                    //}
                    
                }
            }
            else {
                onAssetsLoaded();
            }

        }

        private loadResources(resources, cb) {
            var _this = this;
            var images = [];
            var atlases = [];
            var atlasData = {};

            var atlasToload = 0;

            var cacheAtlas = function () {
                for (var i in atlasData) {
                    var atlasJson:any = atlasData[i];
                    var imgUrl = _this.path + atlasJson.meta.image;

                    var baseTx = (<any>PIXI).utils ? (<any>PIXI).utils.TextureCache[imgUrl].baseTexture : (<any>PIXI).TextureCache[imgUrl].baseTexture;

                    for (var f in atlasJson.frames) {
                        var frame = atlasJson.frames[f].frame;
                        var texture = new PIXI.Texture(baseTx, {
                            x: frame.x,
                            y: frame.y,
                            width: frame.w,
                            height: frame.h
                        });

                        if ((<any>PIXI).utils) {
                            (<any>PIXI).utils.TextureCache[f] = texture;
                        }
                        else {
                            PIXI.TextureCache[f] = texture;
                        }
                    }


                }

                cb();
            }

            var loadImages = function () {

                
                if (typeof Phaser != 'undefined') {
                    console.log('Phaser loader');
                    var loader: any = new Phaser.Loader(Phaser.GAMES[0]);
                    for (var i = 0; i < images.length; i++) {
                        loader.image(images[i], images[i]);
                    }
                    loader.onLoadComplete.add(cacheAtlas);
                    
                    loader.start();
                    return;
                }
                if ((<any>PIXI).loader) {
                    (<any>PIXI).loader.add(images);
                    (<any>PIXI).loader.load(cacheAtlas);
                }
                else {

                    var loader: any = new PIXI.AssetLoader(images, false);
                    loader.onComplete = cacheAtlas;
                    loader.load();
                }
            }


            for (var i = 0; i < resources.length; i++) {
                var res = resources[i];

                if (res.indexOf('.json') > 0) atlases.push(res);
                else images.push(res);                
            }


            for (var i = 0; i < atlases.length; i++) {
                var atlas = atlases[i];
                atlasToload++;


                (function (atlasUrl) {
                    utils.loadJSON(atlasUrl, function (atlasjson) {
                        images.push(_this.path + atlasjson.meta.image);
                        atlasToload--;

                        atlasData[atlasUrl] = atlasjson;

                        if (atlasToload <= 0) {
                            console.log('Atlas loaded ', images);
                            loadImages();
                        }
                    });
                })(atlas)
            }



        }


        public getSkin(skinId) {
            var skin = this._theme[skinId] || this._theme['default'];
            return skin;
        }

        public applySkin(settings) {
            var skinId = settings['skin'] || settings['component'];
            var skin = this._theme[skinId] || this._theme['default'];

            utils.extendJSON(settings, skin);
            this.fixLimits(settings, skin);
            return settings;
        }

    }
}