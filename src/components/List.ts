module EZGUI.Component {
    export class List extends Layout {


        private decelerationItv;
        private decelerationSpeed;

        private tween;

        private slotSize;

        private horizontalSlide;
  


        constructor(public _settings, public themeId) {
            super(_settings, themeId);

            //this.draghandle = this.uichildren['sbtn1'];
        }

        protected handleEvents() {
            
            var guiObj: any = this;
            var _this = this;

            var ssize;
            this.draggable = this.container;
            if (this._settings.layout && this._settings.layout[1] == null) {
                this.dragConstraint = 'x';
                this.horizontalSlide = true;
                this.slotSize = (this._settings.width / this._settings.layout[0]);
                
            }

            if (this._settings.layout && this._settings.layout[0] == null) {
                this.dragConstraint = 'y';
                this.horizontalSlide = false;
                this.slotSize = (this._settings.height / this._settings.layout[1]);
            }

            
            //console.log(' >>>> ', this.draggable.width, this._settings.width);

            ssize = this.slotSize * this.container.children.length;
            this.dragXInterval[0] = - ssize + this._settings.width / 2;
            this.dragXInterval[1] = this._settings.width / 2;            

            this.dragYInterval[0] = - ssize + this._settings.height / 2;
            this.dragYInterval[1] = this._settings.height / 2;            


            super.handleEvents();


            guiObj.on('mousedown', function (event: any) {
                if (_this.decelerationItv) {
                    clearInterval(_this.decelerationItv);
                    _this.decelerationItv = null
                }

                for (var i = 0; i < _this.container.children.length; i++) {
                    var child:any = _this.container.children[i];
                    if (!(child instanceof GUISprite)) continue;

                    if (!child.mouseInObj(event, child)) continue

                    child.emit('ezgui:mousedown', event);
                    
                }
            });

            guiObj.on('mouseup', function (event: any) {
                if (_this.decelerationItv) return;


                var endPos = utils.getRealPos(event);
                //console.log('slide end ', EZGUI.startDrag.x, EZGUI.startDrag.x, endPos);

                _this.decelerateScroll(endPos);




            });



            //FIXME : Pixi 2 do not trigger mousedown on children events
            //TODO : check mousedown position and propagate the event to the child
        }

        private decelerateScroll(endPos) {
            var _this = this;

            var sign = 0;
            if (_this.dragConstraint != 'y') {
                sign = (<any>Math).sign(endPos.x - EZGUI.startDrag.x);
            }
            if (_this.dragConstraint != 'x') {
                sign = (<any>Math).sign(endPos.y - EZGUI.startDrag.y);
            }

            var x1 = EZGUI.startDrag.x;
            var y1 = EZGUI.startDrag.y;
            var x2 = endPos.x;
            var y2 = endPos.y;
            var distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            var time = Date.now() - EZGUI.startDrag.t;

            var speed = distance / time;


            var timeConstant = 10;
            var amplitude = sign * speed * 150;
            var step = 0;

            var initialPosX = _this.draggable.position.x;
            var initialPosY = _this.draggable.position.y;
            var posX = 0;
            var posY = 0;

            if (_this.decelerationItv) clearInterval(_this.decelerationItv);

            _this.decelerationItv = setInterval(function () {
                var delta = amplitude / timeConstant;

                if (_this.dragConstraint != 'y') {
                    posX += delta;

                    var nextPos = initialPosX + posX;
                    if (nextPos >= _this.dragXInterval[0] && nextPos <= _this.dragXInterval[1])
                        _this.draggable.position.x = nextPos;
                    else clearInterval(_this.decelerationItv);
                }
                if (_this.dragConstraint != 'x') {
                    posY += delta;

                    var nextPos = initialPosY + posY;
                    if (nextPos >= _this.dragYInterval[0] && nextPos <= _this.dragYInterval[1])
                        _this.draggable.position.y = nextPos;
                    else clearInterval(_this.decelerationItv);
                }


                amplitude -= delta;
                step += 1;
                if (step > 6 * timeConstant) {
                    clearInterval(_this.decelerationItv);
                    _this.decelerationItv = null;
                }
            }, 16);

        }


        public addChildAt(child, index) {
            var result = super.addChildAt(child, index);


            if (result instanceof GUISprite) {

                var ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = - ssize + this._settings.width / 2;
                this.dragXInterval[1] = this._settings.width / 2;   

                this.dragYInterval[0] = - ssize + this._settings.height / 2;
                this.dragYInterval[1] = this._settings.height / 2;            

            }

            return result;
        }
        public removeChild(child) {
            var result = super.removeChild(child);
            if (child instanceof GUISprite) {

                var ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = - ssize + this._settings.width / 2;
                this.dragXInterval[1] = this._settings.width / 2;   

                this.dragYInterval[0] = - ssize + this._settings.height / 2;
                this.dragYInterval[1] = this._settings.height / 2;            


                this.draggable.position.x = 0;
                this.draggable.position.y = 0;

            }
            return result;
        }

        public slideBy(value, delay?) {

            delay = delay || Math.abs(value) * 5;
            var _this = this;
            if (_this.dragConstraint != 'y') {
                var nextPos = _this.draggable.position.x + value;

                nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                nextPos = Math.min(nextPos, _this.dragXInterval[1]);

                if (_this.tween) _this.tween.stop();

                _this.tween = new EZGUI.Tween(_this.container.position)
                    .to({ x: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)

                _this.tween.start();

            }
            if (_this.dragConstraint != 'x') {
                var nextPos = _this.draggable.position.y + value;
                nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                nextPos = Math.min(nextPos, _this.dragYInterval[1]);


                if (_this.tween) _this.tween.stop();

                _this.tween = new EZGUI.Tween(_this.container.position)
                    .to({ y: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)
                    

                _this.tween.start();
            }


        }

        public slideTo(value, delay?) {

            

            var _this = this;
            if (_this.dragConstraint != 'y') {
                var nextPos = value;

                delay = delay || Math.abs(value - _this.draggable.position.x) * 5;


                nextPos = Math.max(nextPos, _this.dragXInterval[0]);
                nextPos = Math.min(nextPos, _this.dragXInterval[1]);

                if (_this.tween) _this.tween.stop();

                _this.tween = new EZGUI.Tween(_this.container.position)
                    .to({ x: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)

                _this.tween.start();

            }
            if (_this.dragConstraint != 'x') {
                var nextPos = value;

                delay = delay || Math.abs(value - _this.draggable.position.y) * 5;

                nextPos = Math.max(nextPos, _this.dragYInterval[0]);
                nextPos = Math.min(nextPos, _this.dragYInterval[1]);


                if (_this.tween) _this.tween.stop();

                _this.tween = new EZGUI.Tween(_this.container.position)
                    .to({ y: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)


                _this.tween.start();
            }


        }
    }

    EZGUI.registerComponents(List);
}