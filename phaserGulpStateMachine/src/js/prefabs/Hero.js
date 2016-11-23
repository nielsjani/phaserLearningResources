var Hero = function (game_state, name, position, properties) {
    "use strict";
    require('./Prefab').call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;
    this.jumping_speed = +properties.jumping_speed;

    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    // create state machine and add states
    var stateMachine = require('./../state_machine/StateMachine');
    var standingState = require('./../state_machine/StandingState');
    var walkingState = require('./../state_machine/WalkingState');
    var jumpingState = require('./../state_machine/JumpingState');
    this.state_machine = new stateMachine();
    this.state_machine.add_state("standing", new standingState("standing", this, 3));
    this.state_machine.add_state("walking_left", new walkingState("walking_left", this, -1, this.walking_speed));
    this.state_machine.add_state("walking_right", new walkingState("walking_left", this, 1, this.walking_speed));
    this.state_machine.add_state("jumping", new jumpingState("jumping", this, this.jumping_speed));
    this.state_machine.set_initial_state("standing");
    
    // add callbacks to keyboard events
    this.game_state.game.input.keyboard.addCallbacks(this, this.process_on_down_input, this.process_on_up_input, null);
};

Hero.prototype = Object.create(require('./Prefab').prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    // touching ground tile
    if (this.body.blocked.down) {
        var command = require('./../state_machine/Command');
        this.state_machine.handle_input(new command("fall", {}));
    }
};

Hero.prototype.process_on_down_input = function (event) {
    "use strict";
    var command = require('./../state_machine/Command');
    switch (event.keyCode) {
    case Phaser.Keyboard.LEFT:
        // walk left
        this.state_machine.handle_input(new command("walk", {direction: "left"}));
        break;
    case Phaser.Keyboard.RIGHT:
        // walk right
        this.state_machine.handle_input(new command("walk", {direction: "right"}));
        break;
    case Phaser.Keyboard.UP:
        // jump
        this.state_machine.handle_input(new command("jump", {}));
        break;
    }
};

Hero.prototype.process_on_up_input = function (event) {
    "use strict";
    var command = require('./../state_machine/Command');
    switch (event.keyCode) {
    case Phaser.Keyboard.LEFT:
        this.state_machine.handle_input(new command("stop", {}));
        break;
    case Phaser.Keyboard.RIGHT:
        this.state_machine.handle_input(new command("stop", {}));
        break;
    }
};

module.exports = Hero;