/// <reference path="ezgui.ts" />

declare var Phaser;
module EZGUI {
    export class Theme {
        static imageComponents = ['bg', 'corner', 'line', 'side', 'image', 'checkmark'];
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
            var __this = this;
            if (typeof themeConfig == 'string') { //is this an url ?
                __this.url = themeConfig;
                utils.loadJSON(__this.url, function (themeConfig) {
                    __this.themeConfig = themeConfig;
                    __this.initThemeConfig(themeConfig);
                });
            }
            else {

                this.initThemeConfig(themeConfig);
            }


        }
        public override(themeConfig) {
            var _theme = JSON.parse(JSON.stringify(themeConfig));
            for (var t in _theme) {
                if (t == 'default') continue;

                var skin = _theme[t];

                utils.extendJSON(skin, this._default);
            }

            this.parseComponents(_theme);

            
            for (var t in _theme) {
                if (t == 'default') continue;

                var skin = _theme[t];

                this._theme[t] = skin;
                
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

            
            this.parseComponents(this._theme);
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

        private parseComponents(theme) {
            
            for (var i in theme) {
                if (i == '__config__') continue;

                var item = theme[i];

                for (var c = 0; c < Theme.imageComponents.length; c++) {
                    var cc = Theme.imageComponents[c];
                    for (var v = 0; v < Theme.imageVariants.length; v++) {
                        var vv = Theme.imageVariants[v];
                        if (vv != '') cc = cc + '-' + vv;




                        if (item[cc] == undefined) {
                            cc = Theme.imageComponents[c];
                            continue;
                        }

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



                        cc = Theme.imageComponents[c];

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
            var __this = this;
            var onAssetsLoaded = function () {
                __this.ready = true;


                EZGUI.themes[__this.id] = __this;
                var cb;
                while (cb = __this._listeners.pop()) cb();
                
            }
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
                    __this.loadResources(resources, onAssetsLoaded);
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
            var fonts = [];
            var atlasData = {};
            var fontData = {};

            var resToLoad = 0;

            var cacheAtlas = function () {                
                
                for (var i in atlasData) {
                    var atlasJson:any = atlasData[i];
                    var imgUrl = _this.path + atlasJson.meta.image;

                    var baseTx = (<any>PIXI).utils ? (<any>PIXI).utils.TextureCache[imgUrl].baseTexture : (<any>PIXI).TextureCache[imgUrl].baseTexture;

                    for (var f in atlasJson.frames) {
                        var frame = atlasJson.frames[f].frame;
                        var texture = new (<any>PIXI).Texture(baseTx, {
                            x: frame.x,
                            y: frame.y,
                            width: frame.w,
                            height: frame.h
                        });

                        if ((<any>PIXI).utils) {
                            (<any>PIXI).utils.TextureCache[f] = texture;
                        }
                        else {
                            (<any>PIXI).TextureCache[f] = texture;
                        }
                    }


                }

                for (var i in fontData) {
                    var font: any = fontData[i];
                    _this.parseFont(font, PIXI.Texture.fromFrame(font.textureId));
                }

                cb();
            }

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
                    var loader: any = new Phaser.Loader(Phaser.GAMES[0]);
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
                if ((<any>PIXI).loader) {
                    for (var i = 0; i < images.length; i++) {
                        (<any>PIXI).loader.add({ url: images[i], crossOrigin: crossOrigin});
                    }
                    //(<any>PIXI).loader.add(images);
                    (<any>PIXI).loader.load(cacheAtlas);
                }
                else {

                    var loader: any = new (<any>PIXI).AssetLoader(images, crossOrigin);
                    loader.onComplete = cacheAtlas;
                    loader.load();
                }
            }


            for (var i = 0; i < resources.length; i++) {
                var res = resources[i];

                if (res.indexOf('.json') > 0)
                {
                    atlases.push(res);
                    continue;
                }
                if (res.indexOf('.xml') > 0 || res.indexOf('.fnt') > 0)
                {
                    fonts.push(res)
                    continue;
                }

                images.push(res);                
            }

            if (atlases.length > 0) {

                for (var i = 0; i < atlases.length; i++) {
                    var font = atlases[i];
                    resToLoad++;


                    (function (atlasUrl) {
                        utils.loadJSON(atlasUrl, function (atlasjson) {
                            images.push(_this.path + atlasjson.meta.image);
                            resToLoad--;

                            atlasData[atlasUrl] = atlasjson;

                            if (resToLoad <= 0) {
                                //console.log('Atlas loaded ', images);
                                loadImages();
                            }
                        });
                    })(font)
                }

            }


            if (fonts.length > 0) {

                for (var i = 0; i < fonts.length; i++) {
                    var font = fonts[i];
                    resToLoad++;


                    (function (atlasUrl) {
                        utils.loadXML(atlasUrl, function (xmlfont) {
                            var img = xmlfont.getElementsByTagName('page')[0].getAttribute('file');
                            

                            var path = atlasUrl.substring(0, atlasUrl.lastIndexOf('\\') + atlasUrl.lastIndexOf('/') + 2);
                            var src = path + img;


                            //console.log('Fake font load = ', src);
                            

                            images.push(src);

                            resToLoad--;

                            fontData[atlasUrl] = {
                                data: xmlfont, textureId: src
                            }

                            if (resToLoad <= 0) {
                                //console.log('Fonts loaded ', images);
                                loadImages();
                            }
                        });
                    })(font)
                }

            }


            if (atlases.length <= 0 && fonts.length <= 0) {
                loadImages();
            }


            

        }

        private parseFont(resource, texture) {


            var data: any = {};
            var info = resource.data.getElementsByTagName('info')[0];
            var common = resource.data.getElementsByTagName('common')[0];

            data.font = info.getAttribute('face');
            data.size = parseInt(info.getAttribute('size'), 10);
            data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
            data.chars = {};


            var Rectangle: any;
            var BitmapText: any;


            if (PIXI.Rectangle) Rectangle = PIXI.Rectangle;
            else Rectangle = (<any>PIXI).math.Rectangle;
            if (Compatibility.PIXIVersion >= 3) {
                BitmapText = (<any>PIXI).extras.BitmapText;
            }
            else {
                
                BitmapText = (<any>PIXI).BitmapText;
            }

            //parse letters
            var letters = resource.data.getElementsByTagName('char');

            for (var i = 0; i < letters.length; i++) {
                var charCode = parseInt(letters[i].getAttribute('id'), 10);

                var textureRect = new Rectangle(
                    parseInt(letters[i].getAttribute('x'), 10) + texture.frame.x,
                    parseInt(letters[i].getAttribute('y'), 10) + texture.frame.y,
                    parseInt(letters[i].getAttribute('width'), 10),
                    parseInt(letters[i].getAttribute('height'), 10)
                    );

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