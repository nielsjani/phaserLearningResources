var ItemMenuItem = function (game_state, name, position, properties) {
    "use strict";
    require('./MenuItem').call(this, game_state, name, position, properties);
};

ItemMenuItem.prototype = Object.create(require('./MenuItem').prototype);
ItemMenuItem.prototype.constructor = ItemMenuItem;

ItemMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.items_menu.disable();
    // enable player units menu so the player can choose the target
    this.game_state.prefabs.player_units_menu.enable();
    // save selected item
    this.game_state.current_item = this.text;
};

module.exports = ItemMenuItem;