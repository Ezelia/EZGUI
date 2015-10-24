/// <reference path="../guisprite.ts" />



module EZGUI.Component {
    export class Input extends GUISprite {
        private guiMask;

        private domInput: HTMLInputElement;

        public focused: boolean;

        get text(): string {
            if (this.domInput) return this.domInput.value;
            if (this.textObj) return this.textObj.text;
        }
        set text(val: string) {       
            if (this.domInput) {
                var cpos = this.getCaretPosition();
                this.domInput.value = val;                
                this.setCaretPosition(cpos);
                this.setTextWithCaret(val);
            }

            if (this.textObj) {
                this.textObj.text = val;
            }
        } 

        private setTextWithCaret(val: string, event=null) {
            if (this.textObj) {
                
                if (Compatibility.PIXIVersion == 3) {
                    this.textObj.text = val;
                }
                else {
                    this.textObj.setText(val);
                }

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
            //var cpos = this.getCaretPosition();
            //console.log('setting value ', val, cpos, val.substr(0, cpos - 1), val.substr(cpos));
            //this.domInput.value = val.substr(0, cpos - 1) + val.substr(cpos);

            this.textObj.position.x = 5;
            if (event) (<any>this).emit('ezgui:change', event, this);
        }


        constructor(public settings, public themeId) {
            super(settings, themeId);

            if (settings.text) this.text = settings.text;

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
                this.domInput.value = '';

                document.body.appendChild(this.domInput);


                var _this: any = this;
                
                this.domInput.addEventListener('input', function (event) {

                    var cpos = _this.getCaretPosition();
                    var str: string = _this.domInput.value;                    

                    _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));

                    _this.setTextWithCaret(str, true);
                    
                });
                this.domInput.addEventListener('keydown', function (event) {

                    var cpos = _this.getCaretPosition();
                    var str: string = _this.domInput.value;

                    _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                    
                });

                this.domInput.addEventListener('keyup', function (event) {

                    var cpos = _this.getCaretPosition();
                    var str: string = _this.domInput.value;

                    _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));

                });
            }
        }

        protected handleEvents() {
            super.handleEvents();
            var guiObj: any = this;
            var _this = this;
            
            if (EZGUI.Device.isMobile) {
                guiObj.on('click', function (event) {
                    _this.setTextWithCaret(prompt('', _this.text), event);
                });

                return;
            }

            guiObj.on('focus', function () {
                if (_this.focused) return;
                _this.focused = true;

                if (!_this.domInput) return;
                _this.domInput.value = _this.text;

                

                _this.setCaretPosition(_this.domInput.value.length);
                var cpos = _this.getCaretPosition();
                var str: string = _this.domInput.value;
                _this.setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
                

                _this.domInput.focus();

            });
            guiObj.on('blur', function () {
                if (!_this.focused) return;
                _this.focused = false;

                if (!_this.domInput) return;
                _this.setTextWithCaret(_this.domInput.value);
                //_this.text = _this.text.substr(0, _this.text.length - 1);
                _this.domInput.blur();
            });

        }

        private getCaretPosition() {
            var ctrl = this.domInput;
            if (!ctrl) return 0;

            var CaretPos = 0;
            // IE Support
            if (document['selection']) { //MS specific

                ctrl.focus();
                var Sel = document['selection'].createRange();

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