
var playState = {
    create: function() {
        this.score = 0;
        this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '16px', fill: '#fff' });
        this.map = this.game.add.tilemap('mymap');
        //load tileset
        this.map.addTilesetImage('simple', 'simpleTiles');
        this.foreground = this.map.createLayer('Foreground');
        this.map.setCollisionBetween(1, 250, true, 'Foreground');
        this.foreground.resizeWorld();

        //player
        this.sprite = this.game.add.sprite(16, 47, 'player');
        this.sprite.frame = 0;
        this.walk = this.sprite.animations.add('walk');
        this.sprite.play('walk', 10, true);
        this.sprite.scale.setTo(0.5,1);
        this.game.physics.arcade.enable(this.sprite);
        


        this.coins = this.game.add.physicsGroup();
        this.map.createFromObjects('Objects', 'coins', 'coins', 5, true, false, this.coins);
        this.coins.forEach(function(coin){
            coin.body.immovable = true;
        });
        //create doors
        this.doors = this.game.add.physicsGroup();
        this.map.createFromObjects('Objects', 'door', 'door', 11, true, false, this.doors);
        //Set some physics on the player
        this.sprite.body.gravity.y = 2000;
        this.sprite.body.velocity.x = 0;
        
        //Enable cursor keys so we can create some controls
        this.cursor = this.game.input.keyboard.createCursorKeys();

    },
    collect: function(player, coin){
        coin.kill();
        this.score += 1;
        this.scoreText.text = 'Score: ' + this.score;   
    },

    update: function() {
        //Make the sprite collide with the ground layer
        this.game.physics.arcade.collide(this.sprite, this.foreground);
        this.game.physics.arcade.overlap(this.sprite, this.coins, this.collect, null, this);
        this.sprite.body.velocity.x = 0;

        if(this.cursor.left.isDown){
            this.sprite.body.velocity.x -= 50;
            this.sprite.play('walk', 10, true);
        
        }
        
        else if(this.cursor.right.isDown){
            this.sprite.body.velocity.x = 50;
            this.sprite.play('walk', 10, true);
        
        }
        
        else if(this.cursor.up.isDown){
            this.sprite.body.velocity.y -= 100;
            this.sprite.play('walk', 10, true);
        
        }
        
        else if(this.cursor.down.isDown){
            //this.sprite.body.velocity.y = 2;
           // this.sprite.play('walk', 10, true);        
        }

        else {
            this.sprite.animations.stop();
        }
        if(this.game.physics.arcade.collide(this.sprite, this.doors)){
            game.state.start('endMenu');
        }
        
    },

};
