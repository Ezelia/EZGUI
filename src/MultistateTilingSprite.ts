module EZGUI {


    export class MultistateTilingSprite extends EZGUI.Compatibility.TilingSprite {

        public stateTextures: any = {};

        private currentState = 'default';
        
        constructor(texture: PIXI.Texture, width:number, height:number, states?: any) {
            super(texture, width, height);

            this.stateTextures['default'] = texture;
            


            
            if (states) {
                for (var s in states) {
                    var tx = states[s];
                    if (tx instanceof PIXI.Texture && !this.stateTextures[s]) {
                        //var mtx:any = new MultistateTilingSprite(tx, width, height);
                        

                        this.stateTextures[s] = tx;
                        

                    }

                }
            }
        }

        public setState(state = 'default') {
            
            
            var sprite: any = this;

            if (!sprite.stateTextures[state] || state == this.currentState) return;
            
            
            if (sprite.texture == sprite.stateTextures[state]) return;
            

            
            if (sprite.texture) {
                sprite.texture = sprite.stateTextures[state];
            }
            
            else {

                if (sprite._texture)
                    sprite._texture = sprite.stateTextures[state];

            }

            
            if (sprite.tilingTexture) sprite.tilingTexture = sprite.stateTextures[state];
            
            if (sprite._tilingTexture) sprite._tilingTexture = sprite.stateTextures[state];
            

            if (EZGUI.Compatibility.PIXIVersion == 2 ) {
                //Fixme : tiling texture on the fly replacement not working in Pixi2

                
                
            }
        }
    }
}