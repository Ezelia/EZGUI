/// <reference path="layout.ts" />


module EZGUI.Component {
    export class Window extends Layout {
        public guiMask;

        public titleBar;
        constructor(public settings, public themeId) {
            super(settings, themeId);

        }
        protected draw() {
            var headerCfg = this._settings.header;

            
            if (headerCfg) {
                headerCfg.height = headerCfg.height || 0;
                headerCfg.skin = headerCfg.skin || 'Header';
                this._settings['padding-top'] = headerCfg.height;
                
            }

            super.draw();
            
            
            if (headerCfg) {
                //this.position.y += headerCfg.height;

                if (headerCfg.width == undefined) headerCfg.width = this._settings.width;

                this.titleBar = new GUISprite(headerCfg, this.theme);


                //this.titleBar.position.y -= headerCfg.height - this.settings.padding*2;

                this.originalAddChild(this.titleBar);

                
            }

        }

        protected handleEvents() {
            super.handleEvents();

            if (this._settings.draggable) {
                //if (this.titleBar) this.draghandle = this.titleBar;
                //else this.draghandle = this;

                //this.draggable = this;
                this.setDraggable(true);
            }

        }

        public setDraggable(val=true) {
            if (val) {
                this.draggable = this;

                if (this.titleBar) this.draghandle = this.titleBar;
                else this.draghandle = this;

            }
            else {
                this.draggable = undefined;
                this.draghandle = undefined;
            }
        }

        //public showFromTop(x, y, time = 1000, easing = EZGUI.Easing.Linear.None) {
        //    this.visible = true;
        //    this.position.x = x;
        //    this.position.y = -10 - this.height;
        //    var tween = new EZGUI.Tween(this.position)
        //        .to({ x: x, y: y }, time)
        //        .easing(easing);

        //    tween.start();
        //}

        //public hideToTop(time = 1000, easing = EZGUI.Easing.Linear.None) {
        //    var _this = this;
        //    var x = this.position.x;
        //    var y = -10 - this.height;
        //    var tween = new EZGUI.Tween(this.position)
        //        .to({ x: x, y: y }, time)
        //        .easing(easing)
        //        .onComplete(function () {
        //            _this.visible = false;
        //        });

        //    tween.start();
        //}

        ////
        //public showFromBottom(x, y, time = 1000, easing = EZGUI.Easing.Linear.None) {
        //    this.visible = true;
        //    this.position.x = x;

        //    var ph = this.guiParent ? this.guiParent.height : this.parent.height;
        //    this.position.y = 10 + ph;

        //    var tween = new EZGUI.Tween(this.position)
        //        .to({ x: x, y: y }, time)
        //        .easing(easing);

        //    tween.start();
        //}
        //public hideToBottom(time = 1000, easing = EZGUI.Easing.Linear.None) {
        //    var _this = this;
        //    var x = this.position.x;
        //    var ph = this.guiParent ? this.guiParent.height : this.parent.height;
        //    var y = 10 + ph;
        //    var tween = new EZGUI.Tween(this.position)
        //        .to({ x: x, y: y }, time)
        //        .easing(easing)
        //        .onComplete(function () {
        //        _this.visible = false;
        //    });

        //    tween.start();
        //}
    }

    EZGUI.registerComponents(Window, 'Window');
} 