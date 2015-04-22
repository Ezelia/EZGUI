/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Label extends GUISprite {





        constructor(public _settings, public themeId) {
            super(_settings, themeId);

            if (_settings.text) this.text = _settings.text;

        }
        protected setupEvents() {

        }


        protected handleEvents() {

        }

        protected draw() {
            var settings = this._settings;
            if (settings) {

                this.guiID = settings.id;

                if (this.guiID) EZGUI.components[this.guiID] = this;

                this.position.x = settings.position.x;
                this.position.y = settings.position.y;

                this.container = new Compatibility.GUIContainer();

                this.addChild(this.container);

                this.drawText();
            }

        }
    }

    EZGUI.registerComponents(Label);
}