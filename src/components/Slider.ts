/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Slider extends GUISprite {

        get value(): number {
            if (this.horizontalSlide) {
                return this.slide.position.x / (this.width - this.slide.width);
            }
            else {
                return 1 + this.slide.position.y / (this.slide.height - this.height);
            }
        }
        set value(val: number) {
            val = Math.max(0, val);
            val = Math.min(val, 1);

            if (this.horizontalSlide) {
                this.slide.position.x = val * (this.width - this.slide.width);
            } else {
                this.slide.position.y = (val-1) * (this.slide.height - this.height);
            }
        }        
          
        
        private slide;
        private horizontalSlide;
        constructor(public settings, public themeId) {
            super(settings, themeId);            

        }
        protected setupEvents() {
            super.setupEvents();

            var guiObj: any = this;
            

        }

        protected drawText() {
            //prevent text drawing
        }


        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var __this:any = this;


            if (Compatibility.isPhaser) {
                guiObj.on('mousemove', function () {
                });
                guiObj.on('mousedown', function (event, any) {
                    if (__this.canTrigger(event, __this.slide)) {
                        __this.slide.emit('ezgui:mousedown', event);
                    }
                });
                guiObj.on('mouseup', function () {
                    if (__this.canTrigger(event, __this.slide)) {
                        __this.slide.emit('ezgui:mouseup', event);
                    }
                });

                guiObj.on('mouseover', function () {
                });
                guiObj.on('mouseout', function () {

                });
            }
            this.slide.on('mousemove', function () {
                if (EZGUI.dragging == __this.slide) {
                    __this.emit('ezgui:value', __this.value);
                }
            });
        }

        protected draw() {
            super.draw();

            var cfg: any = this._settings.slide;
            cfg.component = 'Button';
            cfg.skin = 'Slide';
            cfg.position = { x: 0, y: 0 };
            cfg.draggable = true;

            //{ id: 'slide1', component: 'Button', position: { x: 0, y: 0 }, width: 30, height: this.height, draggable: true };

            var dir = this._settings.dir;
            if (this._settings.height > this._settings.width) this._settings.dir = 'v';
            else this._settings.dir = 'h';

            if (this._settings.dir == 'v') {
                cfg.dragX = false;
                
                this.horizontalSlide = false;
            }
            else {
                
                cfg.dragY = false;
                this.horizontalSlide = true;
                
            }



            this.slide = EZGUI.create(cfg, this.theme);

            this.slide.dragXInterval = [0, this.width - this.slide.width];
            this.slide.dragYInterval = [0, this.height - this.slide.height];

            this.value = 0;
            this.container.addChild(this.slide);


        }
    }

    EZGUI.registerComponents(Slider, 'Slider');
}