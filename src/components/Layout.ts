/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Layout extends GUISprite {
        public guiMask;
        constructor(public _settings, public themeId) {
            super(_settings, themeId);


            

        }

        protected handleEvents() {
            super.handleEvents();

        }

        protected draw() {
            super.draw();
            this.guiMask = { width: 0, height: 0 };
            var settings = this._settings;
            if (settings) {

                var padding = settings.padding || 0;

                


                //if (settings.layout) {

                    var myMask = new PIXI.Graphics();
                    myMask.beginFill();
                    myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                    myMask.endFill();

                    this.addChild(myMask);
                    this.container.mask = myMask;

                //}

                this.guiMask.x = padding;
                this.guiMask.y = padding;
                this.guiMask.width = settings.width - padding * 2;
                this.guiMask.height = settings.height - padding * 2;



            }



            //move container back to the top
            this.addChild(this.container);

        }

        public createChild(childSettings, order?) {
            if (!childSettings) return null;
            var i = order;



            var padTop = this._settings['padding-top'] || this._settings.padding || 0;
            var padLeft= this._settings['padding-left'] || this._settings.padding || 0;

            var swidth = this._settings.width - padLeft;
            var sheight = this._settings.height - padTop;


            var dx = padLeft;
            var dy = padTop;
            var lx = 1;
            var ly = 1;


            if (this._settings.layout != undefined) {
                lx = this._settings.layout[0];
                ly = this._settings.layout[1];

                var x, y;
                //horizontal layout 
                if (ly == null) {
                    x = i;
                    y = 0;
                } else if (lx == null) {
                    x = 0;
                    y = i;
                }
                else {
                    x = i % lx;
                    y = Math.floor(i / lx);
                }

                ly = ly || 1;
                lx = lx || 1;

                //vertical layout ? i : i%lx;
                        
                dx += x * (swidth / lx);
                dy += y * (sheight / ly);
            }


            if (childSettings.position == 'center') {
                childSettings.position = { x: 0, y: 0 };
                childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
            }
            else {
                childSettings.position.x = dx + childSettings.position.x;
                childSettings.position.y = dy + childSettings.position.y;
            }


            var child = EZGUI.create(childSettings, this.theme);

            return child;
        }


        public addChild(child) {
            if (child instanceof GUISprite) {
                return this.addChildAt(child, this.container.children.length);
            }
            else {
                return super.addChild(child);
            }
        }

        public addChildAt(child, index) {
            if (child instanceof GUISprite) {
                var i = index;

                var padTop = this._settings['padding-top'] || this._settings.padding || 0;
                var padLeft = this._settings['padding-left'] || this._settings.padding || 0;

                var swidth = this._settings.width - padLeft;
                var sheight = this._settings.height - padTop;


                var dx = padLeft;
                var dy = padTop;
                var lx = 1;
                var ly = 1;       
                         
                if (this._settings.layout != undefined) {

                    lx = this._settings.layout[0];
                    ly = this._settings.layout[1];

                    var x, y;
                    //horizontal layout 
                    if (ly == null) {
                        x = i;
                        y = 0;
                    } else if (lx == null) {
                        x = 0;
                        y = i;
                    }
                    else {
                        x = i % lx;
                        y = Math.floor(i / lx);
                    }

                    ly = ly || 1;
                    lx = lx || 1;

                    //vertical layout ? i : i%lx;
                        

                    dx += x * (swidth / lx);
                    dy += y * (sheight / ly);


                    child.position.x = dx + (this._settings.width / lx) / 2 - child.width / 2;
                    child.position.y = dy + (this._settings.height / ly) / 2 - child.height / 2;

                }

                
                return this.container.addChild(child);
            }
            else {
                return super.addChildAt(child, index);
            }
            
        }



    }

    EZGUI.registerComponents(Layout);
}