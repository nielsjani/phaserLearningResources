var StateMachineExample = StateMachineExample || {};

StateMachineExample.game = new Phaser.Game(720, 350, Phaser.CANVAS);
StateMachineExample.game.state.add("BootState", require('./states/BootState'));
StateMachineExample.game.state.add("LoadingState", require('./states/LoadingState'));
StateMachineExample.game.state.add("DemoState", require('./states/DemoState'));
StateMachineExample.game.state.start("BootState", true, false, "assets/levels/demo_level.json", "DemoState");