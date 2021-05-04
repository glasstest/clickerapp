//globals

var lifetimeTotal = 0;
var counter = 0;
var bankValue = 0;
var periodicIncrement = 1;

//production
var prod_t1 = 0;
var prod_t2 = 0;
var prod_t3 = 0;

//bank
var creditScore = 400;
var interestRate = 0.03;

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
