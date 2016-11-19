/**
 * A Text Object will create a line or multiple lines of text. To split a line you can use '\n' in your text string,
 * or add a wordWrap property set to true and and wordWrapWidth property with a value in the style object.
 *
 * @class Text
 * @extends Sprite
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param [style] {Object} The style parameters
 * @param [style.font] {String} default 'bold 20px Arial' The style and size of the font
 * @param [style.fill='black'] {String|Number} A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'
 * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 * @param [style.stroke] {String|Number} A canvas fillstyle that will be used on the text stroke e.g 'blue', '#FCFF00'
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap, it needs wordWrap to be set to true
 * @param [style.dropShadow=false] {Boolean} Set a drop shadow for the text
 * @param [style.dropShadowColor='#000000'] {String} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
 * @param [style.dropShadowAngle=Math.PI/4] {Number} Set a angle of the drop shadow
 * @param [style.dropShadowDistance=5] {Number} Set a distance of the drop shadow
 * @param [style.lineJoin='miter'] {String} The lineJoin property sets the type of corner created, it can resolve spiked text issue. Default is 'miter' (creates a sharp corner).
 */
PIXI.Text = function (text, style) {
    /**
     * The canvas element that everything is drawn to
     *
     * @property canvas
     * @type HTMLCanvasElement
     */
    this.canvas = document.createElement('canvas');

    /**
     * The canvas 2d context that everything is drawn with
     * @property context
     * @type CanvasRenderingContext2D
     */
    this.context = this.canvas.getContext('2d');

    /**
     * The resolution of the canvas.
     * @property resolution
     * @type Number
     */
    this.resolution = 1;

    PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));

    this.setText(text);
    this.setStyle(style);

};

// constructor
PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
PIXI.Text.prototype.constructor = PIXI.Text;

/**
 * The width of the Text, setting this will actually modify the scale to achieve the value set
 *
 * @property width
 * @type Number
 */
Object.defineProperty(PIXI.Text.prototype, 'width', {
    get: function () {

        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }


        return this.scale.x * this.texture.frame.width;
    },
    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

/**
 * The height of the Text, setting this will actually modify the scale to achieve the value set
 *
 * @property height
 * @type Number
 */
Object.defineProperty(PIXI.Text.prototype, 'height', {
    get: function () {

        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }


        return this.scale.y * this.texture.frame.height;
    },
    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

/**
 * Set the style of the text
 *
 * @method setStyle
 * @param [style] {Object} The style parameters
 * @param [style.font='bold 20pt Arial'] {String} The style and size of the font
 * @param [style.fill='black'] {Object} A canvas fillstyle that will be used on the text eg 'red', '#00FF00'
 * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 * @param [style.stroke='black'] {String} A canvas fillstyle that will be used on the text stroke eg 'blue', '#FCFF00'
 * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
 * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
 * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
 * @param [style.dropShadow=false] {Boolean} Set a drop shadow for the text
 * @param [style.dropShadowColor='#000000'] {String} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
 * @param [style.dropShadowAngle=Math.PI/4] {Number} Set a angle of the drop shadow
 * @param [style.dropShadowDistance=5] {Number} Set a distance of the drop shadow
 * @param [style.lineJoin='miter'] {String} The lineJoin property sets the type of corner created, it can resolve spiked text issue. Default is 'miter' (creates a sharp corner).
 * @param [style.lineHeight] {number} Line height of the text
 */
PIXI.Text.prototype.setStyle = function (style) {
    style = style || {};
    style.font = style.font || 'bold 20pt Arial';
    style.fill = style.fill || 'black';
    style.align = style.align || 'left';
    style.stroke = style.stroke || 'black'; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;

    style.dropShadow = style.dropShadow || false;
    style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
    style.dropShadowDistance = style.dropShadowDistance || 4;
    style.dropShadowColor = style.dropShadowColor || 'black';
    style.lineJoin = style.lineJoin || 'miter';
    style.lineHeight = style.lineHeight || false;

    this.style = style;
    this.dirty = true;
};

/**
 * Set the copy for the text object. To split a line you can use '\n'.
 *
 * @method setText
 * @param text {String} The copy that you would like the text to display
 */
PIXI.Text.prototype.setText = function (text) {
    this.text = text.toString() || ' ';
    this.dirty = true;
};

/**
 * Renders text and updates it when needed
 *
 * @method updateText
 * @private
 */
PIXI.Text.prototype.updateText = function () {
    this.texture.baseTexture.resolution = this.resolution;

    this.context.font = this.style.font;

    var outputText = this.text;

    // word wrap
    // preserve original text
    if (this.style.wordWrap) outputText = this.wordWrap(this.text);

    //split text into lines
    var lines = outputText.split(/(?:\r\n|\r|\n)/);

    //calculate text width
    var lineWidths = [];
    var maxLineWidth = 0;
    var fontProperties = this.determineFontProperties(this.style.font);
    for (var i = 0; i < lines.length; i++) {
        var lineWidth = this.context.measureText(lines[i]).width;
        lineWidths[i] = lineWidth;
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
    }

    var width = maxLineWidth + this.style.strokeThickness;
    if (this.style.dropShadow) width += this.style.dropShadowDistance;

    this.canvas.width = (width + this.context.lineWidth) * this.resolution;

    //calculate text height
    var lineHeight = this.style.lineHeight || fontProperties.fontSize + this.style.strokeThickness;

    var height = lineHeight * lines.length;
    if (this.style.dropShadow) height += this.style.dropShadowDistance;

    this.canvas.height = height * this.resolution;

    this.context.scale(this.resolution, this.resolution);

    if (navigator.isCocoonJS) this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // used for debugging..
    //this.context.fillStyle ="#FF0000"
    //this.context.fillRect(0, 0, this.canvas.width,this.canvas.height);

    this.context.font = this.style.font;
    this.context.strokeStyle = this.style.stroke;
    this.context.lineWidth = this.style.strokeThickness;
    this.context.textBaseline = 'alphabetic';
    this.context.lineJoin = this.style.lineJoin;

    var linePositionX;
    var linePositionY;

    if (this.style.dropShadow) {
        this.context.fillStyle = this.style.dropShadowColor;

        var xShadowOffset = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance;
        var yShadowOffset = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;

        for (i = 0; i < lines.length; i++) {
            linePositionX = this.style.strokeThickness / 2;
            linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

            if (this.style.align === 'right') {
                linePositionX += maxLineWidth - lineWidths[i];
            }
            else if (this.style.align === 'center') {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if (this.style.fill) {
                this.context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
            }

            //  if(dropShadow)
        }
    }

    //set canvas text styles
    this.context.fillStyle = this.style.fill;

    //draw lines line by line
    for (i = 0; i < lines.length; i++) {
        linePositionX = this.style.strokeThickness / 2;
        linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

        if (this.style.align === 'right') {
            linePositionX += maxLineWidth - lineWidths[i];
        }
        else if (this.style.align === 'center') {
            linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }

        if (this.style.stroke && this.style.strokeThickness) {
            this.context.strokeText(lines[i], linePositionX, linePositionY);
        }

        if (this.style.fill) {
            this.context.fillText(lines[i], linePositionX, linePositionY);
        }

        //  if(dropShadow)
    }

    this.updateTexture();
};

/**
 * Updates texture size based on canvas size
 *
 * @method updateTexture
 * @private
 */
PIXI.Text.prototype.updateTexture = function () {
    this.texture.baseTexture.width = this.canvas.width;
    this.texture.baseTexture.height = this.canvas.height;
    this.texture.crop.width = this.texture.frame.width = this.canvas.width;
    this.texture.crop.height = this.texture.frame.height = this.canvas.height;

    this._width = this.canvas.width;
    this._height = this.canvas.height;

    // update the dirty base textures
    this.texture.baseTexture.dirty();
};

/**
* Renders the object using the WebGL renderer
*
* @method _renderWebGL
* @param renderSession {RenderSession} 
* @private
*/
PIXI.Text.prototype._renderWebGL = function (renderSession) {
    if (this.dirty) {
        this.resolution = renderSession.resolution;

        this.updateText();
        this.dirty = false;
    }

    PIXI.Sprite.prototype._renderWebGL.call(this, renderSession);
};

/**
* Renders the object using the Canvas renderer
*
* @method _renderCanvas
* @param renderSession {RenderSession} 
* @private
*/
PIXI.Text.prototype._renderCanvas = function (renderSession) {
    if (this.dirty) {
        this.resolution = renderSession.resolution;

        this.updateText();
        this.dirty = false;
    }

    PIXI.Sprite.prototype._renderCanvas.call(this, renderSession);
};

/**
* Calculates the ascent, descent and fontSize of a given fontStyle
*
* @method determineFontProperties
* @param fontStyle {Object}
* @private
*/
PIXI.Text.prototype.determineFontProperties = function (fontStyle) {
    var properties = PIXI.Text.fontPropertiesCache[fontStyle];

    if (!properties) {
        properties = {};

        var canvas = PIXI.Text.fontPropertiesCanvas;
        var context = PIXI.Text.fontPropertiesContext;

        context.font = fontStyle;

        var width = Math.ceil(context.measureText('|Mq').width);
        var baseline = Math.ceil(context.measureText('M').width);
        var height = 2 * baseline;

        baseline = baseline * 1.4 | 0;

        canvas.width = width;
        canvas.height = height;

        context.fillStyle = '#f00';
        context.fillRect(0, 0, width, height);

        context.font = fontStyle;

        context.textBaseline = 'alphabetic';
        context.fillStyle = '#000';
        context.fillText('|MÉq', 0, baseline);

        var imagedata = context.getImageData(0, 0, width, height).data;
        var pixels = imagedata.length;
        var line = width * 4;

        var i, j;

        var idx = 0;
        var stop = false;

        // ascent. scan from top to bottom until we find a non red pixel
        for (i = 0; i < baseline; i++) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx += line;
            }
            else {
                break;
            }
        }

        properties.ascent = baseline - i;

        idx = pixels - line;
        stop = false;

        // descent. scan from bottom to top until we find a non red pixel
        for (i = height; i > baseline; i--) {
            for (j = 0; j < line; j += 4) {
                if (imagedata[idx + j] !== 255) {
                    stop = true;
                    break;
                }
            }
            if (!stop) {
                idx -= line;
            }
            else {
                break;
            }
        }

        properties.descent = i - baseline;
        //TODO might need a tweak. kind of a temp fix!
        properties.descent += 6;
        properties.fontSize = properties.ascent + properties.descent;

        PIXI.Text.fontPropertiesCache[fontStyle] = properties;
    }

    return properties;
};

/**
 * Applies newlines to a string to have it optimally fit into the horizontal
 * bounds set by the Text object's wordWrapWidth property.
 *
 * @method wordWrap
 * @param text {String}
 * @private
 */
PIXI.Text.prototype.wordWrap = function (text) {
    // Greedy wrapping algorithm that will wrap words as the line grows longer
    // than its horizontal bounds.
    var result = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var spaceLeft = this.style.wordWrapWidth;
        var words = lines[i].split(' ');
        for (var j = 0; j < words.length; j++) {
            var wordWidth = this.context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
                // Skip printing the newline if it's the first word of the line that is
                // greater than the word wrap width.
                if (j > 0) {
                    result += '\n';
                }
                result += words[j];
                spaceLeft = this.style.wordWrapWidth - wordWidth;
            }
            else {
                spaceLeft -= wordWidthWithSpace;
                result += ' ' + words[j];
            }
        }

        if (i < lines.length - 1) {
            result += '\n';
        }
    }
    return result;
};

/**
* Returns the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account.
*
* @method getBounds
* @param matrix {Matrix} the transformation matrix of the Text
* @return {Rectangle} the framing rectangle
*/
PIXI.Text.prototype.getBounds = function (matrix) {
    if (this.dirty) {
        this.updateText();
        this.dirty = false;
    }

    return PIXI.Sprite.prototype.getBounds.call(this, matrix);
};

/**
 * Destroys this text object.
 *
 * @method destroy
 * @param destroyBaseTexture {Boolean} whether to destroy the base texture as well
 */
PIXI.Text.prototype.destroy = function (destroyBaseTexture) {
    // make sure to reset the the context and canvas.. dont want this hanging around in memory!
    this.context = null;
    this.canvas = null;

    this.texture.destroy(destroyBaseTexture === undefined ? true : destroyBaseTexture);
};

PIXI.Text.fontPropertiesCache = {};
PIXI.Text.fontPropertiesCanvas = document.createElement('canvas');
PIXI.Text.fontPropertiesContext = PIXI.Text.fontPropertiesCanvas.getContext('2d');

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * A BitmapText object will create a line or multiple lines of text using bitmap font. To split a line you can use '\n', '\r' or '\r\n' in your string.
 * You can generate the fnt files using
 * http://www.angelcode.com/products/bmfont/ for windows or
 * http://www.bmglyph.com/ for mac.
 *
 * @class BitmapText
 * @extends DisplayObjectContainer
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param style {Object} The style parameters
 * @param style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
 * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
 */
PIXI.BitmapText = function (text, style) {
    PIXI.DisplayObjectContainer.call(this);

    /**
     * [read-only] The width of the overall text, different from fontSize,
     * which is defined in the style object
     *
     * @property textWidth
     * @type Number
     * @readOnly
     */
    this.textWidth = 0;

    /**
     * [read-only] The height of the overall text, different from fontSize,
     * which is defined in the style object
     *
     * @property textHeight
     * @type Number
     * @readOnly
     */
    this.textHeight = 0;

    /**
     * @property _pool
     * @type Array
     * @private
     */
    this._pool = [];

    this.setText(text);
    this.setStyle(style);
    this.updateText();

    /**
     * The dirty state of this object.
     * @property dirty
     * @type Boolean
     */
    this.dirty = false;
};

// constructor
PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;

/**
 * Set the text string to be rendered.
 *
 * @method setText
 * @param text {String} The text that you would like displayed
 */
PIXI.BitmapText.prototype.setText = function (text) {
    this.text = text || ' ';
    this.dirty = true;
};

/**
 * Set the style of the text
 * style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
 * [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single lines of text
 *
 * @method setStyle
 * @param style {Object} The style parameters, contained as properties of an object
 */
PIXI.BitmapText.prototype.setStyle = function (style) {
    style = style || {};
    style.align = style.align || 'left';
    this.style = style;

    var font = style.font.split(' ');
    this.fontName = font[font.length - 1];
    this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;

    this.dirty = true;
    this.tint = style.tint;
};

/**
 * Renders text and updates it when needed
 *
 * @method updateText
 * @private
 */
PIXI.BitmapText.prototype.updateText = function () {
    var data = PIXI.BitmapText.fonts[this.fontName];
    var pos = new PIXI.Point();
    var prevCharCode = null;
    var chars = [];
    var maxLineWidth = 0;
    var lineWidths = [];
    var line = 0;
    var scale = this.fontSize / data.size;

    for (var i = 0; i < this.text.length; i++) {
        var charCode = this.text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(this.text.charAt(i))) {
            lineWidths.push(pos.x);
            maxLineWidth = Math.max(maxLineWidth, pos.x);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
        }

        var charData = data.chars[charCode];

        if (!charData) continue;

        if (prevCharCode && charData.kerning[prevCharCode]) {
            pos.x += charData.kerning[prevCharCode];
        }

        chars.push({ texture: charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset) });
        pos.x += charData.xAdvance;

        prevCharCode = charCode;
    }

    lineWidths.push(pos.x);
    maxLineWidth = Math.max(maxLineWidth, pos.x);

    var lineAlignOffsets = [];

    for (i = 0; i <= line; i++) {
        var alignOffset = 0;
        if (this.style.align === 'right') {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if (this.style.align === 'center') {
            alignOffset = (maxLineWidth - lineWidths[i]) / 2;
        }
        lineAlignOffsets.push(alignOffset);
    }

    var lenChildren = this.children.length;
    var lenChars = chars.length;
    var tint = this.tint || 0xFFFFFF;

    for (i = 0; i < lenChars; i++) {
        var c = i < lenChildren ? this.children[i] : this._pool.pop(); // get old child if have. if not - take from pool.

        if (c) c.setTexture(chars[i].texture); // check if got one before.
        else c = new PIXI.Sprite(chars[i].texture); // if no create new one.

        c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
        c.position.y = chars[i].position.y * scale;
        c.scale.x = c.scale.y = scale;
        c.tint = tint;
        if (!c.parent) this.addChild(c);
    }

    // remove unnecessary children.
    // and put their into the pool.
    while (this.children.length > lenChars) {
        var child = this.getChildAt(this.children.length - 1);
        this._pool.push(child);
        this.removeChild(child);
    }

    this.textWidth = maxLineWidth * scale;
    this.textHeight = (pos.y + data.lineHeight) * scale;
};

/**
 * Updates the transform of this object
 *
 * @method updateTransform
 * @private
 */
PIXI.BitmapText.prototype.updateTransform = function () {
    if (this.dirty) {
        this.updateText();
        this.dirty = false;
    }

    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

PIXI.BitmapText.fonts = {};

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * Holds all information related to an Interaction event
 *
 * @class InteractionData
 * @constructor
 */
PIXI.InteractionData = function () {
    /**
     * This point stores the global coords of where the touch/mouse event happened
     *
     * @property global
     * @type Point
     */
    this.global = new PIXI.Point();

    /**
     * The target Sprite that was interacted with
     *
     * @property target
     * @type Sprite
     */
    this.target = null;

    /**
     * When passed to an event handler, this will be the original DOM Event that was captured
     *
     * @property originalEvent
     * @type Event
     */
    this.originalEvent = null;
};


if (!PIXI.TextureCache) {
    PIXI.TextureCache = {};
    PIXI.Texture.fromFrame = function (frameId)
    {
        var texture = PIXI.TextureCache[frameId];

        if (!texture)
        {
            throw new Error('The frameId "' + frameId + '" does not exist in the texture cache');
        }

        return texture;
    };
}