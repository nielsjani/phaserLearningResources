var JumpingState = function (name, prefab, jumping_speed) {
    "use strict";
    require('./State').call(this, name, prefab);
    this.jumping_speed = jumping_speed;
};

JumpingState.prototype = Object.create(require('./State').prototype);
JumpingState.prototype.constructor = JumpingState;

JumpingState.prototype.enter = function () {
    "use strict";
    // set vertical velocity
    this.prefab.body.velocity.y = -this.jumping_speed;
};

JumpingState.prototype.handle_input = function (command) {
    "use strict";
    switch (command.name) {
    case "fall":
        return "standing";
    }
    require('./State').prototype.handle_input.call(this, command);
};

module.exports= JumpingState;