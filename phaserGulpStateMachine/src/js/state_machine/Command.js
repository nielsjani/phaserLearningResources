var Command = function (name, properties) {
    "use strict";
    this.name = name;
    for (var property in properties) {
        if (properties.hasOwnProperty(property)) {
            this[property] = properties[property];
        }
    }
};

module.exports = Command;
