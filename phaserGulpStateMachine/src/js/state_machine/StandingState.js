var StandingState = function (name, prefab, frame) {
    "use strict";
    require('./State').call(this, name, prefab);
    this.frame = frame;
};

StandingState.prototype = Object.create(require('./State').prototype);
StandingState.prototype.constructor = StandingState;

StandingState.prototype.enter = function () {
    "use strict";
    // set standing frame and velocity to 0
    this.prefab.frame = this.frame;
    this.prefab.body.velocity.x = 0;
};

StandingState.prototype.handle_input = function (command) {
    "use strict";
    switch (command.name) {
    case "walk":
        if (command.direction === "left") {
            return "walking_left";
        } else {
            return "walking_right";
        }
    case "jump":
        return "jumping";
    }
    require('./State').prototype.handle_input.call(this, command);
};

module.exports = StandingState;