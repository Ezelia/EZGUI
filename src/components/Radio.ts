/// <reference path="checkbox.ts" />


module EZGUI.Component {
    
    export class Radio extends Checkbox {
        
        public group = null;

        static groups: any = {};
        static selectedFrom: any = {};


        get checked(): boolean {
            return this._checked;
        }
        set checked(chk: boolean) {
            
            if (chk) {
                this.clearGroup();
                this.setState('checked');
                if (this._checkmark) this._checkmark.visible = true;

            }
            else {
                this.setState('default');
                if (this._checkmark) this._checkmark.visible = false;
            }

            this._checked = chk;
            Radio.selectedFrom[this.group] = this;

        }



        constructor(public _settings, public themeId) {
            super(_settings, themeId);
            this.group = _settings.group;

            if (!Radio.groups[this.group]) Radio.groups[this.group] = [];

            Radio.groups[this.group].push(this);

            if (this._settings.checked === true) 
                this.checked = true;
            
        }

        private clearGroup() {
            if (!Radio.groups[this.group]) return;

            for (var i = 0; i < Radio.groups[this.group].length; i++) {
                Radio.groups[this.group][i].checked = false;
            }
        }

        protected handleEvents() {
            super.handleEvents();
            var _this: any = this;


            //clear default action
            _this.off('click');


            _this.on('click', function (event) {
                _this.checked = true;
                _this.emit('ezgui:checked', event, _this);
            });
        }
        protected draw() {
            super.draw();

        }
    }

    EZGUI.registerComponents(Radio);
}