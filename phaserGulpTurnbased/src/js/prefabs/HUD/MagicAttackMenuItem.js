var MagicAttackMenuItem = function (game_state, name, position, properties) {
    "use strict";
    require('./MenuItem').call(this, game_state, name, position, properties);
    
    this.MANA_COST = 10;
};

MagicAttackMenuItem.prototype = Object.create(require('./MenuItem').prototype);
MagicAttackMenuItem.prototype.constructor = MagicAttackMenuItem;

MagicAttackMenuItem.prototype.select = function () {
    "use strict";
    // use only if the current unit has enough mana
    if (this.game_state.current_unit.stats.mana >= this.MANA_COST) {
        // disable actions menu
        this.game_state.prefabs.actions_menu.disable();
        // enable enemy units menu so the player can choose the target
        this.game_state.prefabs.enemy_units_menu.enable();
        // save current attack
        var MagicAttack = require('./../Units/MagicAttack');
        this.game_state.current_attack = new MagicAttack(this.game_state, this.game_state.current_unit.name + "_attack", {x: 0, y: 0}, {group: "attacks", mana_cost: this.MANA_COST, owner_name: this.game_state.current_unit.name});
    }
};

module.exports = MagicAttackMenuItem;