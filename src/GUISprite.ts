/// <reference path="guiobject.ts" />



module EZGUI {
    export class GUISprite extends GUIObject {
        
        
        public guiID: string;

        public userData: any;

        public draggable: PIXI.Container;
        public draghandle: any;
        public dragConstraint: string;
        public dragXInterval: number[] = [-Infinity, +Infinity];
        public dragYInterval: number[] = [-Infinity, +Infinity];
        public theme: Theme;


        //public container: PIXI.DisplayObjectContainer;

        protected textObj: any;
        protected rootSprite: any;
        

        //get settings(): string {
        //    return this._settings;
        //}

        get text(): string {
            if (this.textObj) return this.textObj.text;
        }
        set text(val: string) {
            if (this.textObj) {
                if (Compatibility.PIXIVersion >= 3) {
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
        }        
  

        public _settings;
        //private savedSettings;

        constructor(public settings, public themeId:any) {
            super();
                //this.container = new Compatibility.GUIContainer();
                //this.addChild(this.container);

            

            this.userData = settings.userData;
            this.name = settings.name;

            if (themeId instanceof Theme) this.theme = themeId;
            else this.theme = EZGUI.themes[themeId];
            
            if (!this.theme || !this.theme.ready) {
                console.error('[EZGUI ERROR]', 'Theme is not ready, nothing to display');
                this.theme = new Theme({});
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


        public erase() {
            this.container.children.length = 0;//clear all children
            this.children.length = 0;
            this.rootSprite = undefined;
        }
        public rebuild() {
            this.erase();

            var _settings = JSON.parse(JSON.stringify(this.settings));

            this._settings = this.theme.applySkin(_settings);

            this.parseSettings();

            this.draw();
            this.drawText();

            this.setupEvents();
            this.handleEvents();
        }


        protected parsePercentageValue(str) {
            if (typeof str != 'string') return NaN;
            var val = NaN;
            var percentToken = str.split('%');
            if (percentToken.length == 2 && percentToken[1] == '') {
                val = parseFloat(percentToken[0]);
            }
            return val;
        }

        protected parseSettings() {
            

        }

        protected prepareChildSettings(settings) {

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
                    if (p != NaN) _settings.width = (this.width - padX) * p / 100;
                }
                if (typeof _settings.height == 'string') {
                    var p = this.parsePercentageValue(_settings.height);
                    if (p != NaN) _settings.height = (this.height -padY) * p / 100;
                }

                if (typeof _settings.position == 'object') {
                    if (typeof _settings.position.x == 'string') {
                        var px = this.parsePercentageValue(_settings.position.x);
                        if (px != NaN) _settings.position.x = (this.width - padX) * px / 100;
                    }

                    if (typeof _settings.position.y == 'string') {
                        var py = this.parsePercentageValue(_settings.position.y);
                        if (py != NaN) _settings.position.y = (this.height - padY) * py / 100;
                    }

                }


            }
            return _settings;
        }

        public setDraggable(val=true) {
            if (val)
                this.draggable = this;
            else
                this.draggable = undefined;
        }

        protected handleEvents() {
            var __this = this;
            //var _this = this;
            
            this.draghandle = __this;
            if (__this._settings.draggable == true) {
                this.draggable = __this;
            }

            if (__this._settings.draggable == 'container') {
                this.draggable = __this.container;
            }

            if (__this._settings.dragX === false) {
                this.dragConstraint = 'y';
            }

            if (__this._settings.dragY === false) {
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
            __this.on('mousedown', function (event: any) {

                if (__this.draggable) {
                    if (__this.mouseInObj(event, __this.draghandle)) {
                        
                    
                        //if PIXI 2 use event else use event.data
                        var data = event.data || event;

                        //guiObj.alpha = 0.9;
                        EZGUI.dragging = __this;
                        //console.log('set dragging', EZGUI.dragging.guiID);

                        var pos = utils.getRealPos(event);

                        EZGUI.dsx = pos.x;
                        EZGUI.dsy = pos.y;


                        EZGUI.startDrag.x = pos.x;
                        EZGUI.startDrag.y = pos.y;

                        
                    }
                    //event.stopped = true;
                }

                //only work in PIXI 3 ?
                



                //guiObj.setState('click');
            });


            __this.on('mouseup', function (event: any) {
                //guiObj.alpha = 1
                EZGUI.dragging = null;
                __this.setState('default');

                

            });


            __this.on('mousemove', function (event) {

                if (EZGUI.dragging) {
                    var dg = (<any>__this.draggable) ? (<any>__this.draggable).guiID : ''
                    //console.log(' * dragging', dg, EZGUI.dragging.guiID, _this.guiID);
                }

                var PhaserDrag = typeof Phaser != 'undefined' && EZGUI.dragging;
                if (__this.draggable && EZGUI.dragging == __this || PhaserDrag) {
                    var pos = utils.getRealPos(event);

                    var dragObg = EZGUI.dragging;
                    var draggable = EZGUI.dragging.draggable;

                    var dpos = utils.getAbsPos(draggable);
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



        }

        /**
         * Main draw function
         */
        protected draw() {
            var settings = this._settings;
            if (settings) {

                this.guiID = settings.id;

                //add reference to component
                if (this.guiID) EZGUI.components[this.guiID] = this;

                
                for (var s = 0; s < Theme.imageStates.length; s++) {
                    var stateId = Theme.imageStates[s];
                    var container = new Compatibility.GUIContainer();
                    var controls = this.createVisuals(settings, stateId);

                    for (var i = 0; i < controls.length; i++) {
                        container.addChild(controls[i]);                        
                    }

                    var texture = EZGUI.Compatibility.createRenderTexture(settings.width, settings.height);
                    //texture.render(container);

                    if (Compatibility.PIXIVersion >= 4) EZGUI.tilingRenderer.render(container, texture);
                    else texture.render(container);

                    //RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)
                    if (!this.rootSprite) {
                        this.rootSprite = new MultistateSprite(texture);
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

                        var btnObj = this.prepareChildSettings(settings.children[i]);// JSON.parse(JSON.stringify(settings.children[i]));

                        var child:any = this.createChild(btnObj, i);


                        if (!child) continue;


                        //if (child.phaserGroup) this.container.addChild(child.phaserGroup);
                        //else this.container.addChild(child);

                        //force call original addChild to prevent conflict with local addchild
                        super.addChild(child);

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
                    var pixiColor = utils.ColorParser.parseToPixiColor(this._settings.color);
                    if (pixiColor >= 0) {
                        this.rootSprite.tint = pixiColor;
                    }
                }
                //move container to top
                this.addChild(this.container);

                this.sortChildren();
            }
            
        }
        
        protected sortChildren() {
            if (!this.container) return;
            var comparator: any = function (a, b) {
                if (a.guiSprite) a = a.guiSprite;
                if (b.guiSprite) b = b.guiSprite;
                a._settings.z = a._settings.z || 0;
                b._settings.z = b._settings.z || 0;

                return a._settings.z - b._settings.z;
            }

            this.container.children.sort(comparator);
        }

        /**
         * Text draw function
         * shared by all components
         */
        protected drawText() {
            
            if (this._settings && this._settings.text!=undefined && this.rootSprite) {
                //var settings = this.theme.applySkin(this._settings);
                var settings = this._settings;

                
                if (Compatibility.BitmapText.fonts && Compatibility.BitmapText.fonts[settings.font.family]) {
                    this.textObj = new Compatibility.BitmapText(this._settings.text, { font: settings.font.size + ' ' + settings.font.family });
                    var pixiColor = utils.ColorParser.parseToPixiColor(settings.font.color);
                    if (pixiColor >= 0) {
                        this.textObj.tint = pixiColor;
                        this.textObj.dirty = true;
                    }

                    
                }
                else {
                    var style = { fontSize: settings.font.size, fontFamily: settings.font.family, fill: settings.font.color};

                    for (var s in settings.font) {
                        if (!style[s])
                            style[s] = settings.font[s];
                    }
                    this.textObj = new PIXI.Text(this._settings.text, style);
                }

                //text.height = this.height;
                
                
                this.textObj.position.x = 0;//(this._settings.width - this.textObj.width) / 2;
                this.textObj.position.y = 0;//(this._settings.height - this.textObj.height) / 2;

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
        }



        
        public createChild(childSettings, order?) {
            if (!childSettings) return null;
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
                if ((parts[0] == 'top' && parts[2] == 'bottom') ||
                    (parts[0] == 'bottom' && parts[2] == 'top') ||
                    (parts[0] == 'left' && parts[2] == 'right') ||
                    (parts[0] == 'right' && parts[2] == 'left')
                    ) {
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
                        if (pos2 === undefined) childSettings.position.x = (this._settings.width - childSettings.width) / 2;
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

                //childSettings.position.x += padLeft;
                //childSettings.position.y += padTop;
            }



            var child = EZGUI.create(childSettings, this.theme);

            return child;
        }


        /**
         * 
         */
        public setState(state= 'default') {
            for (var i = 0; i < this.children.length; i++) {
                var child: any = this.children[i];
                if (child instanceof MultistateSprite /*|| child instanceof MultistateTilingSprite*/) {
                    child.setState(state);
                    
                }
            }
        }

        public animatePosTo(x, y, time = 1000, easing = EZGUI.Easing.Linear.None, callback?) {
            easing = easing || EZGUI.Easing.Linear.None;

            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this.position)
                    .to({ x: x, y: y }, time)
                    .easing(easing)
                    .onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this.position)
                    .to({ x: x, y: y }, time)
                    .easing(easing);
            }

            tween.start();
            return tween;
        }
        public animateSizeTo(w, h, time = 1000, easing = EZGUI.Easing.Linear.None, callback?) {
            easing = easing || EZGUI.Easing.Linear.None;

            if (typeof callback == 'function') {
                var tween = new EZGUI.Tween(this)
                    .to({ width: w, height: h }, time)
                    .easing(easing)
                    .onComplete(callback);
            }
            else {
                var tween = new EZGUI.Tween(this)
                    .to({ width: w, height: h }, time)
                    .easing(easing);
            }

            tween.start();
            return tween;
        }



        /**
         * 
         */
        protected getFrameConfig(config, state) {
            var cfg = JSON.parse(JSON.stringify(config));//if (cfg.texture instanceof PIXI.Texture) return cfg;
            if (typeof cfg == 'string') {
                cfg = { default: cfg };
            }          

            var src = cfg[state] == null ? cfg['default'] : cfg[state];
            var texture;

            if (src.trim() != '') {
                texture = PIXI.Texture.fromFrame(src);
            }

            cfg.texture = texture;

            return cfg;
        }

        protected getComponentConfig(component, part, side, state) {
            //var ctype = this.theme[type] || this.theme['default'];
            var skin = this.theme.getSkin(component);

            if (!skin) return;
            

            var scale = (skin.scale == undefined) ? 1 : skin.scale;
            var rotation = 0;

            //get configuration, if explicit configuration is defined then use it otherwise use theme config
            //var hasSide = this.settings[component + '-' + side] || ctype[component + '-' + side];

            var cfg = this._settings[part + '-' + side] || skin[part + '-' + side] || this._settings[part] || skin[part];

            if (!cfg) return;



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
        }

        protected createThemeCorner(settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);

            if (!cfg || !cfg.texture) return;

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
                if (sprite.position.y != 0) sprite.anchor.y = 1;
                if (sprite.position.x != 0) sprite.anchor.x = 1;
            }

            return sprite;
        }


        protected createThemeSide(settings, side, state) {
            var component = settings.component;
            var cfg = this.getComponentConfig(component, side, '', state);
            if (!cfg || !cfg.texture) return;

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
        }

        protected createThemeBorder(settings, part, side, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, part, side, state);

            if (!cfg || !cfg.texture) return;


            var tlCornerCfg = this.getComponentConfig(component, 'corner', 'tl', state);
            var blCornerCfg = this.getComponentConfig(component, 'corner', 'bl', state);

            if (!tlCornerCfg || !tlCornerCfg.texture) return;
            if (!blCornerCfg || !blCornerCfg.texture) return;
            

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
            var line: any = new EZGUI.Compatibility.TilingSprite(cfg.texture, twidth, theight);
            
            //phaser 2.4 compatibility /////////////////////////////////
            line.fixPhaser24();
            ////////////////////////////////////////////////////////////



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

            line.rotation = cfg.rotation;//180 * Math.PI / 180;

            return line;
        }

        protected createThemeTilableBackground(settings, state) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);

            if (!cfg || !cfg.texture) return;
            //cfg.bgPadding = 0;


            

            //var bg: any = new MultistateTilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2, cfg.textures);
            var bg: any = new EZGUI.Compatibility.TilingSprite(cfg.texture, settings.width - cfg.bgPadding * 2, settings.height - cfg.bgPadding * 2);
            //phaser 2.4 compatibility /////////////////////////////////
            bg.fixPhaser24();
            ////////////////////////////////////////////////////////////


            bg.position.x = cfg.bgPadding;
            bg.position.y = cfg.bgPadding;


            if (settings.bgTiling) {
                if (settings.bgTiling === "x") {

                    bg.tileScale.y = (settings.height - cfg.bgPadding * 2) / cfg.texture.height;
                }

                else if (settings.bgTiling === "y") {

                    bg.tileScale.x = (settings.width - cfg.bgPadding * 2) / cfg.texture.width;
                }

                else if (settings.bgTiling === "xy") {

                    bg.tileScale.y = (settings.height - cfg.bgPadding * 2) / cfg.texture.height;
                    bg.tileScale.x = (settings.width - cfg.bgPadding * 2) / cfg.texture.width;
                }

            }


            

            return bg;
        }

        protected createThemeBackground(settings, state, leftSide, rightSide?) {
            var component = settings.skin || settings.component || 'default';
            var cfg = this.getComponentConfig(component, 'bg', null, state);

            if (!cfg || !cfg.texture) return;
            //cfg.bgPadding = 0;

            //var bg: any = new MultistateSprite(cfg.texture, cfg.textures);
            var bg: any = new PIXI.Sprite(cfg.texture);

            bg.position.x = leftSide.width;
            bg.position.y = 0;

            bg.scale.x = cfg.scale;
            bg.scale.y = cfg.scale;

            bg.width = settings.width - leftSide.width;
            bg.height = settings.height;



            return bg;
        }

        protected createThemeImage(settings, state, imagefield = 'image') {
            var component = settings.skin || settings.component || 'default';
            //var ctype = this.theme[type] || this.theme['default'];
            var ctype = settings;//this.theme.getSkin(component);
            if (ctype[imagefield]) {

                var cfg: any = this.getFrameConfig(ctype[imagefield], state);
                //var img = new MultistateSprite(cfg.texture, cfg.textures);
                var img = new PIXI.Sprite(cfg.texture);

                img.width = settings.width;
                img.height = settings.height;

                return img;
            }

            return null;
        }

        protected createVisuals(settings, state) {
            if (settings.transparent === true) return [];
            //priority to image
            var img = this.createThemeImage(settings, state);

            if (img != null) return [img];


            var controls = [];

            var leftSide = this.createThemeSide(settings, 'left', state);
            var rightSide = this.createThemeSide(settings, 'right', state);


            var bg = this.createThemeTilableBackground(settings, state);
            if (bg) controls.push(bg);


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
                if (tl) controls.push(tl);
                var bl = this.createThemeCorner(settings, 'corner', 'bl', state);
                if (bl) controls.push(bl);

                var lineLeft = this.createThemeBorder(settings, 'line', 'l', state);
                if (lineLeft) controls.push(lineLeft);
            }


            

            if (rightSide) {
                controls.push(rightSide);
            }
            else {
                var tr = this.createThemeCorner(settings, 'corner', 'tr', state);
                if (tr) controls.push(tr);
                var br = this.createThemeCorner(settings, 'corner', 'br', state);
                if (br) controls.push(br);

                var lineRight = this.createThemeBorder(settings, 'line', 'r', state);
                if (lineRight) controls.push(lineRight);

            }



            if (!leftSide && !rightSide) {
                var lineTop = this.createThemeBorder(settings, 'line', 't', state);
                if (lineTop) controls.push(lineTop);

                var lineBottom = this.createThemeBorder(settings, 'line', 'b', state);
                if (lineBottom) controls.push(lineBottom);
            }





            return controls;
        }
   

    }
    EZGUI.registerComponents(GUISprite, 'default');
}
