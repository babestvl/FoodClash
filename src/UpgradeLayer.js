var UpgradeLayer = cc.LayerColor.extend({

    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.GoBack();
        this.hpUpgradeFn();
        this.powerUpgradeFn();
        this.createUpgradePointLabel();
        this.createHpUpgradeLabel();
        this.createPowerUpgradeLabel();
        this.addKeyboardHandlers();
    },
    onKeyDown: function( keyCode, event ) {
        if (keyCode == cc.KEY.z ) {
            this.shortcutHPUpgrade();
        }
        if (keyCode == cc.KEY.x ) {
            this.shortcutPowerUpgrade();
        }
        if (keyCode == cc.KEY.c ) {
            cc.director.runScene(new StartScene());
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

    GoBack: function() {
        this.back = new cc.MenuItemImage(
            'res/Mechanic/BackButton.jpg',
            'res/Mechanic/BackButtonPush.jpg',
            function() {
                cc.director.runScene(new StartScene());
            }, this);
        this.backButton = new cc.Menu (this.back);
        this.backButton.setPosition( new cc.Point (665, 51.5) );
        this.addChild(this.backButton);
    },
    hpUpgradeFn: function() {
        this.hpUp = new cc.MenuItemImage(
            'res/Mechanic/Hp.jpg',
            'res/Mechanic/HpPush.jpg',
            function() {
                this.shortcutHPUpgrade();
            }, this);
        this.hpUpButton = new cc.Menu (this.hpUp);
        this.hpUpButton.setPosition( new cc.Point (665, 501.5) );
        this.addChild(this.hpUpButton);
    },
    powerUpgradeFn: function() {
        this.powerUp = new cc.MenuItemImage(
            'res/Mechanic/Power.jpg',
            'res/Mechanic/PowerPush.jpg',
            function() {
                this.shortcutPowerUpgrade();
            }, this);
        this.powerUpButton = new cc.Menu (this.powerUp);
        this.powerUpButton.setPosition( new cc.Point (665, 301.5) );
        this.addChild(this.powerUpButton);
    },
    createUpgradePointLabel: function() {
        this.upPointLabel = cc.LabelTTF.create( 'Upgrade Point: '+upPoint, 'Arial', 30 );
        this.upPointLabel.setPosition( new cc.Point( 650, 220 ) );
        this.addChild(this.upPointLabel);
    },
    createHpUpgradeLabel: function(){
        this.hpUpLabel = cc.LabelTTF.create( 'HP UPGRADED: '+hpUpgrade, 'Arial', 30 );
        this.hpUpLabel.setPosition( new cc.Point( 250, 505.5 ) );
        this.addChild(this.hpUpLabel);
    },
    createPowerUpgradeLabel: function(){
        this.powerUpLabel = cc.LabelTTF.create( 'POWER UPGRADED: '+powerUpgrade, 'Arial', 30 );
        this.powerUpLabel.setPosition( new cc.Point( 250, 305.5 ) );
        this.addChild(this.powerUpLabel);
    },
    setHeroHp: function (newHp) {
        this.hero.setHp(newHp);
        mainHeroHp = this.hero.getHp();
        this.heroLabel.setString('HP: '+mainHeroHp);
    },
    shortcutHPUpgrade: function() {
        if (upPoint > 0) {
            hpUpgrade += 1;
            upPoint-=1;
            this.upPointLabel.setString('Upgrade Point: '+upPoint);
            this.hpUpLabel.setString( 'HP UPGRADED: '+hpUpgrade );
            heroMaxHp += 5;
        }
    },
    shortcutPowerUpgrade: function() {
        if (upPoint > 0) {
            powerUpgrade += 1;
            upPoint-=1;
            this.upPointLabel.setString('Upgrade Point: '+upPoint);
            this.powerUpLabel.setString( 'POWER UPGRADED: '+powerUpgrade );
            heroPower += 3;
        }
    }

});


var UpgradeScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new UpgradeLayer();
        layer.init();
        this.addChild( layer );
    }
});

var hpUpgrade = 0;
var powerUpgrade = 0;