/// <reference path="checkbox.ts" />


module EZGUI.Component {
    var radioGroup:any = {};
    export class Radio extends Checkbox {
        
        public group = null;

        constructor(public _settings, public themeId) {
            super(_settings, themeId);
            this.group = _settings.group;

            if (!radioGroup[this.group]) radioGroup[this.group] = [];

            radioGroup[this.group].push(this);
        }

        private clearGroup() {
            if (!radioGroup[this.group]) return;

            for (var i = 0; i < radioGroup[this.group].length; i++) {
                radioGroup[this.group][i].checked = false;
            }
        }

        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var _this = this;

            var _this = this;
            var guiObj: any = this;

            //clear default action
            guiObj.off('click');


            guiObj.on('click', function () {
                if (_this.group == null) return;
                _this.clearGroup();
                _this.checked = true;


            })
        }
        protected draw() {
            super.draw();

        }
    }

    EZGUI.registerComponents(Radio);
}