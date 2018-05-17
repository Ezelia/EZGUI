/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Layout extends GUISprite {
        public guiMask;
        constructor(public settings, public themeId) {
            super(settings, themeId);


            

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

                



                if (this._settings.mask !== false) {

                    var myMask = new (<any>PIXI).Graphics();
                    myMask.beginFill();
                    myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                    myMask.endFill();

                    this.addChild(myMask);

                    if (this._settings.anchor) {
                        myMask.position.x = this.container.position.x + padding;
                        myMask.position.y = this.container.position.y + padding;
                    }

                    this.container.mask = myMask;
                }
                

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
            //console.log('adding ', i);


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
                if (ly == null ) {
                    x = i;
                    y = 0;
                } else if (lx == null) {
                    x = 0;
                    y = i;
                }
                else {

                    

                    var adjust = Math.floor(i / (lx * ly));
                    if (this._settings.dragY === false) {

                        dx += adjust * swidth;
                        dy -= adjust * sheight;

                        //ly = 1;
                    } else if (this._settings.dragX === false) {

                        //lx = 1;
                        //dx -= adjust * this._settings.width;
                        //dy += adjust * this._settings.height;
                    }
                    
                    x = i % lx;
                    y = Math.floor(i / lx);

                }


                ly = ly || 1;
                lx = lx || 1;


                        
                dx += x * (swidth / lx);
                dy += y * (sheight / ly);

            }



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

                childSettings.position = { x: dx, y: dy };

                switch (pos1) {
                    case 'center':
                        childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                        if (pos2 === undefined) childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                        break;
                    case 'bottom':
                        childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                        break;

                }

                switch (pos2) {
                    case 'center':                        
                        childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                        break;
                    case 'right':
                        childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                        break;
                }
            }
            //if (childSettings.position == 'center') {
            //    childSettings.position = { x: 0, y: 0 };
            //    childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
            //    childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;

            //}
            else {
                childSettings.position.x = dx + childSettings.position.x;
                childSettings.position.y = dy + childSettings.position.y;
            }
            
            //console.log(' >> ', dx.toFixed(2), dy.toFixed(2), childSettings.position.x.toFixed(2), childSettings.position.y.toFixed(2));

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
                //console.log('adding ', i);


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



                        var adjust = Math.floor(i / (lx * ly));
                        if (this._settings.dragY === false) {

                            dx += adjust * swidth;
                            dy -= adjust * sheight;

                            //ly = 1;
                        } else if (this._settings.dragX === false) {

                            //lx = 1;
                            //dx -= adjust * this._settings.width;
                            //dy += adjust * this._settings.height;
                        }

                        x = i % lx;
                        y = Math.floor(i / lx);

                    }


                    ly = ly || 1;
                    lx = lx || 1;



                    dx += x * (swidth / lx);
                    dy += y * (sheight / ly);

                }

                var childSettings = child._settings;

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

                    childSettings.position = { x: dx, y: dy };

                    switch (pos1) {
                        case 'center':
                            childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;
                            if (pos2 === undefined) childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'bottom':
                            childSettings.position.y = dy + (this._settings.height / ly) - childSettings.height - this._settings.padding;
                            break;

                    }

                    switch (pos2) {
                        case 'center':
                            childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                            break;
                        case 'right':
                            childSettings.position.x = dx + (this._settings.width / lx) - childSettings.width - this._settings.padding;
                            break;
                    }
                }
                //if (childSettings.position == 'center') {
                //    childSettings.position = { x: 0, y: 0 };
                //    childSettings.position.x = dx + (this._settings.width / lx) / 2 - childSettings.width / 2;
                //    childSettings.position.y = dy + (this._settings.height / ly) / 2 - childSettings.height / 2;

                //}
                else {
                    childSettings.position.x = dx + childSettings.position.x;
                    childSettings.position.y = dy + childSettings.position.y;
                }
  


                child.position.x = childSettings.position.x;
                child.position.y = childSettings.position.y;
  





                
                

                child.guiParent = this;
                if (child.phaserGroup) return this.container.addChild(child.phaserGroup);
                else return this.container.addChild(child);
                                
                //return super.addChild(child);
            }
            else {

                //return Compatibility.GUIDisplayObjectContainer.prototype.addChild.call(this, child, index);
                return super.addChildAt(child, index);
            }
            
        }



    }

    EZGUI.registerComponents(Layout, 'Layout');
}