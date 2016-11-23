var MenuItem = function (game_state, name, position, properties) {
    "use strict";
    require('./../TextPrefab').call(this, game_state, name, position, properties);
};

MenuItem.prototype = Object.create(require('./../TextPrefab').prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.selection_over = function () {
    "use strict";
    this.fill = "#FFFF00";
};

MenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFFFFF";
};

module.exports = MenuItem;
