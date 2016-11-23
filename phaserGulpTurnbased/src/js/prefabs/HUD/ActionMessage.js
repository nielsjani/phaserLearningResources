var ActionMessage = function () {};


ActionMessage = function (game_state, name, position, properties) {
    "use strict";
    require('./../Prefab').call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    // create message text
    var textPrefab = require('./../TextPrefab');
    this.message_text = new textPrefab(this.game_state, this.name + "_message", position, {group: "hud", text: properties.message, style: Object.create(this.game_state.TEXT_STYLE)});
    this.message_text.anchor.setTo(0.5);
    
    // start timer to destroy the message
    this.kill_timer = this.game_state.game.time.create();
    this.kill_timer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
    this.kill_timer.start();
};

ActionMessage.prototype = Object.create(require('./../Prefab').prototype);
ActionMessage.prototype.constructor = ActionMessage;

ActionMessage.prototype.kill = function () {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    // when the message is destroyed, call next turn
    this.message_text.kill();
    this.game_state.next_turn();
};
module.exports = ActionMessage;
