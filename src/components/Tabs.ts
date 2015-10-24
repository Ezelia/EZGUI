/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Tabs extends GUISprite {
        public activeChild;
        private tabsBar;

        constructor(public settings, public themeId) {
            super(settings, themeId);            

        }

        protected handleEvents() {
            super.handleEvents();
            var _this = this;


            if (this.tabsBar) {
                for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                    //remove default buttons events
                    _this.tabsBar.container.children[i]._events = {};

                    //console.log(_this.tabsBar.container.children[i]);
                }


                this.tabsBar.bindChildren('click', function (e, tab: Button) {
                    //console.log('clicked ', tab);

                    _this.activate(tab.userData.id);


                    for (var i = 0; i < _this.tabsBar.container.children.length; i++) {
                        _this.tabsBar.container.children[i].setState('default');
                    }
                    tab.setState('down');
                });
            }
        }

        protected draw() {
            //tabs should not have layout positionning
            delete this._settings.layout;
            var tabsH = this._settings.tabHeight || 50

            this._settings['padding-top'] = tabsH;

            var tabsCfg = {
                component: 'Window',
                transparent: true,
                padding: 0,
                position: { x: 0, y: 0 },
                width: this._settings.width,
                height: tabsH,
                layout: [this._settings.children.length,1],
                children: [
                ]
            }

            for (var i = 0; i < this._settings.children.length; i++) {
                var child = { text: this._settings.children[i].title || '', userData: { id: i }, component: 'Button', position: { x: 0, y: 0 }, width: ~~(this._settings.width / this._settings.children.length), height: tabsH };

                tabsCfg.children.push(child);
            }

            this.tabsBar = EZGUI.create(tabsCfg, this.themeId);
            


            //this._settings.children.unshift(tabs);
            super.draw();

            this.addChild(this.tabsBar);
        }

        public createChild(childSettings, order?) {               
            var child = super.createChild(childSettings, order);

            if (!this.activeChild) this.activeChild = child;
                
            if (childSettings.active) {
                
                this.activeChild.visible = false;
                this.activeChild = child;
                this.activeChild.visible = true;

                if (this.tabsBar) this.tabsBar.container.children[order].setState('down');
            }
            else {
                child.visible = false;

                if (this.tabsBar) this.tabsBar.container.children[order].setState('default');
            }


            
            
            return child;
        }

        public activate(idx) {
            if (this.container.children[idx]) {
                this.activeChild.visible = false;
                this.activeChild = this.container.children[idx];
                this.activeChild.visible = true;

                if (this.tabsBar) {
                    for (var i = 0; i < this.tabsBar.container.children.length; i++) {
                        this.tabsBar.container.children[i].setState('default');
                    }
                    this.tabsBar.container.children[idx].setState('down');
                    
                }
            }
        }

    }

    EZGUI.registerComponents(Tabs, 'Tabs');
}