/// <reference path="ezgui.ts" />


module EZGUI {
    export class MultistateSprite extends PIXI.Sprite {

        public stateTextures: any = {};

        constructor(texture:PIXI.Texture, states?:any) {
            super(texture);

            this.stateTextures['default'] = texture;
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture) {
                        this.stateTextures[s] = tx;
                    }

                }
            }
        }
        public addState(id, texture) {
            this.stateTextures[id] = texture;
        }

        public setState(state= 'default') {
            var sprite: any = this;

            if (!sprite.stateTextures[state]) return;

            if (sprite.texture)
            {
                sprite.texture = sprite.stateTextures[state];
            }
            else {
                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];

            }

            if (sprite._tilingTexture)
                sprite._tilingTexture = sprite.stateTextures[state];


        }
    }
}