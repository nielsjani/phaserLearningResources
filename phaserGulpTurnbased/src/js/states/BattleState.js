var BattleState = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefab_classes = {
        "background": require('./../prefabs/TilePrefab').prototype.constructor,
        "rectangle": require('./../prefabs/Prefab').prototype.constructor,
        "player_unit": require('./../prefabs/Units/PlayerUnit').prototype.constructor,
        "enemy_unit": require('./../prefabs/Units/EnemyUnit').prototype.constructor,
        "inventory": require('./../prefabs/items/Inventory').prototype.constructor
    };

    this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
};

BattleState.prototype = Object.create(Phaser.State.prototype);
BattleState.prototype.constructor = BattleState;

BattleState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    console.log("init");
    this.level_data = level_data;
    this.encounter = extra_parameters.encounter;
    this.party_data = extra_parameters.party_data;
    this.inventory = extra_parameters.inventory;


    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

BattleState.prototype.preload = function () {
    "use strict";
    console.log("preload");
    this.load.text("experience_table", "assets/levels/experience_table.json");
};

BattleState.prototype.create = function () {
    "use strict";
    console.log("create");
    var group_name, prefab_name, player_unit_name, enemy_unit_name;

    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    }

    // if there is no inventory from WorldState, create an empty one
    if (this.inventory) {
        this.prefabs.inventory = this.inventory;
    } else {
        var inv = require('./../prefabs/items/Inventory');
        this.prefabs.inventory = new inv(this, "inventory", {x: 0, y: 0}, {group: "items"});
    }

    // create enemy units
    for (enemy_unit_name in this.encounter.enemy_data) {
        if (this.encounter.enemy_data.hasOwnProperty(enemy_unit_name)) {
            // create enemy units
            this.create_prefab(enemy_unit_name, this.encounter.enemy_data[enemy_unit_name]);
        }
    }

    // create player units
    for (player_unit_name in this.party_data) {
        if (this.party_data.hasOwnProperty(player_unit_name)) {
            // create player units
            this.create_prefab(player_unit_name, this.party_data[player_unit_name]);
        }
    }

    // save experience table
    this.experience_table = JSON.parse(this.game.cache.getText("experience_table"));

    this.init_hud();

    // store units in a priority queue which compares the units act turn
    this.units = new PriorityQueue({
        comparator: function (unit_a, unit_b) {
            return unit_a.act_turn - unit_b.act_turn;
        }
    });
    this.groups.player_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);
    this.groups.enemy_units.forEach(function (unit) {
        unit.calculate_act_turn(0);
        this.units.queue(unit);
    }, this);

    this.next_turn();
};

BattleState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
};

BattleState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health;

    // show player actions
    this.show_player_actions({x: 106, y: 210});

    // show player units
    this.show_units("player_units", {x: 202, y: 210}, require('./../prefabs/HUD/PlayerMenuItem').prototype.constructor);

    // show enemy units
    this.show_units("enemy_units", {x: 10, y: 210}, require('./../prefabs/HUD/EnemyMenuItem').prototype.constructor);

    // create items menu
    this.prefabs.inventory.create_menu({x: 106, y: 210});
};

BattleState.prototype.show_units = function (group_name, position, menu_item_constructor) {
    "use strict";
    var unit_index, menu_items, unit_menu_item, units_menu;

    // create units menu items
    unit_index = 0;
    menu_items = [];
    this.groups[group_name].forEach(function (unit) {
        unit_menu_item = new menu_item_constructor(this, unit.name + "_menu_item", {
            x: position.x,
            y: position.y + unit_index * 20
        }, {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)});
        unit_index += 1;
        menu_items.push(unit_menu_item);
    }, this);
    // create units menu
    var menu = require('./../prefabs/HUD/Menu');
    units_menu = new menu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items});
};

BattleState.prototype.show_player_actions = function (position) {
    "use strict";
    var actions, actions_menu_items, action_index, actions_menu;
    // available actions
    actions = [
        {text: "Attack", item_constructor: require('./../prefabs/HUD/AttackMenuItem').prototype.constructor},
        {text: "Magic", item_constructor: require('./../prefabs/HUD/MagicAttackMenuItem').prototype.constructor},
        {text: "Item", item_constructor: require('./../prefabs/HUD/InventoryMenuItem').prototype.constructor}
    ];
    actions_menu_items = [];
    action_index = 0;
    // create a menu item for each action
    actions.forEach(function (action) {
        actions_menu_items.push(new action.item_constructor(this, action.text + "_menu_item", {
            x: position.x,
            y: position.y + action_index * 20
        }, {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}));
        action_index += 1;
    }, this);
    var menu = require('./../prefabs/HUD/Menu');
    actions_menu = new menu(this, "actions_menu", position, {group: "hud", menu_items: actions_menu_items});
};

BattleState.prototype.next_turn = function () {
    "use strict";
    // if all enemy units are dead, go back to the world state
    console.log(this.groups);
    if (this.groups.enemy_units.countLiving() === 0) {
        this.end_battle();
    }

    // if all player units are dead, restart the game
    if (this.groups.player_units.countLiving() === 0) {
        this.game_over();
    }

    // takes the next unit
    this.current_unit = this.units.dequeue();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.current_unit.calculate_act_turn(this.current_unit.act_turn);
        this.units.queue(this.current_unit);
    } else {
        this.next_turn();
    }
};

BattleState.prototype.game_over = function () {
    "use strict";
    console.log("GAME_OVER");
    // go back to WorldState restarting the player position
    this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {restart_position: true});
};

BattleState.prototype.end_battle = function () {
    "use strict";
    var received_experience = this.encounter.reward.experience;
    this.groups.player_units.forEach(function (player_unit) {
        // receive experience from enemy
        player_unit.receive_experience(received_experience / this.groups.player_units.children.length);
        // save current party stats
        this.party_data[player_unit.name].properties.stats = player_unit.stats;
    }, this);


    this.encounter.reward.items.forEach(function (item_object) {
        this.prefabs.inventory.collect_item(item_object);
    }, this);

    console.log("BATTLE WON");
    // go back to WorldState with the current party data
    this.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {
        party_data: this.party_data,
        inventory: this.prefabs.inventory
    });
};

module.exports = BattleState;
