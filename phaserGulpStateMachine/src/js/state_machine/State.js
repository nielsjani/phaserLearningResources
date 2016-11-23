var State = function (name, prefab) {
    "use strict";
    this.name = name;
    this.prefab = prefab;
};

State.prototype.enter = function () {
    "use strict";
};

State.prototype.exit = function () {
    "use strict";
};

State.prototype.handle_input = function (command) {
    "use strict";
    return this.name;
};

module.exports = State;