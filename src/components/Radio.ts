/// <reference path="checkbox.ts" />


module EZGUI.Component {
    
    export class Radio extends Checkbox {
        
        public group = null;

        //static groups: any = {};
        //static selectedFrom: any = {};

        static get groups() {
            return radioGroups;
        }

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
            radioGroups[this.group].selected = this;

        }



        constructor(public settings, public themeId) {
            super(settings, themeId);
            this.group = settings.group;

            if (!radioGroups[this.group]) radioGroups[this.group] = [];

            radioGroups[this.group].push(this);

            if (this._settings.checked === true) 
                this.checked = true;
            
        }



        private clearGroup() {
            if (!radioGroups[this.group]) return;

            for (var i = 0; i < radioGroups[this.group].length; i++) {
                radioGroups[this.group][i].checked = false;
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

    EZGUI.registerComponents(Radio, 'Radio');
}