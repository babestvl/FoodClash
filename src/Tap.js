var Tap = cc.Sprite.extend({
    var: startSpeed = 0,
    var: defaultSpeed = 5,
    ctor: function() {
        this._super();
        this.initWithFile('res/Mechanic/tap.png');
        if (cSpeed < 0) {
            cSpeed *= -1;
        }
        this.speed = cSpeed+2;

    },
    update: function(dt) {
        var pos = this.getPosition();
        if (pos.x <= 20) {
            this.speed *= -1;
        } else if (pos.x >= 780) {
            this.speed *= -1;
        }
        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));

    },
    stop: function() {
        startSpeed = this.speed;
        this.speed = 0;
    },
    run: function() {
        this.setStartSpeed();
        this.speed = startSpeed;
    },
    closeTo: function (obj) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        if (( ( Math.abs(myPos.x - oPos.x) <= 10 ) &&
        ( Math.abs(myPos.y - oPos.y) <= 20 ) )){
            return true;
        } else {
            return false;
        }
    },
    setSpeed: function (newSpeed) {
        this.speed = newSpeed;
    },
    getSpeed: function () {
        return this.speed;
    },
    rePosition: function() {
        this.tap.setPosition(new cc.Point(40,150));
    },
    setStartSpeed: function() {
        var random = Math.round(Math.random());
        if (random == 0) {
            startSpeed *= -1;
        }
    }


});