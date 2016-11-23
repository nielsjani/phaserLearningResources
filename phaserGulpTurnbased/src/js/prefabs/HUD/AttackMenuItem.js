var AttackMenuItem = function (game_state, name, position, properties) {
    "use strict";
    require('./MenuItem').call(this, game_state, name, position, properties);
};

AttackMenuItem.prototype = Object.create(require('./MenuItem').prototype);
AttackMenuItem.prototype.constructor = AttackMenuItem;

AttackMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.actions_menu.disable();
    // enable enemy units menu so the player can choose the target
    this.game_state.prefabs.enemy_units_menu.enable();
    // save current attack
    var physicalAttack = require('./../Units/PhysicalAttack');
    this.game_state.current_attack = new physicalAttack(this.game_state, this.game_state.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", owner_name: this.game_state.current_unit.name});

};

module.exports = AttackMenuItem;
