module EZGUI.utils {
    export class EventHandler {
        // ========================================================================================
        private _events: any;


        bind(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event] || [];
            this._events[event].push(fct);
        }
        //same as bind
        on(event, fct, nbcalls?) {
            this._events = this._events || {};
            this._events[event] = this._events[event] || [];
            if (nbcalls) fct.__nbcalls__ = nbcalls;
            this._events[event].push(fct);
        }

        //unbind(event, fct) {
        //    this._events = this._events || {};
        //    //if (event in this._events === false) return;
        //    if (event in this._events === false || typeof this._events[event] != 'array') return;
        //    this._events[event].splice(this._events[event].indexOf(fct), 1);
        //}
        unbind(event, fct) {
            this._events = this._events || {};
            if (event in this._events === false || !this._events[event] || !(this._events[event] instanceof Array)) return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
        }
        unbindEvent(event) {
            this._events = this._events || {};
            this._events[event] = [];
        }
        unbindAll() {
            this._events = this._events || {};
            for (var event in this._events) this._events[event] = false;
        }
        trigger(event, ...args: any[]) {
            this._events = this._events || {};
            if (event in this._events !== false) {
                for (var i = 0; i < this._events[event].length; i++) {
                    var fct = this._events[event][i];
                    fct.apply(this, args);

                    if (fct.__nbcalls__) {
                        fct.__nbcalls__--;
                        if (fct.__nbcalls__ <= 0) this.unbind(event, fct);
                    }
                }
            }
        }

    }
}