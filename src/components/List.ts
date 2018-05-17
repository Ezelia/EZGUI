module EZGUI.Component {
    export class List extends Layout {


        private decelerationItv;
        private decelerationSpeed;

        private tween;

        private slotSize;

        private horizontalSlide;
  


        constructor(public settings, public themeId) {
            super(settings, themeId);

            //this.draghandle = this.uichildren['sbtn1'];
        }

        protected handleEvents() {
            
            var __this: any = this;
            

            var ssize;
            this.draggable = this.container;
            if (__this._settings.dragY === false || ( this._settings.layout && this._settings.layout[1] == null)) {
                this.dragConstraint = 'x';
                this.horizontalSlide = true;
                this.slotSize = (this._settings.width / this._settings.layout[0]);
                
            }

            if (__this._settings.dragX === false || (this._settings.layout && this._settings.layout[0] == null)) {
                this.dragConstraint = 'y';
                this.horizontalSlide = false;
                this.slotSize = (this._settings.height / this._settings.layout[1]);
            }

            if (this._settings.layout && this._settings.layout[0] != null && this._settings.layout[1] != null) {
                if (__this._settings.dragY === false) {
                    this.slotSize = this.slotSize / this._settings.layout[1];
                }
                if (__this._settings.dragX === false) {
                    this.slotSize = this.slotSize / this._settings.layout[0];
                }
            }
            
            //console.log(' >>>> ', this.draggable.width, this._settings.width);
            
            ssize = this.slotSize * this.container.children.length;
            this.dragXInterval[0] = - ssize + this._settings.width * 0.5;
            this.dragXInterval[1] = this._settings.width *0.2;            

            this.dragYInterval[0] = - ssize + this._settings.height * 0.5;
            this.dragYInterval[1] = this._settings.height *0.2;            


            super.handleEvents();


            __this.on('mousedown', function (event: any) {
                if (__this.decelerationItv) {
                    clearInterval(__this.decelerationItv);
                    __this.decelerationItv = null
                }

                for (var i = 0; i < __this.container.children.length; i++) {
                    var child:any = __this.container.children[i];
                    if (!(child instanceof GUISprite)) continue;
                    if (!child.mouseInObj(event, child)) continue;
                    if (!child.canTrigger(event, child)) continue;
                    
                    

                    child.emit('ezgui:mousedown', event);
                    
                }
            });

            __this.on('mouseup', function (event: any) {
                if (__this.decelerationItv) return;


                var endPos = utils.getRealPos(event);
                //console.log('slide end ', EZGUI.startDrag.x, EZGUI.startDrag.x, endPos);

                __this.decelerateScroll(endPos);




            });
            

        }

        private decelerateScroll(endPos) {
            var __this = this;

            var sign = 0;
            if (__this.dragConstraint != 'y') {
                sign = (<any>Math).sign(endPos.x - EZGUI.startDrag.x);
            }
            if (__this.dragConstraint != 'x') {
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

            var initialPosX = __this.draggable.position.x;
            var initialPosY = __this.draggable.position.y;
            var posX = 0;
            var posY = 0;

            if (__this.decelerationItv) clearInterval(__this.decelerationItv);

            __this.decelerationItv = setInterval(function () {
                //console.log('.');
                var delta = amplitude / timeConstant;

                if (__this.dragConstraint != 'y') {
                    posX += delta;

                    var nextPos = initialPosX + posX;
                    if (nextPos >= __this.dragXInterval[0] && nextPos <= __this.dragXInterval[1])
                        __this.draggable.position.x = nextPos;
                    else clearInterval(__this.decelerationItv);
                }
                if (__this.dragConstraint != 'x') {
                    posY += delta;

                    var nextPos = initialPosY + posY;
                    if (nextPos >= __this.dragYInterval[0] && nextPos <= __this.dragYInterval[1])
                        __this.draggable.position.y = nextPos;
                    else clearInterval(__this.decelerationItv);
                }


                amplitude -= delta;
                step += 1;
                if (step > 6 * timeConstant) {
                    clearInterval(__this.decelerationItv);
                    __this.decelerationItv = null;
                }
            }, 16);

        }



        public addChildAt(child, index) {
            var result = super.addChildAt(child, index);


            if (result instanceof GUISprite) {

                var ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = - ssize + this._settings.width * 0.5;
                this.dragXInterval[1] = this._settings.width * 0.2;

                this.dragYInterval[0] = - ssize + this._settings.height * 0.9;
                this.dragYInterval[1] = this._settings.height * 0.1;           

            }

            return result;
        }

        public removeChild(child) {
            var result = super.removeChild(child);
            if (child instanceof GUISprite) {

                var ssize = this.slotSize * this.container.children.length;
                this.dragXInterval[0] = - ssize + this._settings.width * 0.5;
                this.dragXInterval[1] = this._settings.width * 0.2;

                this.dragYInterval[0] = - ssize + this._settings.height * 0.9;
                this.dragYInterval[1] = this._settings.height * 0.1;             


                this.draggable.position.x = 0;
                this.draggable.position.y = 0;

            }
            return result;
        }

        public slideBy(value, delay?) {

            delay = delay || Math.abs(value) * 5;
            var __this = this;
            if (__this.dragConstraint != 'y') {
                var nextPos = __this.draggable.position.x + value;

                nextPos = Math.max(nextPos, __this.dragXInterval[0]);
                nextPos = Math.min(nextPos, __this.dragXInterval[1]);

                if (__this.tween) __this.tween.stop();

                __this.tween = new EZGUI.Tween(__this.container.position)
                    .to({ x: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)

                __this.tween.start();

            }
            if (__this.dragConstraint != 'x') {
                var nextPos = __this.draggable.position.y + value;
                nextPos = Math.max(nextPos, __this.dragYInterval[0]);
                nextPos = Math.min(nextPos, __this.dragYInterval[1]);


                if (__this.tween) __this.tween.stop();

                __this.tween = new EZGUI.Tween(__this.container.position)
                    .to({ y: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)
                    

                __this.tween.start();
            }


        }

        public slideTo(value, delay?) {

            

            var __this = this;
            if (__this.dragConstraint != 'y') {
                var nextPos = value;

                delay = delay || Math.abs(value - __this.draggable.position.x) * 5;


                nextPos = Math.max(nextPos, __this.dragXInterval[0]);
                nextPos = Math.min(nextPos, __this.dragXInterval[1]);

                if (__this.tween) __this.tween.stop();

                __this.tween = new EZGUI.Tween(__this.container.position)
                    .to({ x: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)

                __this.tween.start();

            }
            if (__this.dragConstraint != 'x') {
                var nextPos = value;

                delay = delay || Math.abs(value - __this.draggable.position.y) * 5;

                nextPos = Math.max(nextPos, __this.dragYInterval[0]);
                nextPos = Math.min(nextPos, __this.dragYInterval[1]);


                if (__this.tween) __this.tween.stop();

                __this.tween = new EZGUI.Tween(__this.container.position)
                    .to({ y: nextPos }, delay)
                    .easing(EZGUI.Easing.Cubic.Out)


                __this.tween.start();
            }


        }
    }

    EZGUI.registerComponents(List, 'List');
}