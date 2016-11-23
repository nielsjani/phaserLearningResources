var Attack = function (game_state, name, position, properties) {
    "use strict";
    require('./../Prefab').call(this, game_state, name, position, properties);
    
    this.owner = this.game_state.prefabs[properties.owner_name];
};

Attack.prototype = Object.create(require('./../Prefab').prototype);
Attack.prototype.constructor = Attack;

Attack.prototype.show_message = function (target, damage) {
    "use strict";
    var action_message_position, action_message_text, attack_message;
    // show attack message
    action_message_position = new Phaser.Point(this.game_state.game.world.width / 2, this.game_state.game.world.height * 0.1);
    action_message_text = this.owner.name + " attacks " + target.name + " with " + damage + " damage";
    var actionMessage = require('./../HUD/ActionMessage');
    attack_message = new actionMessage(this.game_state, this.name + "_action_message", action_message_position, {group: "hud", texture:     "rectangle_image", scale: {x: 0.85, y: 0.2}, duration: 1, message: action_message_text});
};

module.exports = Attack;