var Monster = cc.Sprite.extend({
    var: monsterHp = 50,
    var: monsterPower = 7,
    var: checkMAtk = 0,

    ctor: function() {
        this._super();
        this.initWithFile('res/Character/char2.png');

    },
    getMHp: function() {
        return monsterHp;
    },
    setMHp: function(newHp) {
       monsterHp = newHp;

    },
    getPower: function () {
        return monsterPower;
    },
    setPower: function(newPower) {
        monsterPower = newPower;
    },
    monsterGetAttackCheck: function() {
        if (checkMAtk==1){
            checkMAtk = 0;
            return true;
        } else {
            return false;
        }
    },
    monsterGetAtked: function() {
        checkMAtk = 1;
    },
    isDead: function() {
        if (monsterHp<=0)
            return true;

        else false;
    },
    toAttack: function() {
        var randomNum = Math.floor(Math.random())*(3-1)+1;
        if (randomNum == 1) return true;
        else return false;
    }
});