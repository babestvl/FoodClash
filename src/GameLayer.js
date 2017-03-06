var GameLayer = cc.LayerColor.extend({

    init: function() {
        this._super( new cc.Color( 60, 179, 113, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.addKeyboardHandlers();
        this.scheduleUpdate();
        this.createBg();
        this.createGuage();
        this.createTap();
        this.createCharacter();
        this.createHeroLabel();
        this.createMonsterLabel();
        this.createStageLabel();
        this.createSPLabel();
        this.attackCommand();
        this.spAttackCommand();
        this.UpgradeCommand();
        this.createUpgradePointLabel();
        this.createSPHitLabel();
        this.heroAttackEffect();
        this.monsterAttackEffect();
    },

    onKeyDown: function( keyCode, event ) {
        if (keyCode == cc.KEY.space && attackID == 1){
            this.attackFn();

        }
        if(keyCode == cc.KEY.z){
            this.shortcutOfAttackButton();


        }
        if (keyCode == cc.KEY.x) {
            this.shortcutOfSPAttackButton();


        }
        if (keyCode == cc.KEY.c ) {
            cc.director.runScene(new UpgradeScene());
        }
    },

    onKeyUp: function( keyCode, event ) {

    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },

    setMonsterHp: function(newHp) {
        this.monster.setMHp(newHp);
        mainMonsterHp = this.monster.getMHp();
        this.monsterLabel.setString('HP: '+mainMonsterHp);
    },

    setHeroHp: function (newHp) {
        this.hero.setHp(newHp);
        mainHeroHp = this.hero.getHp();
        this.heroLabel.setString('HP: '+mainHeroHp);
    },

    update: function(dt) {
        if(this.monster.monsterGetAttackCheck()) {
            this.monsterGetAttacked();
        }

        if(this.hero.heroGetAttackCheck()) {
            this.heroGetAttacked();
        }

        if (this.tap.speed == 0 && this.tap.closeTo(this.guage)==true) {
            this.monster.monsterGetAtked();
        }
        else if(this.tap.speed == 0 && this.tap.closeTo(this.guage)==false){
            this.hero.heroGetAtked();
        }

        if (countSuccess == 5){
            SPAttackID = 1;
            this.spLabel.setString('SP charge: MAX!!');
        }

        if(stage == 13&&this.monster.isDead()){
            gameClear = true;
            this.gameOver();
        }

        if (this.monster.isDead()&& stage < 13) {
            this.passTheLevel();
        }


        if (this.hero.isDead()) {
            this.gameOver();
        }
    },

    attackCommand: function() {
        this.attack = new cc.MenuItemImage(
            'res/Mechanic/AttackButton.jpg',
            'res/Mechanic/AttackButtonPush.jpg',
            function() {
                this.shortcutOfAttackButton();
            }, this);
        this.attackButton = new cc.Menu (this.attack);
        this.attackButton.setPosition( new cc.Point (135, 51.5) );
        this.addChild(this.attackButton);
    },

    spAttackCommand: function() {
        this.SPAttack = new cc.MenuItemImage(
            'res/Mechanic/SPButton.jpg',
            'res/Mechanic/SPButtonPush.jpg',
            function() {
                this.shortcutOfSPAttackButton();
            }, this);
        this.SPButton = new cc.Menu (this.SPAttack);
        this.SPButton.setPosition( new cc.Point (402.5, 51.5) );
        this.addChild(this.SPButton);
    },

    UpgradeCommand: function() {
        this.Upgrade = new cc.MenuItemImage(
            'res/Mechanic/UpgradeButton.jpg',
            'res/Mechanic/UpgradeButtonPush.jpg',
            function() {
                cc.director.runScene(new UpgradeScene());
            }, this);
        this.UpgradeButton = new cc.Menu (this.Upgrade);
        this.UpgradeButton.setPosition( new cc.Point (665, 51.5) );
        this.addChild(this.UpgradeButton);
    },

    tapRandom: function() {
        var random = Math.round(Math.random());
        var x = 0;
        if (random == 0)
            x = 40;
        else
            x = 760;
        this.tap.setPosition(new cc.Point(x ,150));
    },

    monsterGetAttacked: function() {
        this.setMonsterHp(mainMonsterHp -= this.hero.getPower());
        this.heroAttackAni();
        this.eff1.setOpacity(255);
        if (monsterHp > 0)
        cc.audioEngine.playEffect('res/heroSound.mp3');

        this.tapRandom();
        if (countSuccess < 5 && SPHit == 0) {
            countSuccess++;
            this.spLabel.setString('SP charge: ' + countSuccess);
        }

        if (SPHit > 0) {
            if ((mainHeroHp +  this.hero.getPower()/2) > heroMaxHp){
                this.setHeroHp(heroMaxHp);
            }else {
                this.setHeroHp(mainHeroHp += this.hero.getPower() / 2);
            }
            SPHit--;
            this.spHitLabel.setString('SP Hit: '+ SPHit);
        }
        this.tap.run();
    },

    heroGetAttacked: function() {
        this.setHeroHp(mainHeroHp -= this.monster.getPower());
        if (SPHit > 0) {
            SPHit--;
            this.spHitLabel.setString('SP Hit: '+ SPHit);
        }
        this.eff2.setOpacity(255);
        if (heroHp > 0)
        cc.audioEngine.playEffect('res/monsterSound.mp3');
        this.monsterAttackAni();
        this.tapRandom();
        this.tap.run();
    },

    passTheLevel:function() {
        cc.audioEngine.playEffect('res/died.mp3');
        monsterMaxHp += 10;
        upPoint += 1;
        this.setMonsterHp( monsterMaxHp );
        this.setHeroHp(heroMaxHp);
        monsterPower+=3;
        this.monster.setPower(this.monster.getPower());
        cSpeed = this.tap.getSpeed();
        if (cSpeed < 0) {
            cSpeed *= -1;
        }
        this.tap.setSpeed(cSpeed + 2);
        stage++;
        this.stageLabel.setString('Stage: ' + stage);
        this.upPointLabel.setString('Upgrade Point: '+upPoint);
    },

    gameOver:function() {
        cc.audioEngine.playEffect('res/died.mp3');
        heroMaxHp = 100;
        monsterMaxHp = 50;
        this.setHeroHp(heroMaxHp);
        this.setMonsterHp(monsterMaxHp);
        this.hero.setPower(10);
        this.monster.setPower(7);
        this.tap.setSpeed(defaultSpeed);
        countSuccess = 0;
        upPoint = 0;
        cSpeed = 3;
        SPHit = 0;
        this.stageLabel.setString('Stage: '+ stage);
        this.spLabel.setString('SP charge: ' + countSuccess);
        this.upPointLabel.setString('Upgrade Point: '+upPoint);
        this.spHitLabel.setString('SP Hit: '+ SPHit);
        hpUpgrade = 0;
        powerUpgrade = 0;
        cc.director.runScene(new GameOverScene());
    },

    createGuage: function() {
        this.guage = new Guage();
        this.guage.setPosition(new cc.Point(400,150));
        this.addChild(this.guage);
    },
    createBg: function() {
        this.bg = new Bg();
        this.bg.setPosition(new cc.Point(400, 420));
        this.addChild(this.bg,0);
    },

    createTap: function() {
        this.tap = new Tap();
        this.tap.setOpacity(0);
        this.tapRandom();
        this.addChild(this.tap);
        this.tap.scheduleUpdate();
    },

    createCharacter: function() {
        this.hero = new Hero();
        this.monster = new Monster();
        this.addChild(this.hero);
        this.addChild(this.monster);
        mainHeroHp  = this.hero.getHp();
        mainMonsterHp = this.monster.getMHp();
        this.monster.setPosition(new cc.Point (600,373));
        this.hero.setPosition(new cc.Point(200,350));
    },

    createHeroLabel: function(){
        this.heroLabel = cc.LabelTTF.create( 'HP: '+mainHeroHp, 'Arial', 40 );
        this.heroLabel.setPosition( new cc.Point( 200, 500 ) );
        this.addChild(this.heroLabel);
    },

    createMonsterLabel: function() {
        this.monsterLabel = cc.LabelTTF.create( 'HP: '+mainMonsterHp, 'Arial', 40 );
        this.monsterLabel.setPosition( new cc.Point( 600, 500 ) );
        this.addChild(this.monsterLabel);
    },

    createStageLabel: function(){
        this.stageLabel = cc.LabelTTF.create( 'Stage: '+stage, 'Arial', 30 );
        this.stageLabel.setPosition( new cc.Point( 400, 550 ) );
        this.addChild(this.stageLabel);
    },

    createSPLabel: function() {
        this.spLabel = cc.LabelTTF.create( 'SP charge: '+countSuccess, 'Arial', 30 );
        this.spLabel.setPosition( new cc.Point( 150, 220 ) );
        this.addChild(this.spLabel);
    },
    createSPHitLabel: function() {
        this.spHitLabel = cc.LabelTTF.create( 'SP Hit: '+SPHit, 'Arial', 30 );
        this.spHitLabel.setPosition( new cc.Point( 400, 220 ) );
        this.addChild(this.spHitLabel);
    },

    createUpgradePointLabel: function() {
        this.upPointLabel = cc.LabelTTF.create( 'Upgrade Point: '+upPoint, 'Arial', 30 );
        this.upPointLabel.setPosition( new cc.Point( 650, 220 ) );
        this.addChild(this.upPointLabel);
    },

    attackFn: function() {
        this.tap.setOpacity(0);
        attackID = 0;
        if (this.tap.speed == 0){
            this.tap.run();
        }else {
            this.tap.stop();
        }
    },

    shortcutOfAttackButton: function() {
        this.tap.setOpacity(255);
        attackID = 1;
        this.hero.setPosition(new cc.Point(200,350));
        this.monster.setPosition(new cc.Point (600,373));
        this.eff1.setOpacity(0);
        this.eff2.setOpacity(0);
    },

    shortcutOfSPAttackButton: function(){
        if (SPAttackID == 1) {
            SPHit = 3;
            this.tap.runAction(cc.FadeIn.create(0));
            attackID = 1;
            SPAttackID = 0;
            countSuccess = 0;
            this.spLabel.setString('SP charge: '+countSuccess);
            this.spHitLabel.setString('SP Hit: '+ SPHit);
            this.hero.setPosition(new cc.Point(200,350));
            this.monster.setPosition(new cc.Point (600,373));
            this.eff1.setOpacity(0);
            this.eff2.setOpacity(0);
        }
    },
    
    heroAttackAni: function() {
        this.hero.setPosition(new cc.Point(400,350));
    },

    monsterAttackAni: function () {
        this.monster.setPosition(new cc.Point(400,373));
    },
    
    heroAttackEffect: function () {
        this.eff1 = new Effect();
        this.eff1.setPosition(new cc.Point(500,350));
        this.eff1.setOpacity(0);
        this.addChild(this.eff1);
    },

    monsterAttackEffect: function () {
        this.eff2 = new Effect();
        this.eff2.setPosition(new cc.Point(300,350));
        this.eff2.setOpacity(0);
        this.addChild(this.eff2);
    },

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

var heroMaxHp = 100;
var monsterMaxHp = 50;
var mainHeroHp = 0;
var mainMonsterHp = 0;
var stage = 1;
var attackID = 0;
var SPAttackID = 0;
var SPHit = 0;
var upPoint = 0;
var countSuccess = 0;
var cSpeed = 3;
var gameClear = false;
