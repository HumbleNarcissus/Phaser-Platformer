var loadState = {

    preload: function(){
        this.load.tilemap('mymap', '../assets/mymap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('simpleTiles', 'assets/simples_pimples.png');
        this.load.spritesheet('player', 'assets/player_spritesheet.png', 29, 30, 5);
        this.load.image('door', 'assets/door.png');
        this.load.spritesheet('coins', 'assets/coin.png');

    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.backgroundColor = "#000";
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('menu');
    }
}