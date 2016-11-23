var TilePrefab = function (game_state, name, position, properties) {
    "use strict";
    Phaser.TileSprite.call(this, game_state.game, position.x, position.y, properties.width, properties.height, properties.texture);

    this.game_state = game_state;

    this.name = name;

    this.game_state.groups[properties.group].add(this);
    this.frame = +properties.frame;

    this.game_state.prefabs[name] = this;
};

TilePrefab.prototype = Object.create(Phaser.TileSprite.prototype);
TilePrefab.prototype.constructor = TilePrefab;

module.exports = TilePrefab;
