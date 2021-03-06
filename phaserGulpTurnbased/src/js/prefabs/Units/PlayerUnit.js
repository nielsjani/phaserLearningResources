var PlayerUnit = function (game_state, name, position, properties) {
    "use strict";
    require('./Unit').call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);
};

PlayerUnit.prototype = Object.create(require('./Unit').prototype);
PlayerUnit.prototype.constructor = PlayerUnit;

PlayerUnit.prototype.act = function () {
    "use strict";
    var unit_index, player_units_menu_items;
    // search for the index of this unit in the player_units_menu
    unit_index = this.game_state.prefabs.player_units_menu.find_item_index(this.name);
    this.game_state.prefabs.player_units_menu.move_selection(unit_index);

    // enable menu for choosing the action
    this.game_state.prefabs.actions_menu.enable();
};

PlayerUnit.prototype.kill = function () {
    "use strict";
    var menu_item_index, menu_item;
    Phaser.Sprite.prototype.kill.call(this);
    // remove from the menu
    menu_item_index = this.game_state.prefabs.player_units_menu.find_item_index(this.name);
    this.game_state.prefabs.player_units_menu.menu_items[menu_item_index].alpha = 0.5;
};

PlayerUnit.prototype.receive_experience = function (experience) {
    "use strict";
    // increase experience
    this.stats.experience += experience;
    var next_level_data = this.game_state.experience_table[this.stats.current_level];
    // if current experience is greater than the necessary to the next level, the unit gains a level
    if (this.stats.experience >= next_level_data.required_exp) {
        this.stats.current_level += 1;
        this.stats.experience = 0;
        // increase unit stats according to new level
        for (var stat in next_level_data.stats_increase) {
            if (next_level_data.stats_increase.hasOwnProperty(stat)) {
                this.stats[stat] += next_level_data.stats_increase[stat];
            }
        }
    }
};

module.exports = PlayerUnit;