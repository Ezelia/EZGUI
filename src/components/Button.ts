/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Button extends GUISprite {
        


                
        
        constructor(public _settings, public themeId) {
            super(_settings, themeId);

            if (_settings.text) this.text = _settings.text;

        }
        protected setupEvents() {
            super.setupEvents();            

            var guiObj: any = this;
            var _this = this;



        }


        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var _this = this;
            var isDown = false;

            //Pixi2 workaround 


            guiObj.on('mousemove', function () {
            });
            guiObj.on('mousedown', function () {
                isDown = true;
                //console.log('down', _this.guiID);
                guiObj.setState('down');
            });
            guiObj.on('mouseup', function () {
                isDown = false;
                //console.log('up', _this.guiID);
                guiObj.setState('default');
            });

            guiObj.on('mouseover', function () {
                //console.log('hover', _this.guiID);
                if (!isDown) guiObj.setState('hover');
            });
            guiObj.on('mouseout', function () {
                //console.log('out', _this.guiID);
                //EZGUI.dragging = null;
                //isDown = false;
                //guiObj.setState('default');
            });
        }

        protected draw() {
            super.draw();


        }
    }

    EZGUI.registerComponents(Button);
}