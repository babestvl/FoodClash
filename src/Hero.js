var Hero = cc.Sprite.extend({
    var: heroHp = 100,
    var: heroPower = 10,
    var: checkHAtk = 0,
    ctor: function() {
        this._super();
        this.initWithFile('res/Character/char1.png');

    },
    getHp: function() {
        return heroHp;
    },
    setHp: function(newHp) {
        heroHp = newHp;

    },
    getPower: function () {
        return heroPower;
    },
    setPower: function(newPower) {
        heroPower = newPower;
    },
    heroGetAttackCheck: function() {
        if (checkHAtk==1){
            checkHAtk = 0;
            return true;
        } else {
            return false;
        }
    },
    heroGetAtked: function() {
        checkHAtk = 1;
    },
    isDead: function() {
        if (heroHp<=0)
            return true;
        else false;
    }
});