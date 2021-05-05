var GameData = new Object();

//globals
var lifetimeTotal = 0;
var counter = 0;
var bankValue = 0;
var periodicIncrement = 1;

//bank
var creditScore = 400;
var interestRate = 0.03;

//TODO: straight up make this electricity themed and solve an energy crisis
//TODO: do we want flat counter rate increases for standard upgrades?
//TODO: these numbers are made up
var Tier1_Upgrade = new Upgrade(5, 100, Math.pow(1.05, x), "Monkey with a Hand Crank");
var Tier2_Upgrade = new Upgrade(15, 100, Math.pow(1.4, x), "Small Leaky Generator");
var Tier3_Upgrade = new Upgrade(45, 100, Math.pow(1.6, x), "HO Alternator with jumper cables");
var Tier4_Upgrade = new Upgrade(1800, 100, Math.pow(2, x), "Coal Plant");
var Tier5_Upgrade = new Upgrade(20000, 100, Math.pow(2.3, x), "Hydro Dam");
var Tier6_Upgrade = new Upgrade(502500, 100, Math.pow(3, x), "Reactor");
//and carry your imagination and memory of the kardishev scale wikipedia page and expand this as needed...

const upgrades = [
    [Tier1_Upgrade, "t1"],
    [Tier2_Upgrade, "t2"],
    [Tier3_Upgrade, "t3"],
    [Tier4_Upgrade, "t4"],
    [Tier5_Upgrade, "t5"],
    [Tier6_Upgrade, "t6"],
]

//special
var spec_quantityMax = 0; //tune production for bonuses related to quantity of productive units
var spec_qualityMax = 0; //tune production for bonuses related to unit production.

function periodicClick(){
    //logic for upgraded periodic clicks
    counter += periodicIncrement;

    updateUI();
}

function doclick(){
    counter++;

    updateUI();
}

function deposit(){
    bankValue += counter;
    counter = 0;
    updateUI();
}

function bankChange(){
    var delta = 0;
    if(bankValue < 0){
        delta = Math.floor(((bankValue * -1) * (1 + interestRate)) - (bankValue * -1));
    }
    else{
        delta = Math.floor((bankValue * (1 + interestRate)) - bankValue);
    }

    bankValue += delta;

    updateUI();
}

function updateUI(){
    document.getElementById('counter').innerHTML = counter;
    document.getElementById('bankValue').innerHTML = bankValue;
}

function tryPurchaseUpgrade(upgrade, cost){
    if(counter >= cost){

    }
}

//timer, 1Hz
window.setInterval(function(){
    periodicClick();

    //lifetime total updates on the most frequent interval.
    lifetimeTotal = counter + bankValue;
}, 1000)

//every period, compound bank interest.
window.setInterval(function(){
    bankChange();
}, 10000)

//save every 30s
window.setInterval(function(){
    //save();
}, 30000)

function save(){
   localStorage.setItem('game', JSON.stringify(Game));
}

function loadGame(){
    let g = new Game(
        localStorage.getItem('counter'),
        localStorage.getItem('bankValue')
    );
}

function loadData(){
    
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

//OOP experiments
class Game{
    constructor(counter, bankValue){
        this.counter = counter;
        this.bankValue = bankValue;
    }
}

class Upgrade{
    constructor(counterPerInterval, cost, costAccelerationRate, name){
        this.counterPerInterval = counterPerInterval;
        this.cost = cost; //cost is to velocity as costAccelerationRate is to acceleration.
        this.costAccelerationRate = costAccelerationRate;
        this.name = name;
    }
}

//upgrades
function purchaseUpgrade() {
    let tier = event.target.id.split('_')[0];
    //pull structure for that tier to grab cost
    //compare to current token qty - disallow from bank purchase
    let s = upgrades[tier];
    if(counter > s.cost){
        GameData.counter -= s.cost;
        GameData.upgrades[tier]++;
    }
    //upgrades[tier]
    // upgrades[]
}