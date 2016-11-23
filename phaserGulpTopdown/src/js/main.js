var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(160, 160, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', require('./states/boot'));
TopDownGame.game.state.add('Preload', require('./states/preload'));
TopDownGame.game.state.add('Game', require('./states/game'));

TopDownGame.game.state.start('Boot');