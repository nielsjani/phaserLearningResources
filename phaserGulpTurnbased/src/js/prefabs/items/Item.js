var Item = function (game_state, name, position, properties) {
    "use strict";
    require('./../Prefab').call(this, game_state, name, position, properties);
};

Item.prototype = Object.create(require('./../Prefab').prototype);
Item.prototype.constructor = Item;

Item.prototype.use = function () {
    "use strict";
    // by default the item is destroyed
    this.kill();
};

Item.prototype.kill = function () {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    // remove item from the menu
    var menu_item_index = this.game_state.prefabs.items_menu.find_item_index(this.name);
    var menu_item = this.game_state.prefabs.items_menu.remove_item(menu_item_index);
    menu_item.kill();
};

module.exports = Item;