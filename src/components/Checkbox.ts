/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Checkbox extends Button {
        private _checked: boolean;
        
        private _checkmark: any;
        
        get checked(): boolean {
            return this._checked;
        }
        set checked(chk: boolean) {
            if (chk) {
                this.setState('checked');
                if (this._checkmark) this._checkmark.visible = true;
            }
            else {
                this.setState('default');
                if (this._checkmark) this._checkmark.visible = false;
            }

            this._checked = chk;
        }
          

        constructor(public _settings, public themeId) {
            super(_settings, themeId);



        }



        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var _this = this;

            var _this = this;
            var guiObj: any = this;
            
            


            guiObj.on('mouseover', function (event) {
                //guiObj.alpha = 0.7;
                
            });

            
            //clear parent event
            guiObj.off('mouseout');
            guiObj.on('mouseout', function () {
                
                //prevent state clear
                //if (_this.checked) {
                //    _this.setState('checked');
                //}
                
                //guiObj.alpha = 1;
            })
            guiObj.on('click', function () {
                _this.checked = !_this.checked;
            })
        }

        protected draw() {
            super.draw();


            this._checkmark = this.createThemeImage(this._settings, 'default', 'checkmark');

            if (this._checkmark != null) {
                this.addChild(this._checkmark);
                this._checkmark.visible = false;
                this._checkmark.width = this._settings.width;
                this._checkmark.height = this._settings.height;
            }
        }

        protected drawText() {
            super.drawText();


            if (this.textObj) {
                this.textObj.position.x = this._settings.width;
                this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                
                //console.log(this.textObj.height, this.settings.height);
            }
        }


    }

    EZGUI.registerComponents(Checkbox);
}