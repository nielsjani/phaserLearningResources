var EnemyUnit = function (game_state, name, position, properties) {
    "use strict";
    require('./Unit').call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.scale.setTo(-1, 1);
};

EnemyUnit.prototype = Object.create(require('./Unit').prototype);
EnemyUnit.prototype.constructor = EnemyUnit;

EnemyUnit.prototype.act = function () {
    "use strict";
    var target_index, target, damage;
    // randomly choose target
    target_index = this.game_state.rnd.between(0, this.game_state.groups.player_units.countLiving() - 1);
    target = this.game_state.groups.player_units.children[target_index];

    this.attack(target);
};

EnemyUnit.prototype.kill = function () {
    "use strict";
    var menu_item_index, menu_item;
    Phaser.Sprite.prototype.kill.call(this);
    // remove from the menu
    menu_item_index = this.game_state.prefabs.enemy_units_menu.find_item_index(this.name);
    menu_item = this.game_state.prefabs.enemy_units_menu.remove_item(menu_item_index);
    menu_item.kill();
};

module.exports = EnemyUnit;