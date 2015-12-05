/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Label extends GUISprite {





        constructor(public settings, public themeId) {
            super(settings, themeId);

            if (settings.text) this.text = settings.text;

        }


        protected setupEvents() {
            //clear events
        }


        protected handleEvents() {
            //clear event handlers
        }
        protected drawText() {
            this._settings.text = this._settings.text || '';
            super.drawText();
        }

        protected draw() {
            
            var settings = this._settings;
            if (settings) {

                this.guiID = settings.id;

                if (this.guiID) EZGUI.components[this.guiID] = this;

                this.position.x = settings.position.x;
                this.position.y = settings.position.y;

                this.rootSprite = new Compatibility.GUIContainer();

                
                this.addChild(this.rootSprite);

                //this.drawText();
            }

        }
    }

    EZGUI.registerComponents(Label, 'Label');
}