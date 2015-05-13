﻿module EZGUI.utils {
    /**
     * check if the the point defined by x and y outside a visible gui element
     * 
     */
    export function isMasked(x, y, obj) {
        var parent = obj.parent;
        if (parent == null) return false;
        if (!parent.worldTransform || !parent.guiMask) return isMasked(x, y, parent);
        var tx = parent.worldTransform.tx + parent.guiMask.x;
        var ty = parent.worldTransform.ty + parent.guiMask.y;
        var w = parent.guiMask.width;
        var h = parent.guiMask.height;
        if (x < tx || y < ty || x > tx + w || y > ty + h) return true;

        return isMasked(x, y, parent);

    }
    export function getAbsPos(obj, from = null) {
        //if (EZGUI.Compatibility.PIXIVersion == 3) {
            if (from == null) from = { x: 0, y: 0 };
            from.x += obj.position.x;
            from.y += obj.position.y;
            if (obj.parent != null) return getAbsPos(obj.parent, from);
            return from;
        //}
        //else {
            //return { x: obj.worldTransform.tx, y: obj.worldTransform.ty };
        //}

    }

    export function getClientXY(event) {
        var data = event.data || event;

        var origEvt = event;

        if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
            origEvt = data.originalEvent.changedTouches[0];
        }
        else
            if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent) origEvt = data.originalEvent;
            }

        return { x: origEvt.clientX, y: origEvt.clientY};

    }
    export function getRealPos(event) {
        var data = event.data || event;
        
        
        var origEvt = event;

        if (data.originalEvent && data.originalEvent.changedTouches && data.originalEvent.changedTouches.length > 0) {
            origEvt = data.originalEvent.changedTouches[0];
        }
        else
            if (data.originalEvent && data.originalEvent.touches && data.originalEvent.touches.length > 0) {
                origEvt = data.originalEvent.touches[0];
            }
            else {
                if (data.originalEvent) origEvt = data.originalEvent;
            }

        var bcr = origEvt.target.getBoundingClientRect();

        var px = origEvt.clientX - bcr.left;
        var py = origEvt.clientY - bcr.top;

        return { x: px, y: py };
    }
    export function distance(x, y, x0, y0) {
        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
    };

    export function extendJSON(target, source) {
        if (typeof source == 'object') {
            for (var i in source) {
                var src = source[i];

                if (target[i] == '') {
                    continue;
                }

                if (target[i]) {
                    extendJSON(target[i], source[i]);
                }
                else {
                    target[i] = JSON.parse(JSON.stringify(source[i]));
                }
            }
        }
        
    }

    export function loadJSON(url, cb, crossOrigin=true) {
        var xmlhttp = new XMLHttpRequest();
        

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var jsonContent = JSON.parse(xmlhttp.responseText);
                cb(jsonContent);
            }
        }
        xmlhttp.open("GET", url, crossOrigin);
        xmlhttp.send();
    }

    export function loadXML(url, cb, crossOrigin = true) {
        var xmlhttp = new XMLHttpRequest();


        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var xmlDoc;
                if (window['DOMParser']) {
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
                }
                else // Internet Explorer
                {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlhttp.responseText);
                }


                


                cb(xmlDoc);
            }
        }
        xmlhttp.open("GET", url, crossOrigin);
        xmlhttp.send();



    }


}