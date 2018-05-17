/// <reference path="../components/window.ts" />


module EZGUI.Kit {
    export class MainScreen extends EZGUI.Component.Window {
        private buttonsEvents;
        constructor(public settings, public themeId) {
            super(settings, themeId);
         
            //this.parseSettings();
        }

        protected parseSettings() {
            var txCache = EZGUI.Compatibility.PIXIVersion >= 3 ? (<any>PIXI).utils.TextureCache : (<any>PIXI).TextureCache;
            

            //parse logo
            if (this._settings.logo) {
                if (typeof this._settings.logo == 'string') {
                    if (txCache[this._settings.logo]) {
                        var tx: PIXI.Texture = txCache[this._settings.logo];

                        var px = (this._settings.width - tx.width) / 2;
                        this._settings.header = { position: { x: px, y: 0 }, image: this._settings.logo, height: tx.height, width: tx.width }

                        
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

                        if (maxHeight < btn.height) maxHeight = btn.height;

                        if (btn.event) {
                            this.buttonsEvents[btn.id] = btn.event;
                        }
                    }
                    children.push(btn);
                }

                var yParts = Math.floor( (this._settings.height - this._settings.header.height) / (maxHeight*1.1));
                this._settings.layout = [1, yParts];
                this._settings.children = children;
            }

            this._settings = this.theme.applySkin(this._settings);   
        }

        protected handleEvents() {
            super.handleEvents();

            var __this = this;
            this.bindChildren('click', function (event, btn) {
                if (__this.buttonsEvents && __this.buttonsEvents[btn.Id]) {
                    (<any>__this).emit('ezgui:' + __this.buttonsEvents[btn.Id], event, btn);
                }
            });

        }
    }

    EZGUI.registerComponents(MainScreen, 'MainScreen');
}