var RPG = RPG || {};

RPG.game = new Phaser.Game(320, 320, Phaser.CANVAS);
RPG.game.state.add("BootState", require('./states/BootState'));
RPG.game.state.add("LoadingState", require('./states/LoadingState'));
RPG.game.state.add("WorldState", require('./states/WorldState'));
RPG.game.state.add("BattleState", require('./states/BattleState'));
RPG.game.state.start("BootState", true, false, "assets/levels/level1.json", "WorldState", {});