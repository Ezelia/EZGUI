/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Button extends GUISprite {
        
        

                
        
        constructor(public settings, public themeId) {
            super(settings, themeId);

            if (settings.text) this.text = settings.text;

        }

        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            //var _this = this;
            var isDown = false;

            


            //guiObj.on('mousemove', function () {
            //});
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


                //temporary workaround for phaser
                if (!EZGUI.Compatibility.isPhaser) {
                    isDown = false;
                    guiObj.setState('default');
                }
            });
        }


    }

    EZGUI.registerComponents(Button, 'Button');
}