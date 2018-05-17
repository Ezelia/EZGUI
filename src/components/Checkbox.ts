/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Checkbox extends Button {
        protected _checked: boolean;
        
        protected _checkmark: any;
        

        //Getter & setter for check state
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
          
        //Getter & setter for text vakue which need to be placed on the right
        get text(): string {
            if (this.textObj) return this.textObj.text;
        }
        set text(val: string) {
            if (this.textObj) {
                this.textObj.text = val;

                if (this._settings.anchor) {
                    this.textObj.position.x = 0;
                    this.textObj.position.y = 0;
                    this.textObj.anchor.x = this._settings.anchor.x;
                    this.textObj.anchor.y = this._settings.anchor.y;
                }
                else {
                    this.textObj.position.x = this._settings.width;
                    this.textObj.position.y = (this._settings.height) / 2 - this.textObj.height / 2.5;
                    this.textObj.anchor.x = 0;
                    this.textObj.anchor.y = 0;
                }

            }
        }   



        constructor(public settings, public themeId) {
            super(settings, themeId);



        }



        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            

            var __this = this;
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
                __this.checked = !__this.checked;
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

                if (this._settings.anchor) {
                    this._checkmark.anchor.x = this._settings.anchor.x;
                    this._checkmark.anchor.y = this._settings.anchor.y;
                }
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

    EZGUI.registerComponents(Checkbox, 'Checkbox');
}