var ShowStat = function (game_state, name, position, properties) {
    "use strict";
    require('./../TextPrefab').call(this, game_state, name, position, properties);
    
    this.prefab = this.game_state.prefabs[properties.prefab];
    this.stat = properties.stat;
};

ShowStat.prototype = Object.create(require('./../TextPrefab').prototype);
ShowStat.prototype.constructor = ShowStat;

ShowStat.prototype.update = function () {
    "use strict";
    this.text = this.prefab.stats[this.stat];
};

module.exports = ShowStat;
