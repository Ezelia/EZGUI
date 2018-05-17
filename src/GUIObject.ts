/// <reference path="ezgui.ts" />
/// <reference path="../lib/pixi.d.ts" />
/// <reference path="multistatesprite.ts" />
/// <reference path="compatibility.ts" />




module EZGUI {
    export class GUIObject extends EZGUI.Compatibility.GUIDisplayObjectContainer {

        public guiID: string;
        get Id(): string {
            return this.guiID;
        }
        set Id(val: string) {
            this.guiID = val;
        }

        public userData: any;
        public name: string;

        public container: PIXI.Container;
        public guiParent: GUISprite;


  



        constructor() {
            super();

            this.container = new Compatibility.GUIContainer();
            this.addChild(this.container);

            
        }
        


        protected setupEvents() {
            var __this: any = this;
            //var _this:any = this;
            

            __this.interactive = true;


            __this.pointerover = function (event) {
            //__this.mouseover = function (event) {
                //console.log('mouseover ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;

                if (!__this.canTrigger(event, __this)) {
                    return;
                }
                //console.log('hover ', guiObj.guiID);

                __this._over = true;
                //guiObj.setState('hover');
                __this.emit('ezgui:mouseover', event, __this);
            }

            //__this.mouseout = function (event) {
            __this.pointerout = function (event) {
                //console.log('mouseout ', _this.guiID);
                //if PIXI 2 use event else use event.data
                var data = event.data || event;

                __this._over = false;
                //guiObj.setState('out');
                __this.emit('ezgui:mouseout', event, __this);

            }

            //handle drag stuff
            //__this.mousedown = __this.touchstart = function (event: any) {
            __this.pointerdown = function (event: any) {
                //console.log('mousedown ', _this.guiID);
                if (!__this.canTrigger(event, __this)) {
                    return;
                }

                var pos = utils.getRealPos(event);
                EZGUI.startDrag.x = pos.x;
                EZGUI.startDrag.y = pos.y;
                EZGUI.startDrag.t = Date.now();

                var data = event.data || event;
                __this.emit('ezgui:mousedown', event, __this);
                //event.stopped = true;

                
            }


            //__this.mouseup = __this.mouseupoutside = __this.touchend = __this.touchendoutside = function (event: any) {
            __this.pointerup = function (event: any) {
                if (!__this.canTrigger(event, __this)) {
                    return;
                }
                var data = event.data || event;
                __this.emit('ezgui:mouseup', event, __this);

                var pos = utils.getRealPos(event);
                if (utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                    __this.emit('ezgui:click', event, __this);

                    if (EZGUI.focused && __this != EZGUI.focused && EZGUI.focused.emit) EZGUI.focused.emit('ezgui:blur');
                    EZGUI.focused = __this;
                    EZGUI.focused.emit('ezgui:focus');
                    
                    event.stopped = true;
                }

            };

            __this.pointermove = function (event) {
            //__this.mousemove = __this.touchmove = function (event) {

                if (__this._over) {
                    if (__this.canTrigger(event, __this)) {
                        __this._over = false;
                        __this.pointerover(event);
                    }
                    else {

                        __this.pointereout(event);

                    }
                }


                if (!__this.canTrigger(event, __this)) {
                    return;
                }
                var data = event.data || event;
                __this.emit('ezgui:mousemove', event, __this);
            }

            EZGUI.Compatibility.copyPointerEvents(__this);

            __this.click = __this.tap = function (event) {
                //console.log('click', _this.guiID);
                //var pos = utils.getRealPos(event);

                //if (utils.distance(pos.x, pos.y, _this.startDrag.x, _this.startDrag.y) > 4) return;

                //if (guiObj.canTrigger(event, guiObj)) guiObj.emit('ezgui:click', event);
            }
            
            if (__this.phaserGroup) {
                __this.phaserGroup.inputEnabled = true;


                //Fix priorityID otherwise, events will not trigger on children
                if (EZGUI.Compatibility.isPhaser24plus) {
                    for (var c in EZGUI.components) {
                        var __this = EZGUI.components[c];
                        if (__this.phaserGroup && __this.phaserGroup.input && __this.guiParent && __this.guiParent.phaserGroup && __this.guiParent.phaserGroup.input) {

                            __this.phaserGroup.input.priorityID = __this.guiParent.phaserGroup.input.priorityID + 1;

                        }
                    }
                }
    
                __this.phaserGroup.events.onInputOver.add(function (target, event) {


                    __this._over = true;
                    //console.log('ezgui:mouseover', event);
                    __this.emit('ezgui:mouseover', event, __this);

                }, this);

                __this.phaserGroup.events.onInputOut.add(function (target, event) {

                    __this._over = false;
                    __this.emit('ezgui:mouseout', event, __this);
                    //console.log('ezgui:mouseout', event);
                }, this);

                __this.phaserGroup.events.onInputDown.add(function (target, event) {
                    if (!__this.canTrigger(event, __this)) {
                        return;
                    }

                    var pos = utils.getRealPos(event);
                    EZGUI.startDrag.x = pos.x;
                    EZGUI.startDrag.y = pos.y;
                    EZGUI.startDrag.t = Date.now();

                    
                    __this.emit('ezgui:mousedown', event, __this);

                    if (!__this.draggable && __this.guiParent && __this.guiParent.draggable) {
                        __this.guiParent.emit('ezgui:mousedown', event, __this);
                    }
                    //    

                    //console.log('ezgui:mousedown', event);
                }, this);

                __this.phaserGroup.events.onInputUp.add(function (target, event) {
                    //if (!_this.canTrigger(event, _this)) {
                    //    return;
                    //}

                    //_this.emit('ezgui:mouseup', event);
                    __this.emit('ezgui:mouseup', event, __this);

                    var pos = utils.getRealPos(event);
                    if (utils.distance(pos.x, pos.y, EZGUI.startDrag.x, EZGUI.startDrag.y) <= 4) {
                        __this.emit('ezgui:click', event, __this);

                        if (EZGUI.focused && __this != EZGUI.focused && EZGUI.focused.emit) EZGUI.focused.emit('ezgui:blur');
                        EZGUI.focused = __this;
                        EZGUI.focused.emit('ezgui:focus');

                        //console.log('ezgui:click', event);
                    }

                    if (!__this.draggable && __this.guiParent && __this.guiParent.draggable) {
                        __this.guiParent.emit('ezgui:mouseup', event, __this);
                    }


                }, this);

                //Phaser.GAMES[0].input.moveCallback = function (pointer, x, y) {
                //    console.log(pointer, x, y);
                //}
                Phaser.GAMES[0].input.mouse.mouseMoveCallback = function (event) {
                    if (__this._over) {
                        if (__this.canTrigger(event, __this)) {

                            __this._over = true;
                            __this.emit('ezgui:mouseover', event, __this);
                        }
                        else {

                            __this._over = false;
                            __this.emit('ezgui:mouseout', event, __this);
                        }
                    }


                    if (!__this.canTrigger(event, __this)) {
                        return;
                    }
                    var data = event.data || event;
                    __this.emit('ezgui:mousemove', event, __this);
                }




                
            }


        }


        public originalAddChildAt(child, index) {
            return super.addChildAt(child, index);
        }
        public originalAddChild(child) {
            return this.originalAddChildAt(child, this.children.length);
        }


        public getChildByName(name) {
            return this.container.getChildByName(name);
        };


        public addChild(child) {
            if (child instanceof GUISprite) {
                //return this.container.addChild(child);
                (<any>child).guiParent = this;

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

            if (!origEvt.target.getBoundingClientRect) return false;


            var bcr = origEvt.target.getBoundingClientRect();
            var px = clientpos.x - bcr.left;
            var py = clientpos.y - bcr.top;

            //var absPos = utils.getAbsPos(guiSprite);

            //if (px < absPos.x || px > absPos.x + guiSprite.width || py < absPos.y || py > absPos.y + guiSprite.height) return false;
            //check if click is in visible zone
            var masked = utils.isMasked(px, py, guiSprite);


            return !masked;

        }



        public on(event, fn, context?):any {
            return super.on('ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        }

        public off(event, fn?, context?):any {
            if (EZGUI.Compatibility.PIXIVersion == 2) {
                if (fn == null && context == null) {
                    (<any>this)._listeners['ezgui:' + event] = [];
                    return;
                }
            }

            return super.off('ezgui:' + event, fn, context);
            //super.on('gui:' + event, cb);
        }

        public bindChildren(event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child:any = this.container.children[i];
                if (child.guiSprite) child = child.guiSprite;
                child.on(event, fn);
            }
        }
        public bindChildrenOfType(_type, event, fn) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child: any = this.container.children[i];
                if (child.guiSprite) child = child.guiSprite;

                if (child instanceof _type) child.on(event, fn);
            }
        }

        public unbindChildren(event, fn?) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child: any = this.container.children[i];
                if (child.guiSprite) child = child.guiSprite;

                child.off(event, fn);
            }
        }
        public unbindChildrenOfType(_type, event, fn?) {
            for (var i = 0; i < this.container.children.length; i++) {
                var child :any= this.container.children[i];
                if (child.guiSprite) child = child.guiSprite;

                if (child instanceof _type) child.off(event, fn);
            }
        }

        public preUpdate() { }
        public update() { }
        public postUpdate() { }
        public destroy() {
            
            if (this.phaserGroup) {
                this.phaserGroup.destroy();
                
            }
            
            if (this.parent && this.parent.removeChild) this.parent.removeChild(this);
            
            delete EZGUI.components[this.guiID];
        }




    }
    //EZGUI.registerComponents(GUISprite, 'default');
}