var LoadingState = function () {};


LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

LoadingState.prototype = Object.create(Phaser.State.prototype);
LoadingState.prototype.constructor = LoadingState;

LoadingState.prototype.init = function (level_data, next_state, extra_parameters) {
    "use strict";
    this.level_data = level_data;
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;
};

LoadingState.prototype.preload = function () {
    "use strict";
    var assets = this.level_data.assets;
    for (var asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            var asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }

};

LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start(this.next_state, true, false, this.level_data, this.extra_parameters);
};

module.exports = LoadingState;
