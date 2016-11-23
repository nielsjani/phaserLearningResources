var Potion = function (game_state, name, position, properties) {
    "use strict";
    require('./Item').call(this, game_state, name, position, properties);
    this.health_power = properties.health_power;
};

Potion.prototype = Object.create(require('./Item').prototype);
Potion.prototype.constructor = Potion;

Potion.prototype.use = function (target) {
    "use strict";
    require('./Item').prototype.use.call(this);
    target.stats.health += this.health_power;
};

module.exports = Potion;