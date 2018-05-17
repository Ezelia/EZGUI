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
            var __this = this;


            if (this.tabsBar) {
                for (var i = 0; i < __this.tabsBar.container.children.length; i++) {
                    //remove default buttons events
                    __this.tabsBar.container.children[i]._events = {};

                    //console.log(_this.tabsBar.container.children[i]);
                }


                this.tabsBar.bindChildren('click', function (e, tab: Button) {
                    //console.log('clicked ', tab);

                    __this.activate(tab.userData.id);


                    for (var i = 0; i < __this.tabsBar.container.children.length; i++) {
                        __this.setTaskbarChildState(i, 'default');
                        //_this.tabsBar.container.children[i].setState('default');
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
                var child = { text: this._settings.children[i].title || '', userData: { id: i }, component: 'Sprite', skin:'Button', position: { x: 0, y: 0 }, width: ~~(this._settings.width / this._settings.children.length), height: tabsH };

                tabsCfg.children.push(child);
            }

            this.tabsBar = EZGUI.create(tabsCfg, this.themeId);
            


            //this._settings.children.unshift(tabs);
            super.draw();

            this.addChild(this.tabsBar);
        }


        //Phaser container children are not instances of EZGUI MultistateSprite but they are parents of EZGUI MultistateSprite
        //we need this function to check the the type before setting state
        private setTaskbarChildState(idx, state) {

            var child = this.tabsBar.container.children[idx];
            if (typeof child.setState == 'function') {
                child.setState(state);

            }
            else {
                var parent = child;
                if (!parent.children || parent.children.length <= 0) return;
                for (var i = 0; i < parent.children.length; i++) {
                    var child: any = parent.children[i];
                    if (typeof child.setState == 'function') {
                        child.setState(state);

                    }
                }
            }
        }

        public createChild(childSettings, order?) {               
            var child = super.createChild(childSettings, order);

            if (!this.activeChild) this.activeChild = child;
                
            if (childSettings.active) {
                
                this.activeChild.visible = false;
                this.activeChild = child;
                this.activeChild.visible = true;

                if (this.tabsBar) this.setTaskbarChildState(order, 'down');// this.tabsBar.container.children[order].setState('down');
            }
            else {
                child.visible = false;

                if (this.tabsBar) this.setTaskbarChildState(order, 'default'); // this.tabsBar.container.children[order].setState('default');
            }


            
            
            return child;
        }

        public activate(idx) {
            if (this.container.children[idx]) {

                var child = Compatibility.isPhaser ? this.container.children[idx]['children'][0] : this.container.children[idx];
                this.activeChild.visible = false;
                this.activeChild = child;
                this.activeChild.visible = true;

                if (this.tabsBar) {
                    for (var i = 0; i < this.tabsBar.container.children.length; i++) {
                        this.setTaskbarChildState(i, 'default');

                        //this.tabsBar.container.children[i].setState('default');
                    }

                    this.setTaskbarChildState(idx, 'down');
                    //this.tabsBar.container.children[idx].setState('down');
                    
                }
            }
        }

    }

    EZGUI.registerComponents(Tabs, 'Tabs');
}