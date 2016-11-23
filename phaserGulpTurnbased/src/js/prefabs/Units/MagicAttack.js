var MagicAttack = function (game_state, name, position, properties) {
    "use strict";
    require('./Attack').call(this, game_state, name, position, properties);
    
    this.mana_cost = properties.mana_cost;
};

MagicAttack.prototype = Object.create(require('./Attack').prototype);
MagicAttack.prototype.constructor = MagicAttack;

MagicAttack.prototype.hit = function (target) {
    "use strict";
    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // the attack multiplier for magic attacks is higher
    attack_multiplier = this.game_state.game.rnd.realInRange(0.9, 1.3);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    // calculate damage using the magic attack stat
    damage = Math.max(0, Math.round((attack_multiplier * this.owner.stats.magic_attack) - (defense_multiplier * target.stats.defense)));
    // apply damage
    target.receive_damage(damage);
    
    // reduce the unit mana
    this.game_state.current_unit.stats.mana -= this.mana_cost;
    
    this.show_message(target, damage);
};

module.exports = MagicAttack;