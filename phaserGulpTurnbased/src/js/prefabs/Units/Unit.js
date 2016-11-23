var Unit = function (game_state, name, position, properties) {
    "use strict";
    require('./../Prefab').call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);

    this.stats = properties.stats;

    this.attacked_animation = this.game_state.game.add.tween(this);
    this.attacked_animation.to({tint: 0xFF0000}, 200);
    this.attacked_animation.onComplete.add(this.restore_tint, this);
};

Unit.prototype = Object.create(require('./../Prefab').prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.calculate_act_turn = function (current_turn) {
    "use strict";
    // calculate the act turn based on the unit speed
    this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
};

Unit.prototype.receive_damage = function (damage) {
    "use strict";
    this.stats.health -= damage;
    this.attacked_animation.start();
    if (this.stats.health <= 0) {
        this.stats.health = 0;
        this.kill();
    }
};

Unit.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};

Unit.prototype.attack = function (target) {
    "use strict";
    var damage, attack_multiplier, defense_multiplier, action_message_position, action_message_text, attack_message;
    // attack target
    attack_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    defense_multiplier = this.game_state.game.rnd.realInRange(0.8, 1.2);
    damage = Math.round((attack_multiplier * this.stats.attack) - (defense_multiplier * target.stats.defense));
    target.receive_damage(damage);

    // show attack message
    action_message_position = new Phaser.Point(this.game_state.game.world.width / 2, this.game_state.game.world.height * 0.1);
    action_message_text = this.name + " attacks " + target.name + " with " + damage + " damage";
    var actionMessage = require('./../HUD/ActionMessage');
    attack_message = new actionMessage(this.game_state, this.name + "_action_message", action_message_position, {
        group: "hud",
        texture: "rectangle_image",
        scale: {x: 0.75, y: 0.2},
        duration: 1,
        message: action_message_text
    });
};

module.exports = Unit;