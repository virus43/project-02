var info = $(".info");

var getGameInfo = function() {
    return new Promise ((resolve,reject ) => {
        $.ajax({
        url: "/api/gameInfo",
        method: "GET",
        success: function(data) {
            resolve(data)
        },
        error: function(error) {
            reject(error)
        }
    });
  });
};
  
var stats;
var getCash = function(data) {

    var playerOneCash=[];
    var playerTwoCash=[];

    for (i = 0; i < Object.keys(data).length; i++) {
        playerOneCash.push(data[i].playerOne.cash);
        playerTwoCash.push(data[i].playerTwo.cash);
    }
    return [playerOneCash, playerTwoCash];
}

var getDiceRolls = function(data) {

    var playerOneRolls=[];
    var playerTwoRolls=[];

    for (i = 0; i < Object.keys(data).length; i++) {
        playerOneRolls.push(data[i].playerOne.diceRoll);
        playerTwoRolls.push(data[i].playerTwo.diceRoll);
    }

    const playerOneRollCounts = new Map([...new Set(playerOneRolls)].map(
        x => [x, playerOneRolls.filter(y => y === x).length]
    ));

    const playerTwoRollCounts = new Map([...new Set(playerTwoRolls)].map(
        x => [x, playerTwoRolls.filter(y => y === x).length]
    ));

    return [playerOneRollCounts, playerTwoRollCounts];
}

var getAndRenderPage = function() {

    getGameInfo().then(data => {
    stats = data;
    var cash=getCash(stats);
    console.log(cash);
    // console.log(cash[1].length);
    // console.log(data);
    gameRounds = [];
    for (i=1;i<=cash[0].length;i++) {
        gameRounds.push(i);
    }
    console.log(gameRounds);
    var diceRolls = getDiceRolls(stats);



new Chart(document.getElementById("line-chart-1"), {
    type: 'line',
    data: {
        labels: gameRounds,
        datasets: [{ 
            data: cash[0],
            label: data[0].playerOne.name,
            borderColor: "#3e95cd",
            fill: false
        },
        { 
            data: cash[1],
            label: data[0].playerTwo.name,
            borderColor: "#8e5ea2",
            fill: false
            }
        ]
    },
    options: {
        title: {
        display: true,
        text: 'Monopoly Splurge - How they spent it!'
        }
    }
    });

new Chart(document.getElementById("line-chart-3"), {
    type: 'pie',
    data: {
        labels: Array.from(diceRolls[0].keys()),
        datasets: [{ 
            data: Array.from(diceRolls[0].values()),
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#ffaa1d"],
        }]
    },
    options: {
        title: {
        display: true,
        text: 'Lucky with Numbers - Dice Rolls for '+data[0].playerOne.name,
        }
    }
    });



new Chart(document.getElementById("line-chart-4"), {
    type: 'pie',
    data: {
        labels: Array.from(diceRolls[1].keys()),
        datasets: [{ 
            data: Array.from(diceRolls[1].values()),
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#ffaa1d"],
        }]
    },
    options: {
        title: {
        display: true,
        text: 'Lucky with Numbers - Dice Rolls for '+data[0].playerTwo.name,
        }
    }
    });    



    })
    .catch(error => {
        console.log(error);
    });  
};

getAndRenderPage();




