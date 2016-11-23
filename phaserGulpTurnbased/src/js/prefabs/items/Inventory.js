var Inventory = function (game_state, name, position, properties) {
    "use strict";
    require('./../Prefab').call(this, game_state, name, position, properties);
    
    this.item_classes = {
        "potion": require('./Potion').prototype.constructor
    };

    this.items = [];
};

Inventory.prototype = Object.create(require('./../Prefab').prototype);
Inventory.prototype.constructor = Inventory;

Inventory.prototype.create_menu = function (position) {
    "use strict";
    var menu_items, item_index, item, menu_item, items_menu;
    // create units menu items
    item_index = 0;
    menu_items = [];
    for (item_index = 0; item_index < this.items.length; item_index += 1) {
        item = this.items[item_index];
        var itemMenuItem = require('./../HUD/ItemMenuItem');
        menu_item = new itemMenuItem(this.game_state, item.name + "_menu_item", {x: position.x, y: position.y + item_index * 20}, {group: "hud", text: item.name, style: Object.create(this.game_state.TEXT_STYLE)});
        menu_items.push(menu_item);
    }
    // create units menu
    var menu = require('./../HUD/Menu');
    items_menu = new menu(this.game_state, "items_menu", position, {group: "hud", menu_items: menu_items});
    items_menu.hide();
};

Inventory.prototype.collect_item = function (item_object) {
    "use strict";
    var item = new this.item_classes[item_object.type](this.game_state, item_object.type + this.items.length, {x: 0, y: 0}, item_object.properties);
    this.items.push(item);
};

Inventory.prototype.use_item = function (item_name, target) {
    "use strict";
    // remove item from items list
    for (var item_index = 0; item_index < this.items.length; item_index += 1) {
        if (this.items[item_index].name === item_name) {
            this.items[item_index].use(target);
            this.items.splice(item_index, 1);
            break;
        }
    }
};

module.exports = Inventory;
