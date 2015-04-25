/// <reference path="ezgui.ts" />
/// <reference path="../lib/pixi.d.ts" />
/// <reference path="multistatesprite.ts" />
/// <reference path="compatibility.ts" />




module EZGUI {
    export class GUISprite extends EZGUI.Compatibility.GUIDisplayObjectContainer{
        
        
        public guiID: string;
        public userData: any;

        public draggable: PIXI.DisplayObjectContainer;
        public draghandle: any;
        public dragConstraint: string;
        public dragXInterval: number[] = [-Infinity, +Infinity];
        public dragYInterval: number[] = [-Infinity, +Infinity];
        public theme: Theme;


        public container: PIXI.DisplayObjectContainer;

        protected textObj: any;

        public guiParent: GUISprite;

        get text(): string {
            if (this.textObj) return this.textObj.text;
        }
        set text(val: string) {
            if (this.textObj) this.textObj.text = val;
        }        
  

        constructor(public _settings, public themeId:any) {
            super();

            

            this.userData = _settings.userData;

            if (themeId instanceof Theme) this.theme = themeId;
            else this.theme = EZGUI.themes[themeId];
            
            if (!this.theme || !this.theme.ready) {
                console.error('[EZGUI ERROR]', 'Theme is not ready, nothing to display');
                this.theme = new Theme({});
            }

            
            _settings = this.theme.applySkin(_settings);

            this.draw();



            
            this.setupEvents();
            this.handleEvents();
            
        }



        protected setupEvents() {
            var _this: any = this;
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
                _this.emit('ezgui:mouseover', event);
            }
            _this.mouseout = function (event) {
                //console.log('mouseout ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;

                _this._over = false;
                //guiObj.setState('out');
                _this.emit('ezgui:mouseout', event);

            }

            //handle drag stuff
            _this.mousedown = _this.touchstart = function (event: any) {
                //console.log('mousedown ', _this.guiID);
                if (!_this.canTrigger(event, _this)) {
                    return;
                }

                var pos = utils.getRealPos(event);
                EZGUI.startDrag.x = pos.x;
                EZGUI.startDrag.y = pos.y;
                EZGUI.startDrag.t = Date.now();

                var data = event.data || event;
                _this.emit('ezgui:mousedown', event);
            }


            _this.mouseup = _this.mouseupoutside = _this.touchend = _this.touchendoutside = function (event: any) {
                if (!_this.canTrigger(event, _this)) {
                    return;
                }
                var data = event.data || event;
                _this.emit('ezgui:mouseup', event);

                var pos = utils.getRealPos(event);
                if (utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                    _this.emit('ezgui:click', event);
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
                _this.emit('ezgui:mousemove', event);
            }

            
            _this.click = _this.tap = function (event) {
                //console.log('click', _this.guiID);
                //var pos = utils.getRealPos(event);

                //if (utils.distance(pos.x, pos.y, _this.startDrag.x, _this.startDrag.y) > 4) return;

                //if (guiObj.canTrigger(event, guiObj)) guiObj.emit('ezgui:click', event);
            }
            
            if (_this.phaserGroup) {
                _this.phaserGroup.inputEnabled = true;

                _this.phaserGroup.events.onInputOver.add(function (target, event) {

                                        
                    _this._over = true;
                    //console.log('ezgui:mouseover', event);
                    _this.emit('ezgui:mouseover', event);
                    
                }, this);

                _this.phaserGroup.events.onInputOut.add(function (target, event) {
                    
                    _this._over = false;
                    _this.emit('ezgui:mouseout', event);
                    //console.log('ezgui:mouseout', event);
                }, this);

                _this.phaserGroup.events.onInputDown.add(function (target, event) {
                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }

                    var pos = utils.getRealPos(event);
                    EZGUI.startDrag.x = pos.x;
                    EZGUI.startDrag.y = pos.y;
                    EZGUI.startDrag.t = Date.now();

                    _this.emit('ezgui:mousedown', event);

                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mousedown', event);
                    }
                    //    

                    //console.log('ezgui:mousedown', event);
                }, this);

                _this.phaserGroup.events.onInputUp.add(function (target, event) {
                    //if (!_this.canTrigger(event, _this)) {
                    //    return;
                    //}

                    //_this.emit('ezgui:mouseup', event);
                    _this.emit('ezgui:mouseup', event);

                    var pos = utils.getRealPos(event);
                    if (utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                        _this.emit('ezgui:click', event);
                        //console.log('ezgui:click', event);
                    }

                    if (!_this.draggable && _this.guiParent && _this.guiParent.draggable) {
                        _this.guiParent.emit('ezgui:mouseup', event);
                    }


                }, this);

                //Phaser.GAMES[0].input.moveCallback = function (pointer, x, y) {
                //    console.log(pointer, x, y);
                //}
                Phaser.GAMES[0].input.mouse.mouseMoveCallback = function (event) {
                    if (_this._over) {
                        if (_this.canTrigger(event, _this)) {
                            
                            _this._over = true;                            
                            _this.emit('ezgui:mouseover', event);
                        }
                        else {

                            _this._over = false;
                            _this.emit('ezgui:mouseout', event);
                        }
                    }


                    if (!_this.canTrigger(event, _this)) {
                        return;
                    }
                    var data = event.data || event;
                    _this.emit('ezgui:mousemove', event);
                }

            }


        }
        


        public setDraggable(val=true) {
            if (val)
                this.draggable = this;
            else
                this.draggable = undefined;
        }

        protected handleEvents() {
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
            _this.on('mousedown', function (event: any) {

                if (_this.draggable) {
                    if (_this.mouseInObj(event, _this.draghandle)) {
                        
                    
                        //if PIXI 2 use event else use event.data
                        var data = event.data || event;

                        //guiObj.alpha = 0.9;
                        EZGUI.dragging = _this;
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


            _this.on('mouseup', function (event: any) {
                //guiObj.alpha = 1
                EZGUI.dragging = null;
                _this.setState('default');



            });


            _this.on('mousemove', function (event) {

                if (EZGUI.dragging) {
                    var dg = (<any>_this.draggable) ? (<any>_this.draggable).guiID : ''
                    //console.log(' * dragging', dg, EZGUI.dragging.guiID, _this.guiID);
                }

                var PhaserDrag = typeof Phaser != 'undefined' && EZGUI.dragging;
                if (_this.draggable && EZGUI.dragging == _this || PhaserDrag) {
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
        protected draw() {
            var settings = this._settings;
            if (settings) {

                this.guiID = settings.id;

                if (this.guiID) EZGUI.components[this.guiID] = this;

                var sprite;
                for (var s = 0; s < Theme.imageStates.length; s++) {
                    var stateId = Theme.imageStates[s];
                    var container = new Compatibility.GUIContainer();
                    var controls = this.createVisuals(settings, stateId);

                    for (var i = 0; i < controls.length; i++) {
                        container.addChild(controls[i]);                        
                    }

                    var texture = EZGUI.Compatibility.createRenderTexture(settings.width, settings.height);
                    texture.render(container);
                    if (!sprite) {
                        sprite = new MultistateSprite(texture);
                        this.addChild(sprite);
                    }
                    else {
                        sprite.addState(stateId, texture);
                    }
                }


                //var stateId = 'default';
                //var container = new PIXI.DisplayObjectContainer();
                //var controls = this.createVisuals(settings, stateId);

                //for (var i = 0; i < controls.length; i++) {
                //    container.addChild(controls[i]);
                //}

                //this.addChild(container);


                

                
                //PIXI.Sprite.call( this, texture);

                var padding = settings.padding || 0;




                this.position.x = settings.position.x;
                this.position.y = settings.position.y;


                this.container = new Compatibility.GUIContainer();
                this.addChild(this.container);


                if (settings.children) {
                    for (var i = 0; i < settings.children.length; i++) {

                        var btnObj = JSON.parse(JSON.stringify(settings.children[i]));

                        var child:any = this.createChild(btnObj, i);


                        if (!child) continue;


                        if (child.phaserGroup) this.container.addChild(child.phaserGroup);
                        else this.container.addChild(child);

                        child.guiParent = this;

                    }
                }





            }
            this.drawText();
        }
        

        protected drawText() {

            if (this._settings && this._settings.text) {
                //var settings = this.theme.applySkin(this._settings);
                var settings = this._settings;

                
                this.textObj = new PIXI.Text(this._settings.text, { font: settings.font.size + ' ' + settings.font.family, fill: settings.font.color });

                this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;
                this.textObj.anchor.x = 0;
                this.textObj.anchor.y = 0;
                //text.height = this.height;
                this.container.addChild(this.textObj);
            }
        }


        public originalAddChildAt(child, index) {
            return super.addChildAt(child, index);
        }
        public originalAddChild(child) {
            return this.originalAddChildAt(child, this.children.length);
        }


        public addChild(child) {
            if (child instanceof GUISprite ) {
                //return this.container.addChild(child);
                child.guiParent = this;

                if (child.phaserGroup) return this.container.addChild(child.phaserGroup);
                else return this.container.addChild(child);
            }
            else {
                return super.addChild(child);
            }
        }

        public removeChild(child) {
            if (child instanceof GUISprite) {
                child.guiParent = null;

                if (child.phaserGroup) return this.container.removeChild(child.phaserGroup);
                else return this.container.removeChild(child);
            }
            else {
                return super.removeChild(child);
            }
        }

        public createChild(childSettings, order?) {
            if (!childSettings) return null;
            var i = order;

            if (childSettings.position == 'center') {
                childSettings.position = { x: 0, y: 0 };
                childSettings.position.x =  (this._settings.width  - childSettings.width) / 2;
                childSettings.position.y =  (this._settings.height  - childSettings.height) / 2;
            }
            else {
                childSettings.position.x =  childSettings.position.x;
                childSettings.position.y =  childSettings.position.y;
            }


            var child = EZGUI.create(childSettings, this.theme);

            return child;
        }

        public mouseInObj(event, guiSprite) {
            var data = event.data || event;
            var clientpos = utils.getClientXY(event);

            var origEvt = event;

            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else
                if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                    origEvt = data.originalEvent.touches[0];
                }
                else {
                    if (data.originalEvent) origEvt = data.originalEvent;
                }


            var bcr = origEvt.target.getBoundingClientRect();

            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;

            var absPos = utils.getAbsPos(guiSprite);

            if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height) return false;

            return true;

        }
        public canTrigger(event, guiSprite) {

            var data = event.data || event;
            var clientpos = utils.getClientXY(event);

           
            var origEvt = event;

            if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
                origEvt = data.originalEvent.changedTouches[0];
            }
            else
                if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                    origEvt = data.originalEvent.touches[0];
                }
                else {
                    if (data.originalEvent) origEvt = data.originalEvent;
                }


            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;

            //var absPos = utils.getAbsPos(guiSprite);

            //if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height) return false;
            //check if click is in visible zone
            var masked = utils.isMasked(px, py, guiSprite);


            return !masked;

        }

        public setState(state= 'default') {
            for (var i = 0; i < this.children.length; i++) {
                var child: any = this.children[i];
                if (child instanceof MultistateSprite /*|| child instanceof MultistateTilingSprite*/) {
                    child.setState(state);
                    
                }
            }
        }
        public on(event, fn, context?) {
            return super.on('ezgui:' + event, fn, context);
           //super.on('gui:' + event, cb);
        }
        public off(event, fn?, context?) {
            if (EZGUI.Compatibility.PIXIVersion == 2) {
                if (fn == null && context == null) {
                    (<any>this)._listeners['ezgui:' + event] = [];
                    return;
                }
            }

            return super.off('ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        }


        public preUpdate() { }
        public update() { }
        public postUpdate() { }
        public destroy() { }

        //protected getFrameConfig(config) {
        //    var cfg = JSON.parse(JSON.stringify(config));//if (cfg.texture instanceof PIXI.Texture) return cfg;
        //    if (typeof cfg == 'string') {
        //        cfg = { default: cfg };
        //    }          
            
        //    //add state testures
        //    //if (!cfg['default']) cfg['default'] = cfg.img;
        //    if (!cfg.out) cfg.out = cfg.default;
        //    if (!cfg.click) cfg.click = cfg.hover;
        //    var texture = PIXI.Texture.fromFrame(cfg.default);
        //    var textures = {};
        //    for (var t in cfg) {
        //        textures[t] = cfg[t] ? PIXI.Texture.fromFrame(cfg[t]) : texture;
        //    }
        //    cfg.texture = texture;
        //    cfg.textures = textures;
                          
        //    return cfg;
        //}


        protected getFrameConfig(config, state) {
            var cfg = JSON.parse(JSON.stringify(config));//if (cfg.texture instanceof PIXI.Texture) return cfg;
            if (typeof cfg == 'string') {
                cfg = { default: cfg };
            }          

            var src = cfg[state] == null ? cfg['default'] : cfg[state];
            var texture;

            if (src.trim() != '') texture = PIXI.Texture.fromFrame(src);

            cfg.texture = texture;

            return cfg;
        }
        //protected getTilingFrameConfig(config) {
        //    var cfg = JSON.parse(JSON.stringify(config));//if (cfg.texture instanceof PIXI.Texture) return cfg;
        //    if (typeof cfg == 'string') {
        //        cfg = { default: cfg };
        //    }          
            
        //    //add state testures
        //    //if (!cfg['default']) cfg['default'] = cfg.img;
        //    if (!cfg.out) cfg.out = cfg.default;
        //    if (!cfg.click) cfg.click = cfg.hover;
        //    var texture = PIXI.Texture.fromFrame(cfg.default);
        //    var textures = {};
        //    for (var t in cfg) {
        //        textures[t] = cfg[t] ? PIXI.Texture.fromFrame(cfg[t]) : texture;
        //    }
        //    cfg.texture = texture;
        //    cfg.textures = textures;

        //    return cfg;
        //}
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
            var skin = this.theme.getSkin(component);
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


            

            //var ctype = this.theme[type] || this.theme['default'];
            var ctype = this.theme.getSkin(component);
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
            var ctype = this.theme.getSkin(component);
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