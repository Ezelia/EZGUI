﻿/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Input extends GUISprite {
        private guiMask;

        private domInput: HTMLInputElement;

        public focused: boolean;

        get text(): string {
            if (this.domInput) return this.domInput.value;
            return ""
        }
        set text(val: string) {
            if (this.textObj) {
                var cpos = this.getCaretPosition();
                if (Compatibility.PIXIVersion == 3) {
                    this.textObj.text = val.substr(0, cpos) + '|' + val.substr(cpos);
                }
                else {
                    this.textObj.setText(val.substr(0, cpos) + '|' + val.substr(cpos));
                }
                this.domInput.value = val;
                this.setCaretPosition(cpos);

                if (this._settings.anchor) {
                    this.textObj.position.x = 0;
                    this.textObj.position.y = 0;

                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = this._settings.anchor.x;
                        this.textObj.anchor.y = this._settings.anchor.y;
                    }
                    else {
                        //fake anchor for bitmap font
                        this.textObj.position.x -= this.textObj.width / 2;
                        this.textObj.position.y -= this.textObj.height / 2;
                    }
                }
                else {
                    this.textObj.position.x = (this._settings.width - this.textObj.width) / 2;
                    this.textObj.position.y = (this._settings.height - this.textObj.height) / 2;

                    if (this.textObj.anchor) {
                        this.textObj.anchor.x = 0;
                        this.textObj.anchor.y = 0;
                    }
                }

            }

            this.textObj.position.x = 5;
        } 



        constructor(public _settings, public themeId) {
            super(_settings, themeId);

            if (_settings.text) this.text = _settings.text;

        }

        protected draw() {
            super.draw();


            this.guiMask = { width: 0, height: 0 };
            var settings = this._settings;
            if (settings) {

                var padding = settings.padding || 0;

                var myMask = new PIXI.Graphics();
                myMask.beginFill();
                myMask.drawRect(padding, padding, settings.width - padding * 2, settings.height - padding * 2);
                myMask.endFill();

                this.addChild(myMask);

                if (this._settings.anchor) {
                    myMask.position.x = this.container.position.x + padding;
                    myMask.position.y = this.container.position.y + padding;
                }

                this.container.mask = myMask;
               


                this.guiMask.x = padding;
                this.guiMask.y = padding;
                this.guiMask.width = settings.width - padding * 2;
                this.guiMask.height = settings.height - padding * 2;



            }



            //move container back to the top
            this.addChild(this.container);

            
        }



        protected drawText() {
            this._settings.text = this._settings.text || '';
            super.drawText();
            this.textObj.position.x = 5;
            this.container.addChild(this.textObj);
            //this.textObj
        }
        protected setupEvents() {
            super.setupEvents();

            if (!EZGUI.Device.isMobile && document && document.createElement) {
                this.domInput = document.createElement("input");
                this.domInput.id = this.guiID + "_input";
                this.domInput.style.position = 'absolute';
                this.domInput.style.top = '-100px';
                document.body.appendChild(this.domInput);


                var _this: any = this;
                
                this.domInput.addEventListener('input', function (event) {
                    _this.text = _this.domInput.value;
                    _this.emit('ezgui:change', event, _this);
                });
                this.domInput.addEventListener('keydown', function (event) {
                    _this.text = _this.domInput.value;
                });

                this.domInput.addEventListener('keyup', function (event) {
                    _this.text = _this.domInput.value;
                });
            }
        }

        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var _this = this;
            
            if (EZGUI.Device.isMobile) {
                guiObj.on('click', function () {
                   _this.text = prompt('', _this.text);
                });

                return;
            }

            guiObj.on('focus', function () {
                if (!_this.domInput) return;
                _this.text = _this.domInput.value;
                _this.domInput.focus();

            });
            guiObj.on('blur', function () {
                if (!_this.domInput) return;
                _this.text = _this.domInput.value;
                _this.domInput.blur();
            });

        }

        private getCaretPosition() {
            var ctrl = this.domInput;
            if (!ctrl) return 0;

            var CaretPos = 0;
            // IE Support
            if (document.selection) {

                ctrl.focus();
                var Sel = document.selection.createRange();

                Sel.moveStart('character', -ctrl.value.length);

                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || (<any>ctrl).selectionStart == '0')
                CaretPos = ctrl.selectionStart;

            return (CaretPos);

        }
        private setCaretPosition(pos) {
            var ctrl = this.domInput;
            if (!ctrl) return 0;

            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            }
            else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }


    }

    EZGUI.registerComponents(Input, 'Input');
} 